import { forwardRef } from 'react'

export const Cylinder = forwardRef((props, ref) => {
  return (
    <mesh ref={ref} {...props}>
      <cylinderGeometry args={[3, 3, 10, 32]} />
      <meshStandardMaterial color="#f5edd6" />
    </mesh>
  )
})