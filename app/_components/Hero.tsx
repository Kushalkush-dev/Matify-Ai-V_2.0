import React, { useState, useEffect } from 'react';
import { ArrowRight, Brain, Calculator, ChevronRight, Sigma, Sparkles, Variable, Play } from 'lucide-react';
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs';

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white text-gray-900 selection:bg-indigo-200/40">
      
      {/* --- Background Effects --- */}
      
      {/* 1. Grid Pattern (Math Notebook feel) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* 2. Ambient Glow */}
      <div className="absolute -top-40 left-0 right-0 mx-auto h-[500px] w-[500px] rounded-full bg-indigo-200/30 blur-[100px]"></div>
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-pink-100/20 blur-[120px]"></div>

      {/* 3. Floating Math Symbols (Decorative) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingSymbol icon={<Sigma />} top="15%" left="10%" delay="0s" />
        <FloatingSymbol icon={<Variable />} top="25%" right="15%" delay="2s" />
        <FloatingSymbol icon={<Calculator />} bottom="20%" left="20%" delay="4s" />
        <FloatingSymbol icon={<Brain />} top="10%" right="30%" delay="1s" opacity={0.08} />
      </div>

      {/* --- Main Content --- */}
      <div className="relative mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8 lg:pt-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          
          {/* Left Column: Copy & CTA */}
          <div className="relative z-10 max-w-2xl text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200/50 bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Matify AI is live</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
              Math solving, <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                reimagined
              </span> on canvas.
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg leading-8 text-gray-700">
              Don't just type, draw. Matify AI interprets your handwriting to solve complex logic, geometry, and calculus problems instantly. Experience the fusion of creativity and computation.
            </p>

            {/* Buttons / CTA */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              {/* NOTE: Replace <a> with <RegisterLink> in your Next.js app */}


              <RegisterLink  className="group relative inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white shadow-lg shadow-indigo-200/40 transition-all hover:bg-indigo-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white">
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              
              </RegisterLink>

              <a 
                href="#"
                className="group inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-8 py-4 font-semibold text-gray-700 backdrop-blur-sm transition-all hover:bg-gray-100"
              >
                <Play className="h-4 w-4 fill-current" />
                Watch Demo
              </a>
            </div>
            
            {/* Trust Badges / Social Proof */}
            <div className="mt-10 flex items-center justify-center gap-6 lg:justify-start grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <span className="text-sm font-semibold tracking-wider text-gray-600 uppercase">Accurate Solution in</span>
              {/* Simple text placeholders for logos */}
              <span className="font-bold text-gray-700">Arithmetic</span>
              <span className="font-bold text-gray-700">Algebra</span>
              <span className="font-bold text-gray-700">Geometry</span>
            </div>
          </div>

          {/* Right Column: Dynamic Visual (Replaces static image) */}
          <div 
            className="relative perspective-1000"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Glass Card Container */}
            <div className={`relative aspect-[4/3] w-full transform rounded-2xl border border-gray-200 bg-white/70 p-4 shadow-2xl backdrop-blur-xl transition-transform duration-700 ease-out ${isHovered ? 'rotate-y-2 scale-[1.02]' : 'rotate-y-0'}`}>
              
              {/* Mock Browser/App Header */}
              <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-4">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400/40"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400/40"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400/40"></div>
                </div>
                <div className="ml-4 h-6 w-32 rounded-full bg-gray-200"></div>
              </div>

              {/* Internal Content (Simulating the App) */}
              <div className="flex h-[80%] gap-4">
                {/* Left: Drawing Area */}
                <div className="flex-1 rounded-lg bg-gray-50 p-4 relative overflow-hidden">
                  <div className="absolute top-4 left-4 text-xs text-indigo-600 font-mono">Input: Geometry</div>
                  
                  {/* Handwritten Geometry Problem (Triangle) */}
                  <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32" viewBox="0 0 200 120">
                    {/* Triangle Path */}
                    <path 
                      d="M60,100 L60,20 L140,100 Z" 
                      fill="none" 
                      stroke="#111827" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="animate-draw" 
                    />
                    {/* Right Angle Symbol */}
                    <path d="M60,90 L70,90 L70,100" fill="none" stroke="#111827" strokeWidth="2" strokeOpacity="0.6" />
                    
                    {/* Handwritten Labels */}
                    <text x="40" y="60" fill="#111827" fontSize="20" fontFamily="serif" fontStyle="italic">3</text>
                    <text x="100" y="115" fill="#111827" fontSize="20" fontFamily="serif" fontStyle="italic">4</text>
                    <text x="110" y="50" fill="#6366f1" fontSize="24" fontFamily="serif" fontStyle="italic" fontWeight="bold">x?</text>
                  </svg>
                  
                  {/* Scanning Effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-200/30 to-transparent translate-y-[-100%] animate-scan"></div>
                </div>

                {/* Arrow */}
                 <div className="flex items-center justify-center text-gray-400">
                   <ChevronRight className="animate-pulse" />
                </div>

                {/* Right: Solution Area */}
                 <div className="flex-1 rounded-lg bg-gray-50 border border-gray-200 p-4 relative flex flex-col justify-center">
                  <div className="absolute top-4 left-4 text-xs text-green-600 font-mono">Output: Solution</div>
                  
                  {/* Solution Steps */}
                  <div className="font-mono text-sm space-y-3 pl-2 border-l-2 border-gray-200">
                    <div className="text-gray-600 opacity-90">
                      <span className="text-indigo-600">a²</span> + <span className="text-indigo-600">b²</span> = <span className="text-indigo-600">c²</span>
                    </div>
                    <div className="text-gray-700">
                      3² + 4² = x²
                    </div>
                    <div className="text-gray-700">
                      9 + 16 = x²
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                      <span className="text-lg font-bold text-green-600">x = 5</span>
                    </div>
                  </div>
                 </div>
              </div>

            </div>

            {/* Decorative Behind Elements */}
            <div className="absolute -right-10 -top-10 -z-10 h-72 w-72 rounded-full bg-indigo-200/20 blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 -z-10 h-72 w-72 rounded-full bg-pink-200/10 blur-3xl"></div>
          </div>

        </div>
      </div>

      {/* CSS for custom animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
          50% { transform: translateY(-20px) rotate(10deg); opacity: 0.3; }
          100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .rotate-y-2 {
          transform: rotateY(-5deg);
        }
      `}</style>
    </div>
  );
};

// Helper Component for floating math symbols
const FloatingSymbol = ({ icon, top, left, right, bottom, delay, opacity = 0.2 }:any) => {
  return (
    <div 
      className="absolute text-indigo-500 animate-float"
      style={{
        top, left, right, bottom,
        opacity: opacity,
        animation: `float 6s ease-in-out infinite`,
        animationDelay: delay
      }}
    >
      {React.cloneElement(icon, { size: 48 })}
    </div>
  );
};

export default HeroSection;