import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function SamratYantra3D({ dimensions, shadowData }) {
  const shadowRef = useRef()
  
  useFrame(() => {
    if (shadowRef.current && shadowData) {
      const angleRad = THREE.MathUtils.degToRad(shadowData.shadow_angle)
      const length = Math.min(shadowData.shadow_length / 5, 10)
      shadowRef.current.position.x = Math.sin(angleRad) * length
      shadowRef.current.position.z = Math.cos(angleRad) * length
    }
  })

  const gnomonAngle = dimensions?.gnomon_angle || 28
  const height = dimensions?.height / 5 || 4
  const baseWidth = dimensions?.base_width / 5 || 3

  return (
    <>
      <OrbitControls enablePan enableZoom enableRotate />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />

      <mesh position={[0, height / 2, 0]} rotation={[0, 0, THREE.MathUtils.degToRad(90 - gnomonAngle)]}>
        <boxGeometry args={[0.2, height, 0.8]} />
        <meshStandardMaterial color="#CD7F32" metalness={0.6} roughness={0.4} />
      </mesh>

      <mesh position={[baseWidth / 2, 0.1, 0]}>
        <cylinderGeometry args={[3, 3, 0.2, 32, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#E6D5B8" />
      </mesh>

      <mesh position={[-baseWidth / 2, 0.1, 0]} rotation={[0, Math.PI, 0]}>
        <cylinderGeometry args={[3, 3, 0.2, 32, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#E6D5B8" />
      </mesh>

      {shadowData && shadowData.solar_altitude > 0 && (
        <mesh ref={shadowRef} position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.3, Math.min(shadowData.shadow_length / 5, 10)]} />
          <meshBasicMaterial color="#1A1F3A" opacity={0.6} transparent />
        </mesh>
      )}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>

      <gridHelper args={[20, 20, '#D4AF37', '#4A5568']} position={[0, 0.01, 0]} />
    </>
  )
}

export default SamratYantra3D
