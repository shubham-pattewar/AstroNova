import { useState, useEffect } from 'react'

function TimeControl({ onTimeChange }) {
  const [hour, setHour] = useState(12)
  const [minute, setMinute] = useState(0)
  const [dayOfYear, setDayOfYear] = useState(80)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    onTimeChange(hour, minute, dayOfYear)
  }, [hour, minute, dayOfYear])

  useEffect(() => {
    let interval
    if (isAnimating) {
      interval = setInterval(() => {
        setHour((prev) => (prev + 1) % 24)
      }, 500)
    }
    return () => clearInterval(interval)
  }, [isAnimating])

  const months = [
    { name: 'January', days: 31, startDay: 0 },
    { name: 'February', days: 28, startDay: 31 },
    { name: 'March', days: 31, startDay: 59 },
    { name: 'April', days: 30, startDay: 90 },
    { name: 'May', days: 31, startDay: 120 },
    { name: 'June', days: 30, startDay: 151 },
    { name: 'July', days: 31, startDay: 181 },
    { name: 'August', days: 31, startDay: 212 },
    { name: 'September', days: 30, startDay: 243 },
    { name: 'October', days: 31, startDay: 273 },
    { name: 'November', days: 30, startDay: 304 },
    { name: 'December', days: 31, startDay: 334 },
  ]

  return (
    <div className="card-heritage">
      <h3 className="text-xl font-bold text-heritage-gold mb-4">Time Controls</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Time: {String(hour).padStart(2, '0')}:{String(minute).padStart(2, '0')}</label>
          <input
            type="range"
            min="0"
            max="23"
            value={hour}
            onChange={(e) => setHour(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-celestial-starlight mt-1">
            <span>00:00</span>
            <span>12:00</span>
            <span>23:00</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Day of Year: {dayOfYear}</label>
          <input
            type="range"
            min="1"
            max="365"
            value={dayOfYear}
            onChange={(e) => setDayOfYear(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-celestial-starlight mt-1">
            <span>Jan 1</span>
            <span>Jul 1</span>
            <span>Dec 31</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
              isAnimating 
                ? 'bg-heritage-terracotta text-white' 
                : 'bg-heritage-gold text-celestial-navy'
            }`}
          >
            {isAnimating ? 'Pause' : 'Animate'}
          </button>
          <button
            onClick={() => {
              const now = new Date()
              setHour(now.getHours())
              setMinute(now.getMinutes())
              const start = new Date(now.getFullYear(), 0, 0)
              const diff = now - start
              const oneDay = 1000 * 60 * 60 * 24
              setDayOfYear(Math.floor(diff / oneDay))
            }}
            className="flex-1 btn-secondary"
          >
            Current Time
          </button>
        </div>
      </div>
    </div>
  )
}

export default TimeControl
