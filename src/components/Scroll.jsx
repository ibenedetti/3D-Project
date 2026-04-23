import { Cylinder } from './Cylinder.jsx'
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { ClothPlane } from './ClothPlane'

export const Scroll = () => {
    const top = useRef()
    const bottom = useRef()
    const planeRef = useRef()
    const progress = useRef(0)

    useFrame((_, delta) => {
        if (progress.current >= 1) return
        progress.current = Math.min(progress.current + delta * 0.5, 1)

        const t = progress.current
        top.current.position.y = t * 10
        bottom.current.position.y = t * -10
        top.current.rotation.x = t * Math.PI * 2
        bottom.current.rotation.x = -t * Math.PI * 2
        planeRef.current.scale.y = t
    })

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            const rotationSpeed = 0.01
            top.current.rotation.x = scrollY * rotationSpeed
            bottom.current.rotation.x = scrollY * rotationSpeed
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <Cylinder position={[0, 10, 0]} rotation={[0, 0, Math.PI / 2]} ref={top} />
            <ClothPlane planeRef={planeRef} />
            <Cylinder position={[0, -10, 0]} rotation={[0, 0, Math.PI / 2]} ref={bottom} />
        </>
    )
}