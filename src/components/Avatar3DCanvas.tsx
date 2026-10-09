import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

interface Avatar3DCanvasProps {
  mode?: 'hero' | 'about' | 'desk';
  className?: string;
}

// Module-level cache for GLB array buffer and HDR environment texture
let cachedGlbPromise: Promise<ArrayBuffer> | null = null;
function getGlbBuffer(): Promise<ArrayBuffer> {
  if (!cachedGlbPromise) {
    cachedGlbPromise = fetch('/models/character.glb').then((res) => {
      if (!res.ok) throw new Error(`Failed to load character model: ${res.status}`);
      return res.arrayBuffer();
    });
  }
  return cachedGlbPromise;
}

let cachedEnvPromise: Promise<THREE.DataTexture> | null = null;
function getEnvTexture(): Promise<THREE.DataTexture> {
  if (!cachedEnvPromise) {
    cachedEnvPromise = new Promise((resolve, reject) => {
      new RGBELoader().load(
        '/models/char_enviorment.hdr',
        (texture) => {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          resolve(texture);
        },
        undefined,
        (err) => reject(err)
      );
    });
  }
  return cachedEnvPromise;
}

export default function Avatar3DCanvas({ mode = 'hero', className = '' }: Avatar3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isCancelled = false;
    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    let blinkTimer: NodeJS.Timeout | null = null;
    let browUpAction: THREE.AnimationAction | null = null;
    let onMouseEnter: (() => void) | null = null;
    let onMouseLeave: (() => void) | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 440;
    const aspect = width / height;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup with tailored framing & responsive aspect ratio compensation
    const fov = 18;
    const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 200);

    const updateCameraFraming = (w: number, h: number) => {
      if (w === 0 || h === 0) return;
      const currentAspect = w / h;
      camera.aspect = currentAspect;

      // Adjust camera distance slightly if aspect is narrower than 0.9 (e.g. mobile portrait)
      // to keep cap and shoulders safely inside the view without cropping
      const aspectFactor = currentAspect < 0.9 ? Math.max(1, 0.9 / currentAspect) : 1;

      if (mode === 'hero') {
        camera.position.set(0, 12.6, 21.5 * aspectFactor);
        camera.lookAt(0, 12.4, 0);
      } else if (mode === 'about') {
        camera.position.set(0, 12.5, 21.5 * aspectFactor);
        camera.lookAt(0, 12.3, 0);
      } else if (mode === 'desk') {
        // Isometric 3/4 workspace perspective showing full developer, desk, keyboard & laptop
        camera.position.set(1.4, 11.5, 36.0 * aspectFactor);
        camera.lookAt(1.4, 11.0, 0);
      }

      camera.updateProjectionMatrix();
    };

    updateCameraFraming(width, height);

    // 3. WebGL Renderer with High-Performance Settings
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      container.innerHTML = '';
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.error('Failed to create WebGLRenderer:', e);
      setHasError(true);
      return;
    }

    // 4. Lighting Setup tailored to dark aesthetic while keeping dark clothing well-defined
    // Studio ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    // Warm Front-Top Key Light
    const keyLight = new THREE.DirectionalLight(0xfff8ee, 2.4);
    keyLight.position.set(2.5, 16.0, 5.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Front Chest Fill Light: ensures folds of black sweatshirt stay visible against dark background
    const chestFillLight = new THREE.DirectionalLight(0xd4e4f7, 0.85);
    chestFillLight.position.set(0, 10.0, 6.0);
    scene.add(chestFillLight);

    // Vibrant CYAN Rim Light from Left
    const cyanRim = new THREE.DirectionalLight(0x00f0ff, 3.8);
    cyanRim.position.set(-5.5, 14.0, -1.5);
    scene.add(cyanRim);

    // Vibrant MAGENTA / PINK Rim Light from Right
    const magentaRim = new THREE.DirectionalLight(0xff2a75, 3.4);
    magentaRim.position.set(5.5, 14.0, -1.5);
    scene.add(magentaRim);

    // Top fill
    const topFill = new THREE.DirectionalLight(0xcfd8dc, 0.9);
    topFill.position.set(0, 18, 2);
    scene.add(topFill);

    // Dynamic Screen Light for Desk Mode
    let screenLight: THREE.PointLight | null = null;
    if (mode === 'desk') {
      screenLight = new THREE.PointLight(0x00f0ff, 3.5, 8.0);
      screenLight.position.set(0, 11.6, 3.8);
      scene.add(screenLight);
    }

    // Load Environment HDR map
    getEnvTexture()
      .then((envTexture) => {
        if (isCancelled) return;
        scene.environment = envTexture;
        scene.environmentIntensity = 0.68;
      })
      .catch((err) => {
        console.warn('Could not load HDR environment map, relying on directional lights:', err);
      });

    // 5. Load the Authentic 3D Character Model
    getGlbBuffer()
      .then((glbBuffer) => {
        if (isCancelled) return;

        const loader = new GLTFLoader();
        loader.parse(
          glbBuffer.slice(0),
          '',
          (gltf) => {
            if (isCancelled) return;

            const characterScene = gltf.scene;
            scene.add(characterScene);

            // Set scene orientation per mode
            if (mode === 'hero') {
              characterScene.rotation.set(0, 0, 0);
            } else if (mode === 'about') {
              // Friendly angle looking towards About content
              characterScene.rotation.set(0, 0.42, 0);
            } else if (mode === 'desk') {
              // Dynamic 3/4 isometric perspective for the complete workspace
              characterScene.rotation.set(0.08, 0.78, 0);
            }

            // Configure mesh visibility, clothing color, and materials
            const deskMeshNames = [
              'Cube002',      // Wood desk
              'screenlight',  // Glowing laptop display
              'Keyboard',     // Keyboard base
              'Plane004',     // Laptop back chassis
              'Plane010',     // Laptop back panel
              'Plane010_1',   // Laptop logo
              'Plane',        // Desk accessory
              'ground',       // Floor
              'Plane002',     // Desk stand
              'Plane003',     // Stand arm
            ];

            characterScene.traverse((obj) => {
              // 1. In Hero and About modes, hide the desk and laptop so the avatar portrait is clean and centered
              // In Desk mode, ensure all desk and laptop workspace elements are visible
              if (deskMeshNames.includes(obj.name) || obj.name.startsWith('KEYS')) {
                if (mode !== 'desk') {
                  obj.visible = false;
                } else {
                  obj.visible = true;
                }
              }

              if ((obj as THREE.Mesh).isMesh) {
                const mesh = obj as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                mesh.frustumCulled = false;

                // 2. Sweatshirt material styling: Change sweatshirt to solid black / very dark charcoal
                // while preserving facial rigging, smile, cap, skin, eyes, teeth, and other materials
                const isSweatshirt =
                  mesh.parent?.name === 'BODYSHIRT' ||
                  mesh.name === 'Cube006' ||
                  mesh.name === 'Cube006_1' ||
                  mesh.name.toLowerCase().includes('shirt');

                if (isSweatshirt) {
                  const applyDarkSweatshirt = (mat: THREE.Material) => {
                    if ((mat as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
                      const darkMat = (mat as THREE.MeshStandardMaterial).clone();
                      darkMat.color.set('#101216'); // Solid black / very dark charcoal
                      darkMat.roughness = 0.65;
                      darkMat.metalness = 0.12;
                      darkMat.needsUpdate = true;
                      return darkMat;
                    }
                    return mat;
                  };

                  if (Array.isArray(mesh.material)) {
                    mesh.material = mesh.material.map(applyDarkSweatshirt);
                  } else if (mesh.material) {
                    mesh.material = applyDarkSweatshirt(mesh.material);
                  }
                }

                // 3. Desk Mode Laptop Screen material
                if (mode === 'desk' && mesh.name === 'screenlight') {
                  if ((mesh.material as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
                    const screenMat = mesh.material as THREE.MeshStandardMaterial;
                    screenMat.transparent = true;
                    screenMat.opacity = 0.95;
                    screenMat.emissive.set('#00e5ff');
                    screenMat.emissiveIntensity = 2.2;
                    screenMat.needsUpdate = true;
                  }
                }
              }
            });

            // Locate Head bone for interactive subtle look-at mouse tracking
            const headBone =
              (characterScene.getObjectByName('spine.006') as THREE.Bone | null) ||
              (characterScene.getObjectByName('spine006') as THREE.Bone | null);

            // Record initial resting head rotation (naturally upright and facing forward)
            const basePitch = headBone ? headBone.rotation.x : -0.3261;
            const baseYaw = 0;

            // Initialize Animation Mixer
            if (gltf.animations && gltf.animations.length > 0) {
              mixer = new THREE.AnimationMixer(characterScene);

              // 1. Intro animation
              const introClip = gltf.animations.find((a) => a.name === 'introAnimation');
              if (introClip) {
                const introAction = mixer.clipAction(introClip);
                introAction.setLoop(THREE.LoopOnce, 1);
                introAction.clampWhenFinished = true;
                introAction.play();
              }

              // 2. Typing animation (active in desk mode, subtle in hero/about)
              const typingClip = gltf.animations.find((a) => a.name === 'typing');
              if (typingClip) {
                const typingAction = mixer.clipAction(typingClip);
                typingAction.setLoop(THREE.LoopRepeat, Infinity);
                typingAction.timeScale = 1.1;
                typingAction.play();
              }

              // 3. Blinking animation
              const blinkClip = gltf.animations.find((a) => a.name === 'Blink');
              if (blinkClip) {
                const blinkAction = mixer.clipAction(blinkClip);
                blinkAction.setLoop(THREE.LoopOnce, 1);
                blinkAction.clampWhenFinished = true;

                // Periodic blinks
                const scheduleNextBlink = () => {
                  const delay = 2600 + Math.random() * 2600;
                  blinkTimer = setTimeout(() => {
                    if (isCancelled) return;
                    blinkAction.reset().play();
                    scheduleNextBlink();
                  }, delay);
                };
                scheduleNextBlink();
              }

              // 4. Laptop key press animations in desk mode
              if (mode === 'desk') {
                ['key1', 'key2', 'key5', 'key6'].forEach((kName) => {
                  const kClip = gltf.animations.find((a) => a.name === kName);
                  if (kClip && mixer) {
                    const kAction = mixer.clipAction(kClip);
                    kAction.setLoop(THREE.LoopRepeat, Infinity);
                    kAction.timeScale = 1.2;
                    kAction.play();
                  }
                });
              }

              // 5. Eyebrow raise on container hover
              const browClip = gltf.animations.find((a) => a.name === 'browup');
              if (browClip) {
                browUpAction = mixer.clipAction(browClip);
                browUpAction.setLoop(THREE.LoopOnce, 1);
                browUpAction.clampWhenFinished = true;
              }
            }

            // Interactive Container Hover Handlers
            onMouseEnter = () => {
              if (browUpAction) {
                browUpAction.reset();
                browUpAction.fadeIn(0.2).play();
              }
            };

            onMouseLeave = () => {
              if (browUpAction) {
                browUpAction.fadeOut(0.4);
              }
              // Reset mouse look-at targets smoothly when cursor leaves container
              mouseRef.current.targetX = 0;
              mouseRef.current.targetY = 0;
            };

            container.addEventListener('mouseenter', onMouseEnter);
            container.addEventListener('mouseleave', onMouseLeave);

            // Signal successfully loaded
            setIsLoaded(true);

            // Animation Render Loop
            const clock = new THREE.Clock();
            const animate = () => {
              if (isCancelled) return;
              animationFrameId = requestAnimationFrame(animate);

              const delta = clock.getDelta();
              const elapsedTime = clock.getElapsedTime();

              // Update animations
              if (mixer) {
                mixer.update(delta);
              }

              // Smooth dampening towards target mouse coordinates (stable and non-jittery)
              mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
              mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

              // Subtle, natural mouse-follow head tracking clamped to 5–10 degree range
              // Uses absolute target lerp (NOT accumulation) to prevent spinning, drift, or jumps
              if (headBone) {
                const maxTurnYaw = mode === 'desk' ? (4.0 * Math.PI) / 180 : (7.5 * Math.PI) / 180;
                const maxTurnPitch = mode === 'desk' ? (3.0 * Math.PI) / 180 : (5.5 * Math.PI) / 180;

                const targetYaw = baseYaw + mouseRef.current.x * maxTurnYaw;
                const targetPitch = basePitch - mouseRef.current.y * maxTurnPitch;

                headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, targetYaw, 0.08);
                headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, targetPitch, 0.08);
                headBone.rotation.z = 0;
              }

              // Subtle natural breathing float (stationary in desk mode to keep desk aligned)
              if (mode !== 'desk') {
                characterScene.position.y = Math.sin(elapsedTime * 1.5) * 0.02;
              }

              // Pulse dynamic screen light in desk mode
              if (mode === 'desk' && screenLight) {
                const hue = (elapsedTime * 0.1) % 1;
                screenLight.color.setHSL(hue, 0.9, 0.55);
                screenLight.intensity = 3.0 + Math.sin(elapsedTime * 3.0) * 0.6;
              }

              if (renderer) {
                renderer.render(scene, camera);
              }
            };

            animate();
          },
          (err) => {
            console.error('Error parsing GLTF model:', err);
            setHasError(true);
          }
        );
      })
      .catch((err) => {
        console.error('Failed to load GLB buffer:', err);
        setHasError(true);
      });

    const sectionEl = container.closest('section') || container;

    // Pointer move tracking with clamped coordinates relative to section bounds
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const rect = sectionEl.getBoundingClientRect();
      const isInside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      if (!isInside) {
        // When cursor leaves the character's section, return smoothly to neutral forward
        mouseRef.current.targetX = 0;
        mouseRef.current.targetY = 0;
        return;
      }

      // Normalized pointer coordinates [-1, 1] relative to section
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      // Clamped strictly to [-1, 1]
      mouseRef.current.targetX = THREE.MathUtils.clamp(normX, -1, 1);
      mouseRef.current.targetY = THREE.MathUtils.clamp(normY, -1, 1);
    };

    const handlePointerLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    const handleScroll = () => {
      const rect = sectionEl.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        // Section is scrolled out of view, return smoothly to neutral forward
        mouseRef.current.targetX = 0;
        mouseRef.current.targetY = 0;
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    sectionEl.addEventListener('mouseleave', handlePointerLeave);
    document.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);

    // Responsive Resize Handler with ResizeObserver + window resize fallback
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      updateCameraFraming(w, h);
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(container);
    }

    return () => {
      isCancelled = true;
      if (blinkTimer) clearTimeout(blinkTimer);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      sectionEl.removeEventListener('mouseleave', handlePointerLeave);
      document.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
      if (onMouseEnter) container.removeEventListener('mouseenter', onMouseEnter);
      if (onMouseLeave) container.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (renderer) {
        renderer.dispose();
      }
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [mode]);

  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none ${className}`}>
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        className={`w-full h-full flex items-center justify-center transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ touchAction: 'none' }}
      />

      {/* Loading state indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
          <span className="mt-3 text-[11px] font-mono tracking-widest text-slate-400 uppercase animate-pulse">
            Loading 3D Model...
          </span>
        </div>
      )}

      {/* Graceful Fallback if WebGL fails */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-3">
            <span className="text-2xl font-black text-cyan-400">DM</span>
          </div>
          <span className="text-xs font-mono text-slate-400">Digvijay Menkudale</span>
        </div>
      )}
    </div>
  );
}

