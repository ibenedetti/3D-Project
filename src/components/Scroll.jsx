import { Cylinder } from './Cylinder.jsx'
import { useRef, useEffect } from 'react'

export const Scroll = () => {
    const top = useRef()
    const bottom = useRef()

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY * 0.01 // tweak multiplier to taste
            top.current.rotation.y = y
            bottom.current.rotation.y = -y
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <Cylinder position={[0, 6, 0]} rotation={[0, 0, Math.PI / 2]} ref={top} />
            <Cylinder position={[0, -8, 0]} rotation={[0, 0, Math.PI / 2]} ref={bottom} />
        </>
    )
}