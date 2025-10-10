import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function NadiValayaYantra3D({ dimensions }) {
  const radius = dimensions?.radius || 2
  const tiltAngle = dimensions?.tilt_angle || 28

  return (
    <>
      <OrbitControls enablePan enableZoom enableRotate />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />

      <group rotation={[THREE.MathUtils.degToRad(90 - tiltAngle), 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[radius, 0.15, 16, 64]} />
          <meshStandardMaterial color="#CD7F32" metalness={0.6} roughness={0.4} />
        </mesh>

        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, radius * 2, 16]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.7} roughness={0.3} />
        </mesh>

        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, radius * 2, 16]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.7} roughness={0.3} />
        </mesh>

        {[...Array(12)].map((_, i) => {
          const angle = (i * Math.PI) / 6
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}
              rotation={[0, 0, angle]}
            >
              <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
              <meshStandardMaterial color="#E8F4F8" />
            </mesh>
          )
        })}
      </group>

      <group rotation={[THREE.MathUtils.degToRad(90 - tiltAngle), Math.PI, 0]} position={[0, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[radius, 0.15, 16, 64]} />
          <meshStandardMaterial color="#B87333" metalness={0.6} roughness={0.4} />
        </mesh>
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>

      <gridHelper args={[12, 12, '#D4AF37', '#4A5568']} position={[0, -1.99, 0]} />
    </>
  )
}

export default NadiValayaYantra3D
