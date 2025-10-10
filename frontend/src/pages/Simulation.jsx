import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import LocationInput from '../components/LocationInput'
import TimeControl from '../components/TimeControl'
import SamratYantra3D from '../components/SamratYantra3D'
import BhittiYantra3D from '../components/BhittiYantra3D'
import NadiValayaYantra3D from '../components/NadiValayaYantra3D'
import { calculateDimensions, calculateShadow, getCelestialTracking } from '../utils/api'

function Simulation() {
  const [selectedInstrument, setSelectedInstrument] = useState('samrat')
  const [latitude, setLatitude] = useState(28.6139)
  const [longitude, setLongitude] = useState(77.2090)
  const [hour, setHour] = useState(12)
  const [minute, setMinute] = useState(0)
  const [dayOfYear, setDayOfYear] = useState(80)
  const [dimensions, setDimensions] = useState(null)
  const [shadowData, setShadowData] = useState(null)
  const [trackingData, setTrackingData] = useState(null)

  useEffect(() => {
    fetchDimensions()
  }, [latitude, longitude])

  useEffect(() => {
    fetchSimulationData()
  }, [latitude, hour, minute, dayOfYear])

  const fetchDimensions = async () => {
    try {
      const data = await calculateDimensions(latitude, longitude)
      setDimensions(data)
    } catch (error) {
      console.error('Error fetching dimensions:', error)
    }
  }

  const fetchSimulationData = async () => {
    try {
      const shadow = await calculateShadow(latitude, hour, minute, dayOfYear)
      setShadowData(shadow)
      
      const tracking = await getCelestialTracking(latitude, hour, dayOfYear)
      setTrackingData(tracking)
    } catch (error) {
      console.error('Error fetching simulation data:', error)
    }
  }

  const handleLocationChange = (lat, lon) => {
    setLatitude(lat)
    setLongitude(lon)
  }

  const handleTimeChange = (h, m, d) => {
    setHour(h)
    setMinute(m)
    setDayOfYear(d)
  }

  const instruments = [
    { id: 'samrat', name: 'Samrat Yantra', desc: 'Supreme Sundial' },
    { id: 'bhitti', name: 'Bhitti Yantra', desc: 'Wall Instrument' },
    { id: 'nadi', name: 'Nadi Valaya Yantra', desc: 'Equinoctial Sundial' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-heritage-gold mb-8 text-center">
        Interactive Simulation
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {instruments.map((inst) => (
          <button
            key={inst.id}
            onClick={() => setSelectedInstrument(inst.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedInstrument === inst.id
                ? 'bg-heritage-gold text-celestial-navy border-heritage-gold'
                : 'bg-celestial-deepblue text-heritage-gold border-heritage-bronze hover:border-heritage-gold'
            }`}
          >
            <h3 className="font-bold text-lg">{inst.name}</h3>
            <p className="text-sm opacity-80">{inst.desc}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card-heritage h-[600px]">
            <Canvas camera={{ position: [8, 8, 8], fov: 50 }}>
              {selectedInstrument === 'samrat' && (
                <SamratYantra3D 
                  dimensions={dimensions?.samrat_yantra} 
                  shadowData={shadowData}
                />
              )}
              {selectedInstrument === 'bhitti' && (
                <BhittiYantra3D 
                  dimensions={dimensions?.bhitti_yantra}
                  trackingData={trackingData}
                />
              )}
              {selectedInstrument === 'nadi' && (
                <NadiValayaYantra3D 
                  dimensions={dimensions?.nadi_valaya_yantra}
                />
              )}
            </Canvas>
          </div>
        </div>

        <div className="space-y-6">
          <LocationInput onLocationChange={handleLocationChange} />
          <TimeControl onTimeChange={handleTimeChange} />
          
          {shadowData && selectedInstrument === 'samrat' && (
            <div className="card-heritage">
              <h3 className="text-xl font-bold text-heritage-gold mb-3">Solar Data</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-heritage-sandstone">Time:</span>
                  <span className="text-celestial-starlight font-mono">{shadowData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-heritage-sandstone">Solar Altitude:</span>
                  <span className="text-celestial-starlight font-mono">{shadowData.solar_altitude}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-heritage-sandstone">Solar Azimuth:</span>
                  <span className="text-celestial-starlight font-mono">{shadowData.solar_azimuth}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-heritage-sandstone">Shadow Length:</span>
                  <span className="text-celestial-starlight font-mono">{shadowData.shadow_length.toFixed(2)} m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-heritage-sandstone">Declination:</span>
                  <span className="text-celestial-starlight font-mono">{shadowData.solar_declination}°</span>
                </div>
              </div>
            </div>
          )}

          {trackingData && (selectedInstrument === 'bhitti' || selectedInstrument === 'nadi') && (
            <div className="card-heritage">
              <h3 className="text-xl font-bold text-heritage-gold mb-3">Celestial Tracking</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-heritage-sandstone">Current Altitude:</span>
                  <span className="text-celestial-starlight font-mono">{trackingData.altitude}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-heritage-sandstone">Current Azimuth:</span>
                  <span className="text-celestial-starlight font-mono">{trackingData.azimuth}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-heritage-sandstone">Declination:</span>
                  <span className="text-celestial-starlight font-mono">{trackingData.declination}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-heritage-sandstone">Path Points:</span>
                  <span className="text-celestial-starlight font-mono">{trackingData.celestial_path?.length || 0}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Simulation
