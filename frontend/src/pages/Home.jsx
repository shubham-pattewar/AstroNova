import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import InstrumentCard from '../components/InstrumentCard'
import { getInstruments } from '../utils/api'

function Home() {
  const [instruments, setInstruments] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInstruments()
  }, [])

  const fetchInstruments = async () => {
    try {
      const data = await getInstruments()
      setInstruments(data)
    } catch (error) {
      console.error('Error fetching instruments:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold heritage-gradient bg-clip-text text-transparent mb-4">
          Heritage Astronomy Instruments
        </h1>
        <p className="text-xl text-heritage-sandstone max-w-3xl mx-auto">
          Explore the astronomical instruments of ancient India through interactive 3D simulations.
          Experience the precision and ingenuity of Maharaja Jai Singh II's astronomical observatories.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-heritage-gold mb-8 text-center">Featured Instruments</h2>
        {loading ? (
          <p className="text-center text-celestial-starlight">Loading instruments...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(instruments).map(([key, instrument]) => (
              <InstrumentCard
                key={key}
                instrument={instrument}
                onSelect={() => {}}
              />
            ))}
          </div>
        )}
      </div>

      <div className="text-center">
        <Link to="/simulation" className="btn-primary inline-block text-lg px-8 py-3">
          Launch Simulation
        </Link>
      </div>

      <div className="mt-16 card-heritage max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-heritage-gold mb-4">About Jantar Mantar</h3>
        <p className="text-celestial-starlight leading-relaxed mb-4">
          The Jantar Mantar observatories were built by Maharaja Jai Singh II of Jaipur in the early 18th century.
          These architectural astronomical instruments represent the zenith of observational astronomy in India,
          combining mathematical precision with monumental architecture.
        </p>
        <p className="text-celestial-starlight leading-relaxed">
          Each instrument was designed for specific astronomical calculations - from measuring time and celestial
          positions to tracking the movement of celestial bodies across the sky. Today, they stand as UNESCO World
          Heritage sites, testament to India's rich scientific heritage.
        </p>
      </div>
    </div>
  )
}

export default Home
