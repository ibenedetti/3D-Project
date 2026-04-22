import { Cylinder } from './Cylinder.jsx'
import { useRef, useEffect } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import papyrus from '../assets/papyrus.jpg'

export const Scroll = () => {    
    const top = useRef()
    const bottom = useRef()
    const matRef = useRef()

    const texture = useTexture(papyrus, (t) => {
        t.wrapS = THREE.RepeatWrapping
        t.wrapT = THREE.RepeatWrapping
        t.repeat.set(1, 0.5)
    })

    useEffect(() => {
        const handleScroll = () => {
        const scrollY = window.scrollY
        const x = scrollY * 0.01
        top.current.rotation.x = x
        bottom.current.rotation.x = x
        matRef.current.map.offset.y = x * 0.1
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <Cylinder position={[0, 10, 0]} rotation={[0, 0, Math.PI / 2]} ref={top} />
            <mesh> 
                <planeGeometry args={[20, 16]} />
                <meshStandardMaterial ref={matRef} map={texture} roughness={0.5} metalness={0} />
            </mesh>
            <Cylinder position={[0, -10, 0]} rotation={[0, 0, Math.PI / 2]} ref={bottom} />
        </>
    )
}