import { useState, useEffect } from 'react'
import { getAstronomicalCalendar } from '../utils/api'

function AstronomicalCalendar() {
  const [events, setEvents] = useState([])
  const [year, setYear] = useState(new Date().getFullYear())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [year])

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const data = await getAstronomicalCalendar(year)
      setEvents(data.events)
    } catch (error) {
      console.error('Error fetching calendar:', error)
    } finally {
      setLoading(false)
    }
  }

  const getEventIcon = (type) => {
    switch(type) {
      case 'solstice': return '☀️'
      case 'equinox': return '⚖️'
      case 'eclipse': return '🌑'
      default: return '✨'
    }
  }

  return (
    <div className="card-heritage">
      <h3 className="text-2xl font-bold text-heritage-gold mb-4">Astronomical Calendar</h3>
      
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => setYear(year - 1)}
          className="px-3 py-1 bg-celestial-navy border border-heritage-bronze rounded-lg"
        >
          ← {year - 1}
        </button>
        <span className="text-xl font-bold text-heritage-gold">{year}</span>
        <button
          onClick={() => setYear(year + 1)}
          className="px-3 py-1 bg-celestial-navy border border-heritage-bronze rounded-lg"
        >
          {year + 1} →
        </button>
      </div>

      {loading ? (
        <p className="text-center text-celestial-starlight">Loading events...</p>
      ) : (
        <div className="space-y-3">
          {events.map((event, idx) => (
            <div key={idx} className="bg-celestial-navy border border-heritage-bronze rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{getEventIcon(event.type)}</span>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-heritage-gold">{event.name}</h4>
                  <p className="text-sm text-celestial-starlight">{event.date}</p>
                  <p className="text-sm text-heritage-sandstone mt-1">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AstronomicalCalendar
