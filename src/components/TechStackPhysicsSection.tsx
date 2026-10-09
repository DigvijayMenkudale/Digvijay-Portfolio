import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { playBounceTone, playClickTone } from '../utils/sound';

interface TechItem {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'AI / ML' | 'Tools';
  color: string;
  badgeBg: string;
  textColor: string;
  description: string;
}

const TECH_ITEMS: TechItem[] = [
  { id: 'python', name: 'Python', category: 'Backend', color: '#3776ab', badgeBg: '#3776ab', textColor: '#ffd43b', description: 'Core programming language for backend engineering, machine learning, and AI pipelines.' },
  { id: 'django', name: 'Django', category: 'Backend', color: '#092e20', badgeBg: '#092e20', textColor: '#44b78b', description: 'High-level Python web framework with ORM, built-in admin, and security features.' },
  { id: 'fastapi', name: 'FastAPI', category: 'Backend', color: '#009688', badgeBg: '#059669', textColor: '#ffffff', description: 'Modern, fast web framework for building asynchronous REST APIs with Python.' },
  { id: 'react', name: 'React.js', category: 'Frontend', color: '#61dafb', badgeBg: '#20232a', textColor: '#61dafb', description: 'Component-based library for building dynamic, responsive user interfaces.' },
  { id: 'next', name: 'Next.js', category: 'Frontend', color: '#ffffff', badgeBg: '#000000', textColor: '#ffffff', description: 'React framework for server-side rendering, routing, and full-stack web applications.' },
  { id: 'opencv', name: 'OpenCV', category: 'AI / ML', color: '#5c3ee8', badgeBg: '#4f46e5', textColor: '#ffffff', description: 'Computer vision library for real-time face detection, tracking, and image processing.' },
  { id: 'yolo', name: 'YOLOv8', category: 'AI / ML', color: '#10b981', badgeBg: '#047857', textColor: '#ffffff', description: 'State-of-the-art object detection model for plant disease identification and vision tasks.' },
  { id: 'rag', name: 'RAG', category: 'AI / ML', color: '#a855f7', badgeBg: '#7e22ce', textColor: '#ffffff', description: 'Retrieval-Augmented Generation connecting LLMs with external document knowledge bases.' },
  { id: 'gemini', name: 'Gemini AI', category: 'AI / ML', color: '#38bdf8', badgeBg: '#0284c7', textColor: '#ffffff', description: 'Google generative AI models for natural language tasks, trip planning, and chat.' },
  { id: 'postgres', name: 'PostgreSQL', category: 'Database', color: '#336791', badgeBg: '#1e3a8a', textColor: '#ffffff', description: 'Powerful, open-source object-relational database system.' },
  { id: 'sqlite', name: 'SQLite', category: 'Database', color: '#003b57', badgeBg: '#0284c7', textColor: '#ffffff', description: 'Lightweight, serverless SQL database engine used in Django and local projects.' },
  { id: 'firebase', name: 'Firebase', category: 'Database', color: '#ffca28', badgeBg: '#d97706', textColor: '#ffffff', description: 'Cloud platform providing real-time databases and authentication services.' },
  { id: 'chroma', name: 'ChromaDB', category: 'AI / ML', color: '#f43f5e', badgeBg: '#be123c', textColor: '#ffffff', description: 'Open-source AI-native vector database for embeddings search and RAG retrieval.' },
  { id: 'docker', name: 'Docker', category: 'Tools', color: '#2496ed', badgeBg: '#2563eb', textColor: '#ffffff', description: 'Containerization tool for packaging and running applications across environments.' },
  { id: 'git', name: 'Git', category: 'Tools', color: '#f05032', badgeBg: '#dc2626', textColor: '#ffffff', description: 'Distributed version control system for tracking code changes and collaboration.' },
  { id: 'js', name: 'JavaScript', category: 'Frontend', color: '#f7df1e', badgeBg: '#eab308', textColor: '#000000', description: 'Core web programming language for interactive frontend development.' },
  { id: 'node', name: 'Node.js', category: 'Backend', color: '#68a063', badgeBg: '#15803d', textColor: '#ffffff', description: 'JavaScript runtime for building scalable server-side network applications.' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', color: '#38bdf8', badgeBg: '#0369a1', textColor: '#ffffff', description: 'Utility-first CSS framework for crafting responsive modern user interfaces.' },
];

export default function TechStackPhysicsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);
  const [gravityMode, setGravityMode] = useState<'center' | 'floating' | 'heavy'>('center');
  const [interactionHint, setInteractionHint] = useState('Move mouse or drag balls to trigger real-time physics collisions');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 900;
    const height = Math.min(window.innerHeight * 0.8, 620);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 11.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(5, 8, 7);
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0xa855f7, 2.0);
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    // Create Canvas Texture for Sphere Badge
    const createBadgeTexture = (tech: TechItem) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;

      // Crisp White / Pearlescent Sphere Base (matching reference video!)
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, 512, 512);

      // Subtle gradient shading for 3D depth
      const grad = ctx.createRadialGradient(256, 256, 60, 256, 256, 256);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.85, '#e2e8f0');
      grad.addColorStop(1, '#cbd5e1');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);

      // Badge Emblem Circle
      ctx.save();
      ctx.beginPath();
      ctx.arc(256, 256, 175, 0, Math.PI * 2);
      ctx.fillStyle = tech.badgeBg;
      ctx.shadowColor = 'rgba(0,0,0,0.2)';
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.restore();

      // Badge Text
      ctx.fillStyle = tech.textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 84px Outfit, sans-serif';

      // Truncate if long or format like video
      let label = tech.name;
      if (tech.id === 'python') label = 'Python';
      else if (tech.id === 'django') label = 'Django';
      else if (tech.id === 'fastapi') label = 'FastAPI';
      else if (tech.id === 'react') label = 'React';
      else if (tech.id === 'next') label = 'NEXT';
      else if (tech.id === 'opencv') label = 'OpenCV';
      else if (tech.id === 'yolo') label = 'YOLOv8';
      else if (tech.id === 'rag') label = 'RAG';
      else if (tech.id === 'gemini') label = 'Gemini';
      else if (tech.id === 'postgres') label = 'Postgres';
      else if (tech.id === 'sqlite') label = 'SQLite';
      else if (tech.id === 'firebase') label = 'Firebase';
      else if (tech.id === 'chroma') label = 'Chroma';
      else if (tech.id === 'docker') label = 'Docker';
      else if (tech.id === 'git') label = 'Git';
      else if (tech.id === 'js') label = 'JS';
      else if (tech.id === 'node') label = 'node';
      else if (tech.id === 'tailwind') label = 'Tailwind';

      ctx.fillText(label, 256, 256);

      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 8;
      return texture;
    };

    // Physics Spheres Data
    interface PhysicsSphere {
      mesh: THREE.Mesh;
      radius: number;
      pos: THREE.Vector3;
      vel: THREE.Vector3;
      rotVel: THREE.Vector3;
      tech: TechItem;
    }

    const spheres: PhysicsSphere[] = [];
    const sphereGeo = new THREE.SphereGeometry(1, 32, 32);

    TECH_ITEMS.forEach((tech, index) => {
      const radius = 0.65 + (index % 3) * 0.08;
      const texture = createBadgeTexture(tech);

      const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.25,
        metalness: 0.1,
      });

      const mesh = new THREE.Mesh(sphereGeo, material);
      mesh.scale.set(radius, radius, radius);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      // Random starting position clustered near center
      const angle = (index / TECH_ITEMS.length) * Math.PI * 2;
      const dist = 1.2 + Math.random() * 1.5;
      const initialPos = new THREE.Vector3(
        Math.cos(angle) * dist + (Math.random() - 0.5) * 0.8,
        Math.sin(angle) * dist + (Math.random() - 0.5) * 0.8,
        (Math.random() - 0.5) * 1.2
      );
      mesh.position.copy(initialPos);

      scene.add(mesh);

      spheres.push({
        mesh,
        radius,
        pos: initialPos,
        vel: new THREE.Vector3((Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02),
        rotVel: new THREE.Vector3((Math.random() - 0.5) * 0.04, (Math.random() - 0.5) * 0.04, (Math.random() - 0.5) * 0.04),
        tech,
      });
    });

    // Mouse / Raycaster & Interaction State
    const mouse3D = new THREE.Vector3(999, 999, 0);
    const prevMouse3D = new THREE.Vector3(999, 999, 0);
    const mouseVel = new THREE.Vector3(0, 0, 0);
    let isDragging = false;
    let draggedSphere: PhysicsSphere | null = null;
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    const getMouseRayIntersection = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const rect = container.getBoundingClientRect();
      const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);
      const intersection = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersection);
      return { ndcX, ndcY, intersection };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const { intersection } = getMouseRayIntersection(e);
      if (intersection) {
        prevMouse3D.copy(mouse3D);
        mouse3D.copy(intersection);
        mouseVel.subVectors(mouse3D, prevMouse3D);

        if (isDragging && draggedSphere) {
          draggedSphere.pos.copy(intersection);
          draggedSphere.vel.copy(mouseVel).multiplyScalar(0.7);
        }
      }
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const { ndcX, ndcY, intersection } = getMouseRayIntersection(e);
      raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);
      const hits = raycaster.intersectObjects(spheres.map((s) => s.mesh));

      if (hits.length > 0) {
        const hitMesh = hits[0].object as THREE.Mesh;
        const target = spheres.find((s) => s.mesh === hitMesh);
        if (target) {
          isDragging = true;
          draggedSphere = target;
          target.vel.set(0, 0, 0);
          setSelectedTech(target.tech);
          playClickTone();
          setInteractionHint(`Selected ${target.tech.name} • Drag and fling across the canvas!`);
        }
      }
    };

    const handlePointerUp = () => {
      if (isDragging && draggedSphere) {
        // Apply fling velocity
        draggedSphere.vel.add(mouseVel.clone().multiplyScalar(1.2));
        playBounceTone(440);
      }
      isDragging = false;
      draggedSphere = null;
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);

    container.addEventListener('touchmove', handlePointerMove, { passive: false });
    container.addEventListener('touchstart', handlePointerDown, { passive: false });
    window.addEventListener('touchend', handlePointerUp);

    // Physics Simulation Loop
    let animationFrameId: number;
    const boundaryX = 5.2;
    const boundaryY = 3.2;
    const boundaryZ = 2.4;

    const animatePhysics = () => {
      animationFrameId = requestAnimationFrame(animatePhysics);

      // Determine center gravity pull based on mode
      const centerAttraction = gravityMode === 'center' ? 0.0035 : gravityMode === 'heavy' ? 0.008 : 0.001;

      for (let i = 0; i < spheres.length; i++) {
        const s = spheres[i];

        if (s !== draggedSphere) {
          // Clumping gravity towards origin
          const toOrigin = new THREE.Vector3().sub(s.pos).multiplyScalar(centerAttraction);
          s.vel.add(toOrigin);

          // Downward gravity in heavy mode
          if (gravityMode === 'heavy') {
            s.vel.y -= 0.003;
          }

          // Cursor Repulsion Force (the signature video interaction!)
          const toMouse = new THREE.Vector3().subVectors(s.pos, mouse3D);
          const distToMouse = toMouse.length();
          const mouseRadius = 2.4;

          if (distToMouse < mouseRadius && distToMouse > 0.01) {
            const pushMagnitude = (1 - distToMouse / mouseRadius) * 0.035;
            toMouse.normalize().multiplyScalar(pushMagnitude);
            s.vel.add(toMouse);

            // Add rotational spin from cursor motion
            s.rotVel.x += (Math.random() - 0.5) * 0.02;
            s.rotVel.y += (Math.random() - 0.5) * 0.02;
          }

          // Friction damping
          s.vel.multiplyScalar(0.96);
          s.pos.add(s.vel);

          // Wall Boundaries Bounce
          if (Math.abs(s.pos.x) > boundaryX - s.radius) {
            s.pos.x = Math.sign(s.pos.x) * (boundaryX - s.radius);
            s.vel.x *= -0.7;
          }
          if (Math.abs(s.pos.y) > boundaryY - s.radius) {
            s.pos.y = Math.sign(s.pos.y) * (boundaryY - s.radius);
            s.vel.y *= -0.7;
          }
          if (Math.abs(s.pos.z) > boundaryZ - s.radius) {
            s.pos.z = Math.sign(s.pos.z) * (boundaryZ - s.radius);
            s.vel.z *= -0.7;
          }
        }

        // Apply rotation
        s.mesh.rotation.x += s.rotVel.x + s.vel.y * 0.2;
        s.mesh.rotation.y += s.rotVel.y + s.vel.x * 0.2;
        s.rotVel.multiplyScalar(0.98);

        // Update mesh position
        s.mesh.position.copy(s.pos);

        // Sphere-to-sphere collision resolution
        for (let j = i + 1; j < spheres.length; j++) {
          const s2 = spheres[j];
          const diff = new THREE.Vector3().subVectors(s2.pos, s.pos);
          const dist = diff.length();
          const minDist = s.radius + s2.radius;

          if (dist < minDist && dist > 0.001) {
            // Overlap correction
            const overlap = (minDist - dist) * 0.5;
            const normal = diff.clone().normalize();

            if (s !== draggedSphere) s.pos.sub(normal.clone().multiplyScalar(overlap));
            if (s2 !== draggedSphere) s2.pos.add(normal.clone().multiplyScalar(overlap));

            // Elastic bounce
            const relativeVel = new THREE.Vector3().subVectors(s2.vel, s.vel);
            const impulse = relativeVel.dot(normal);

            if (impulse < 0) {
              const restitution = 0.75;
              const impulseVector = normal.multiplyScalar(impulse * (1 + restitution) * 0.5);
              if (s !== draggedSphere) s.vel.add(impulseVector);
              if (s2 !== draggedSphere) s2.vel.sub(impulseVector);

              // Sound on significant collision
              if (Math.abs(impulse) > 0.04) {
                playBounceTone(260 + (i % 5) * 40);
              }
            }
          }
        }
      }

      renderer.render(scene, camera);
    };

    animatePhysics();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = Math.min(window.innerHeight * 0.8, 620);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('touchmove', handlePointerMove);
      container.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchend', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container) container.innerHTML = '';
    };
  }, [gravityMode]);

  return (
    <section id="techstack" className="relative py-28 px-4 md:px-8 border-t border-white/5 bg-[#07090f] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header matching video */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-2">
              <span>Interactive Physics Showcase</span>
              <span aria-hidden="true">·</span>
              <span>WebGL 3D Engine</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase">
              MY TECHSTACK
            </h2>
          </div>

          {/* Interactive Mode Switches */}
          <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/10 self-start md:self-auto">
            <button
              onClick={() => {
                setGravityMode('center');
                playClickTone();
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                gravityMode === 'center'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Cluster Gravity
            </button>
            <button
              onClick={() => {
                setGravityMode('floating');
                playClickTone();
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                gravityMode === 'floating'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Zero-G Float
            </button>
            <button
              onClick={() => {
                setGravityMode('heavy');
                playClickTone();
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                gravityMode === 'heavy'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Earth Gravity
            </button>
          </div>
        </div>

        {/* 3D Physics Canvas Container */}
        <div className="relative w-full h-[480px] md:h-[580px] rounded-3xl glass-card border border-white/10 overflow-hidden cursor-grab active:cursor-grabbing shadow-2xl">
          <div ref={containerRef} className="w-full h-full" />

          {/* Interaction Instruction Banner */}
          <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto flex items-center gap-3 px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/10 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono">{interactionHint}</span>
          </div>

          {/* Selected Tech Card Overlay */}
          {selectedTech && (
            <div className="absolute top-4 right-4 max-w-xs p-4 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-cyan-500/30 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: selectedTech.color }}
                  />
                  <h4 className="font-bold text-white text-base">{selectedTech.name}</h4>
                </div>
                <button
                  onClick={() => setSelectedTech(null)}
                  className="text-slate-400 hover:text-white text-xs p-1"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {selectedTech.description}
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 border-t border-white/10 pt-2">
                <span>Domain: {selectedTech.category}</span>
                <span>Active Stack</span>
              </div>
            </div>
          )}
        </div>

        {/* Static Unboxed Metadata Tech Grid (Zero-Pill Discipline) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400 font-mono">
          <span>Python</span>
          <span aria-hidden="true">·</span>
          <span>Django</span>
          <span aria-hidden="true">·</span>
          <span>FastAPI</span>
          <span aria-hidden="true">·</span>
          <span>React.js</span>
          <span aria-hidden="true">·</span>
          <span>Next.js</span>
          <span aria-hidden="true">·</span>
          <span>OpenCV &amp; YOLOv8</span>
          <span aria-hidden="true">·</span>
          <span>RAG &amp; ChromaDB</span>
          <span aria-hidden="true">·</span>
          <span>Gemini AI &amp; Ollama</span>
          <span aria-hidden="true">·</span>
          <span>PostgreSQL &amp; SQLite</span>
          <span aria-hidden="true">·</span>
          <span>Firebase</span>
          <span aria-hidden="true">·</span>
          <span>Docker &amp; Git</span>
        </div>
      </div>
    </section>
  );
}
