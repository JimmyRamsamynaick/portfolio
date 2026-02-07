import { useState } from 'react'
import SmoothScroll from '@/components/layout/SmoothScroll'
import Cursor from '@/components/ui/Cursor'
import Intro from '@/components/sections/Intro'
import SplitText from '@/components/ui/SplitText'
import Magnetic from '@/components/ui/Magnetic'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import ProjectShowcase from '@/components/sections/ProjectShowcase'

function App() {
  const [introComplete, setIntroComplete] = useState(false)

  const projects = [
    {
      id: 0,
      title: "Yako Guardian",
      description: "Solution de cybersécurité Discord complète : Anti-Raid, Backup système et Modération avancée.",
      tech: ["Node.js", "MongoDB", "Discord.js"],
      link: "https://github.com/JimmyRamsamynaick/Yako_Guardian"
    },
    {
      id: 1,
      title: "Yako Bot Discord",
      description: "Bot administrateur pour Discord avec modération automatique et gestion des utilisateurs.",
      tech: ["JavaScript", "Discord.js", "Node.js"],
      link: "https://github.com/JimmyRamsamynaick/better-yako-"
    },
    {
      id: 2,
      title: "Popeye",
      description: "Projet de découverte Docker réalisé à Epitech, utilisant Dockerfiles et Docker Compose.",
      tech: ["Docker", "Docker Compose", "Linux"],
      link: "https://github.com/JimmyRamsamynaick/Popeye_Epitech"
    },
    {
      id: 3,
      title: "My_Sokoban",
      description: "Implémentation du jeu classique Sokoban en C avec gestion des déplacements.",
      tech: ["C", "CSFML", "Algorithmes"],
      link: "https://github.com/JimmyRamsamynaick/my_sokoban_Epitech"
    },
    {
      id: 4,
      title: "My_printf",
      description: "Réimplémentation personnalisée de printf() en C.",
      tech: ["C", "Pointeurs", "Formatage"],
      link: "https://github.com/JimmyRamsamynaick/My_Printf"
    },
    {
      id: 5,
      title: "Bash Tools",
      description: "Collection d'outils professionnels en Bash pour l'automatisation système.",
      tech: ["Bash", "Linux", "Cron"],
      link: "https://github.com/JimmyRamsamynaick/Projet-Bash"
    }
  ]

  return (
    <SmoothScroll>
      <Cursor />
      
      <AnimatePresence mode="wait">
        {!introComplete ? (
          <motion.div
            key="intro"
            className="fixed inset-0 z-50 bg-black"
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <Intro onComplete={() => setIntroComplete(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 bg-black text-white min-h-screen"
          >
            {/* Hero Section */}
            <header className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-black to-black z-0 pointer-events-none" />
              
              <div className="z-10 text-center px-4">
                <Magnetic>
                  <div className="inline-block mb-4">
                     <SplitText className="text-5xl md:text-8xl font-bold tracking-tighter mix-blend-difference" delay={0.5}>
                      JIMMY
                    </SplitText>
                     <SplitText className="text-5xl md:text-8xl font-bold tracking-tighter mix-blend-difference text-zinc-500" delay={0.7}>
                      RAMSAMYNAICK
                    </SplitText>
                  </div>
                </Magnetic>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="mt-6 text-xl md:text-2xl text-gray-400 font-light tracking-wide"
                >
                  Développeur & Technicien Système Réseau Sécurité
                </motion.p>
                
                <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 1.8, duration: 1 }}
                   className="mt-4 text-zinc-500 flex items-center justify-center gap-2"
                >
                   <span>📍 La Réunion, France</span>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 flex flex-col items-center gap-2"
              >
                <span className="text-xs uppercase tracking-widest text-zinc-500">Scroll to Explore</span>
                <div className="w-[1px] h-12 bg-zinc-800 overflow-hidden">
                  <motion.div 
                    className="w-full h-full bg-white"
                    animate={{ y: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  />
                </div>
              </motion.div>
            </header>
            
            {/* About Section */}
            <section className="min-h-screen flex items-center justify-center bg-zinc-900 relative py-20">
              <div className="max-w-4xl px-6 w-full">
                <h2 className="text-4xl md:text-6xl font-bold mb-16 text-zinc-300">
                  <SplitText>About Me</SplitText>
                </h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white">Formation</h3>
                        <p className="text-zinc-400 leading-relaxed">
                            Diplômé d'un Bac STI2D SIN, j'ai poursuivi mes études à <strong className="text-white">Epitech Technology</strong> avant de rejoindre <strong className="text-white">Expernet Campus</strong> pour me spécialiser en TSRS.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white">Expérience</h3>
                        <p className="text-zinc-400 leading-relaxed">
                            Actuellement en poste chez <strong className="text-white">Expernet Informatique</strong>, je développe mes compétences en administration système, sécurité réseau et DevOps.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white">Passion</h3>
                        <p className="text-zinc-400 leading-relaxed">
                            Passionné par l'informatique dans sa globalité, j'aime explorer de nouvelles technologies et créer des solutions innovantes.
                        </p>
                    </div>
                </div>

                <div className="mt-16 pt-16 border-t border-zinc-800">
                    <h3 className="text-xl font-bold mb-6 text-zinc-500 uppercase tracking-widest">Skills</h3>
                    <div className="flex flex-wrap gap-3">
                        {["C/C++", "HTML5/CSS3/JS", "Linux Admin", "Docker & DevOps", "Network Security", "Bash Scripting"].map((skill) => (
                            <span key={skill} className="px-4 py-2 bg-zinc-800 rounded-full text-sm text-zinc-300 border border-zinc-700">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
              </div>
            </section>
            
            {/* Projects Section */}
            <ProjectShowcase projects={projects} />

             {/* Footer */}
            <footer className="h-[50vh] flex flex-col items-center justify-center bg-zinc-950 text-center px-6">
                <div className="max-w-2xl w-full">
                    <h3 className="text-3xl md:text-5xl font-bold mb-8">Let's work together</h3>
                    <p className="text-zinc-400 mb-12 text-lg">
                        Intéressé par une collaboration ? Discutons ensemble !
                    </p>
                    
                    <div className="flex justify-center gap-6 mb-12 flex-wrap">
                         <Magnetic>
                            <a href="mailto:jimmyramsamynaick@gmail.com" className="inline-flex items-center justify-center p-4 bg-zinc-900 rounded-full hover:bg-white hover:text-black transition-all duration-300">
                                <Mail className="w-6 h-6" />
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a href="https://github.com/JimmyRamsamynaick" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center p-4 bg-zinc-900 rounded-full hover:bg-white hover:text-black transition-all duration-300">
                                <Github className="w-6 h-6" />
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a href="https://linkedin.com/in/jimmyramsamynaick" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center p-4 bg-zinc-900 rounded-full hover:bg-white hover:text-black transition-all duration-300">
                                <Linkedin className="w-6 h-6" />
                            </a>
                        </Magnetic>
                    </div>
                    
                    <div className="text-zinc-600 text-sm">
                        &copy; 2026 Jimmy Ramsamynaick. Made with React & WebGL.
                    </div>
                </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </SmoothScroll>
  )
}

export default App
