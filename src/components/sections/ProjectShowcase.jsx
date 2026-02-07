import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Magnetic from '@/components/ui/Magnetic';

const ProjectItem = ({ project, index, total }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Animation values based on scroll position
  const opacity = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.8, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [100, 0, -100]);

  return (
    <section 
      ref={ref} 
      className="min-h-screen flex items-center justify-center"
    >
      <motion.div 
        style={{ opacity, scale, y }}
        className="max-w-4xl w-full mx-6 bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-zinc-800 p-8 md:p-16 relative overflow-hidden group"
      >
        {/* Background Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Project Number */}
        <div className="absolute top-8 left-8 text-zinc-800 text-6xl md:text-9xl font-bold opacity-20 select-none">
          {String(index + 1).padStart(2, '0')}
        </div>

        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start md:items-center">
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                {project.title}
              </h3>
              <p className="text-xl text-zinc-400 leading-relaxed max-w-xl">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {project.tech.map((t) => (
                <span key={t} className="px-4 py-2 bg-white/5 rounded-full text-sm text-zinc-300 border border-white/10">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-6 pt-4">
              <Magnetic>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>View Code</span>
                </a>
              </Magnetic>
              {project.demo && (
                <Magnetic>
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Live Demo</span>
                  </a>
                </Magnetic>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const ProjectShowcase = ({ projects }) => {
  return (
    <div className="relative bg-black">
      {/* Sticky Heading */}
      <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none">
        <div className="absolute top-20 text-center">
          <h2 className="text-sm md:text-base font-bold text-zinc-500 uppercase tracking-[0.3em]">
            Selected Works
          </h2>
        </div>
      </div>

      <div className="relative z-10 pb-40">
        {projects.map((project, index) => (
          <ProjectItem 
            key={project.id} 
            project={project} 
            index={index} 
            total={projects.length} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectShowcase;
