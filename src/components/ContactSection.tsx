import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, MessageSquare, ArrowUpRight } from 'lucide-react';
import { playClickTone } from '../utils/sound';

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-28 px-4 md:px-8 border-t border-white/5 bg-[#06080e] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-cyan-950/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-purple-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Direct Contact Details & Social Profiles */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-3">
                <span>Get In Touch</span>
                <span aria-hidden="true">·</span>
                <span>Open For Opportunities</span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase mb-4">
                CONTACT
              </h2>

              <p className="text-base text-slate-300 leading-relaxed font-light mb-8">
                I am an aspiring Full Stack Developer and AI enthusiast actively seeking opportunities
                to build practical web applications, backend services, and intelligent solutions.
                Feel free to reach out directly through any of the channels below.
              </p>

              {/* Verified Contact Cards */}
              <div className="space-y-3 mb-8 w-full">
                {/* Email Card */}
                <div className="p-4 rounded-2xl glass-card border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block mb-0.5">
                        Email Address
                      </span>
                      <a
                        href="mailto:rushikeshmenkudale385@gmail.com"
                        onClick={playClickTone}
                        className="text-sm sm:text-base font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors truncate block"
                      >
                        rushikeshmenkudale385@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="p-4 rounded-2xl glass-card border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block mb-0.5">
                        Phone / Mobile
                      </span>
                      <a
                        href="tel:7499294869"
                        onClick={playClickTone}
                        className="text-sm sm:text-base font-mono font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        +91 7499294869
                      </a>
                    </div>
                  </div>
                </div>

                {/* Location Card */}
                <div className="p-4 rounded-2xl glass-card border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block mb-0.5">
                        Location
                      </span>
                      <span className="text-sm font-mono text-slate-300">
                        Solapur, Maharashtra, India
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="space-y-2.5 w-full">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-2">
                  Social Profiles &amp; Repositories
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
                  <a
                    href="https://github.com/DigvijayMenkudale"
                    target="_blank"
                    rel="noreferrer"
                    onClick={playClickTone}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 hover:border-cyan-500/30 transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Github className="w-4 h-4 text-cyan-400" />
                      <span>GitHub</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </a>

                  <a
                    href="https://linkedin.com/in/digvijaymenkudale"
                    target="_blank"
                    rel="noreferrer"
                    onClick={playClickTone}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 hover:border-cyan-500/30 transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Linkedin className="w-4 h-4 text-cyan-400" />
                      <span>LinkedIn</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visually Striking "LET'S CONNECT" Panel */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="p-8 sm:p-12 rounded-3xl glass-card border border-white/10 hover:border-cyan-500/30 transition-all duration-300 shadow-2xl relative flex flex-col justify-between h-full overflow-hidden">
              {/* Subtle decorative radial flare inside card */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <span>Collaboration &amp; Hiring</span>
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
                  LET&apos;S CONNECT
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                  Whether you are a recruiter or engineering lead looking for an early-career Full Stack Developer
                  with hands-on project experience in <strong className="text-white font-medium">Python, Django, FastAPI, React.js, and Next.js</strong>,
                  or a developer looking to collaborate, discuss computer vision, or explore Retrieval-Augmented Generation (RAG)
                  systems—my inbox is always open.
                </p>

                {/* Professional Discussion Areas */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    What we can discuss:
                  </div>
                  <div className="space-y-2 text-xs font-mono text-slate-300">
                    <div className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-bold">›</span>
                      <span>Full-Time Full Stack &amp; Backend Engineering Opportunities</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-bold">›</span>
                      <span>Academic &amp; Internship Project Walkthroughs (FaceX, GateSphere, EduSense)</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-bold">›</span>
                      <span>Computer Vision (OpenCV / YOLOv8) &amp; RAG Architecture Implementations</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="relative z-10 pt-8 mt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                {/* Prominent "SEND ME AN EMAIL" CTA */}
                <a
                  href="mailto:rushikeshmenkudale385@gmail.com"
                  onClick={playClickTone}
                  className="flex-1 py-4 px-6 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono text-xs uppercase tracking-widest font-black rounded-xl transition-all shadow-[0_0_24px_rgba(6,182,212,0.4)] hover:shadow-[0_0_32px_rgba(6,182,212,0.6)] flex items-center justify-center gap-2.5 cursor-pointer text-center group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>SEND ME AN EMAIL</span>
                </a>

                {/* Secondary LinkedIn CTA */}
                <a
                  href="https://linkedin.com/in/digvijaymenkudale"
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClickTone}
                  className="py-4 px-6 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs uppercase tracking-wider font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info matching video */}
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            Designed and Developed by <strong className="text-white">Digvijay Menkudale</strong>
          </div>
          <div>
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </div>
    </section>
  );
}
