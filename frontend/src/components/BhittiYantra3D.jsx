import { useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function BhittiYantra3D({ dimensions, trackingData }) {
  const height = dimensions?.height / 3 || 5
  const width = dimensions?.width / 3 || 3

  return (
    <>
      <OrbitControls enablePan enableZoom enableRotate />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />

      <mesh position={[0, height / 2, -1]}>
        <boxGeometry args={[width, height, 0.3]} />
        <meshStandardMaterial color="#B87333" metalness={0.5} roughness={0.5} />
      </mesh>

      <mesh position={[0, height / 2, -0.8]} rotation={[0, 0, 0]}>
        <torusGeometry args={[2, 0.1, 16, 100, Math.PI / 2]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.7} roughness={0.3} />
      </mesh>

      <mesh position={[0, height / 2, -0.8]} rotation={[0, 0, -Math.PI / 2]}>
        <torusGeometry args={[2, 0.1, 16, 100, Math.PI / 2]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.7} roughness={0.3} />
      </mesh>

      {trackingData?.celestial_path && trackingData.celestial_path.map((point, idx) => {
        const alt = THREE.MathUtils.degToRad(point.altitude)
        const az = THREE.MathUtils.degToRad(point.azimuth - 180)
        const x = 2 * Math.cos(alt) * Math.sin(az)
        const y = height / 2 + 2 * Math.sin(alt)
        const z = -0.7 + 2 * Math.cos(alt) * Math.cos(az)
        
        return (
          <mesh key={idx} position={[x, y, z]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#E8F4F8" emissive="#E8F4F8" emissiveIntensity={0.5} />
          </mesh>
        )
      })}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>

      <gridHelper args={[15, 15, '#D4AF37', '#4A5568']} position={[0, 0.01, 0]} />
    </>
  )
}

export default BhittiYantra3D
