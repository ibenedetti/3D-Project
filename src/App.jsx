import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Scroll } from './components/Scroll'

export default function App() {
  return (
    <Canvas
      style={{ width: "100%", height: "100dvh" }}
      camera={{ position: [0, 0, 10], fov: 100 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 5]} />
      
      <Scroll />

      <OrbitControls />
    </Canvas>
  )
}