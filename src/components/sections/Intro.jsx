import { Canvas } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import { useState, useEffect } from 'react'

export default function Intro({ onComplete }) {
  const [entered, setEntered] = useState(false)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      // Ajustement de l'échelle pour mobile
      if (window.innerWidth < 768) {
        setScale(0.6)
      } else {
        setScale(1)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleEnter = () => {
    setEntered(true)
    onComplete()
  }

  return (
    <div className="h-screen w-full relative bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <color attach="background" args={['#000']} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          
          <Sparkles count={500} scale={20} size={1} speed={0.2} opacity={0.4} color="#ffffff" />
          
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <mesh 
                scale={[scale, scale, scale]}
                onClick={handleEnter} 
                onPointerOver={() => document.body.style.cursor = 'pointer'} 
                onPointerOut={() => document.body.style.cursor = 'auto'}
              >
                  <torusKnotGeometry args={[1, 0.3, 100, 16]} />
                  <meshStandardMaterial color="white" wireframe />
              </mesh>
          </Float>
        </Canvas>
      </div>
      
      {!entered && (
        <div className="absolute bottom-10 text-white text-sm tracking-[0.5em] animate-pulse pointer-events-none z-10 text-center px-4">
          CLICK TO ENTER
        </div>
      )}
    </div>
  )
}
