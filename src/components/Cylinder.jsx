import { forwardRef } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import papyrus from '../assets/papyrus.jpg'



export const Cylinder = forwardRef((props, ref) => {
   const texture = useTexture(papyrus)
  return (
    <mesh ref={ref} {...props}>
      <cylinderGeometry args={[2, 2, 20, 32]} />
      <meshStandardMaterial map={texture} roughness={0.5} metalness={0} />
    </mesh>
  )
})