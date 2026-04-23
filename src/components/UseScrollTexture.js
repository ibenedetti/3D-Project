import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { drawScrollContent, CANVAS_WIDTH, CANVAS_HEIGHT } from './drawScrollContent'

import papyrusSrc from '../assets/papyrus.jpg'
import houndSrc from '../assets/hound.jpg'
import knightSrc from '../assets/knight.jpg'
import dragonSrc from '../assets/dragon.jpg'
import marketSrc from '../assets/market.jpg'

function loadImage(src) {
    return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = () => resolve(null)
        img.src = src
    })
}

export function useScrollTexture() {
    const imagesRef = useRef({})
    const scrollY = useRef(0)
    const readyRef = useRef(false)

    const canvasRef = useRef(null)
    const textureRef = useRef(null)
    if (!canvasRef.current) {
        const canvas = document.createElement('canvas')
        canvas.width = CANVAS_WIDTH
        canvas.height = CANVAS_HEIGHT
        canvasRef.current = canvas

        const tex = new THREE.CanvasTexture(canvas)
        tex.minFilter = THREE.LinearFilter
        tex.magFilter = THREE.LinearFilter
        textureRef.current = tex
    }

    useEffect(() => {
        Promise.all([
            loadImage(papyrusSrc),
            loadImage(houndSrc),
            loadImage(knightSrc),
            loadImage(dragonSrc),
            loadImage(marketSrc),
        ]).then(([papyrus, hound, knight, dragon, market]) => {
            imagesRef.current = { papyrus, hound, knight, dragon, market }
            readyRef.current = true
        })

        const handleScroll = () => {
            scrollY.current = window.scrollY
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    function updateTexture() {
        if (!readyRef.current) return
        const ctx = canvasRef.current.getContext('2d')
        drawScrollContent(ctx, imagesRef.current, scrollY.current)
        textureRef.current.needsUpdate = true
    }

    return { texture: textureRef.current, updateTexture }
}