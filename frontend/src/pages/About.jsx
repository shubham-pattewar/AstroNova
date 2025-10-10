import { useState, useEffect } from 'react'
import AstronomicalCalendar from '../components/AstronomicalCalendar'
import { getInstruments } from '../utils/api'

function About() {
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
      <h1 className="text-4xl font-bold text-heritage-gold mb-8 text-center">
        About the Instruments
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-8">
          {loading ? (
            <p className="text-center text-celestial-starlight">Loading...</p>
          ) : (
            Object.entries(instruments).map(([key, instrument]) => (
              <div key={key} className="card-heritage">
                <h2 className="text-2xl font-bold text-heritage-gold mb-4">{instrument.name}</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-heritage-bronze mb-2">Description</h3>
                    <p className="text-celestial-starlight leading-relaxed">{instrument.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-heritage-bronze mb-2">Historical Significance</h3>
                    <p className="text-celestial-starlight leading-relaxed">{instrument.history}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-heritage-bronze mb-2">Purpose & Function</h3>
                    <p className="text-celestial-starlight leading-relaxed">{instrument.purpose}</p>
                  </div>

                  <div>
                    <span className="inline-block bg-heritage-gold text-celestial-navy px-4 py-1 rounded-full text-sm font-semibold">
                      {instrument.type.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

          <div className="card-heritage">
            <h2 className="text-2xl font-bold text-heritage-gold mb-4">Maharaja Jai Singh II</h2>
            <p className="text-celestial-starlight leading-relaxed mb-4">
              Maharaja Sawai Jai Singh II (1688-1743) was a Rajput king of Amber (later Jaipur) and a passionate 
              astronomer and mathematician. He built five astronomical observatories called Jantar Mantar across India, 
              in Delhi, Jaipur, Ujjain, Mathura, and Varanasi.
            </p>
            <p className="text-celestial-starlight leading-relaxed mb-4">
              Dissatisfied with the accuracy of existing astronomical instruments, he designed and constructed massive 
              masonry instruments that could measure celestial positions with unprecedented precision. His work combined 
              traditional Indian astronomy with Islamic and European astronomical knowledge.
            </p>
            <p className="text-celestial-starlight leading-relaxed">
              The Jantar Mantar in Jaipur, built between 1727-1734, is the largest and best-preserved observatory, 
              featuring 19 architectural astronomical instruments. It was declared a UNESCO World Heritage Site in 2010.
            </p>
          </div>
        </div>

        <div>
          <AstronomicalCalendar />
        </div>
      </div>

      <div className="card-heritage">
        <h2 className="text-2xl font-bold text-heritage-gold mb-4">How to Use This Simulator</h2>
        <div className="space-y-4 text-celestial-starlight">
          <div>
            <h3 className="text-lg font-semibold text-heritage-bronze mb-2">1. Explore 3D Models</h3>
            <p>Navigate to the Simulation page to view interactive 3D models of each instrument. Use your mouse to rotate, zoom, and pan around the models.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-heritage-bronze mb-2">2. Set Your Location</h3>
            <p>Enter latitude and longitude coordinates (preferably within India) to see how the instruments would be calibrated for that specific location.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-heritage-bronze mb-2">3. Control Time</h3>
            <p>Adjust the time of day and day of year to see how shadows and celestial tracking change. Watch real-time animations of the sun's movement.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-heritage-bronze mb-2">4. Learn Astronomy</h3>
            <p>Observe how ancient astronomers used these instruments to measure time, track celestial bodies, and understand the cosmos without modern technology.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
