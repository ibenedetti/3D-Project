import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollTexture } from './UseScrollTexture'

const vertexShader = `
  uniform vec2 uMouse;
  uniform float uDent;
  uniform float uRadius;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;

    vec2 mouseWorld = uMouse * vec2(15.0, 100.0);

    float dist = distance(pos.xy, mouseWorld);
    float influence = exp(-dist * dist / (uRadius * uRadius));

    pos.z -= influence * uDent;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;

  void main() {
    gl_FragColor = texture2D(uTexture, vUv);
  }
`

export const ClothPlane = ({ planeRef }) => {
    const { camera, gl } = useThree()
    const mouse = useRef(new THREE.Vector2(9999, 9999))
    const raycaster = useRef(new THREE.Raycaster())

    const hitPlane = useRef(
        new THREE.Mesh(
            new THREE.PlaneGeometry(30, 200),
            new THREE.MeshBasicMaterial({ visible: false })
        )
    )

    const { texture, updateTexture } = useScrollTexture()

    const uniforms = useMemo(() => ({
        uMouse: { value: new THREE.Vector2(9999, 9999) },
        uDent: { value: 3.0 },
        uRadius: { value: 8.0 },
        uTexture: { value: texture },
    }), [texture])

    useEffect(() => {
        hitPlane.current.position.set(0, -85, -10)

        const handleMouseMove = (e) => {
            const rect = gl.domElement.getBoundingClientRect()
            mouse.current.set(
                ((e.clientX - rect.left) / rect.width) * 2 - 1,
                -((e.clientY - rect.top) / rect.height) * 2 + 1
            )
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [gl])

   useFrame(() => {
    updateTexture()

    raycaster.current.setFromCamera(mouse.current, camera)
    const hits = raycaster.current.intersectObject(hitPlane.current)
    if (hits.length > 0) {
        const { x, y } = hits[0].point
        uniforms.uMouse.value.set(x / 15.0, (y + 86) / 100.0)
    }
})

    return (
        <mesh ref={planeRef} position={[0, -83, -10]}>
            <planeGeometry args={[37, 200, 60, 60]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                side={THREE.DoubleSide}
            />
        </mesh>
    )
}