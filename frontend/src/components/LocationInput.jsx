import { useState } from 'react'

function LocationInput({ onLocationChange }) {
  const [latitude, setLatitude] = useState(28.6139)
  const [longitude, setLongitude] = useState(77.2090)

  const handleSubmit = (e) => {
    e.preventDefault()
    onLocationChange(parseFloat(latitude), parseFloat(longitude))
  }

  const presetLocations = [
    { name: 'Delhi - Jantar Mantar', lat: 28.6139, lon: 77.2090 },
    { name: 'Jaipur - Jantar Mantar', lat: 26.9246, lon: 75.8243 },
    { name: 'Ujjain - Jantar Mantar', lat: 23.1765, lon: 75.7885 },
    { name: 'Varanasi - Jantar Mantar', lat: 25.3176, lon: 82.9739 },
  ]

  return (
    <div className="card-heritage">
      <h3 className="text-xl font-bold text-heritage-gold mb-4">Location Settings</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Preset Locations</label>
        <select
          onChange={(e) => {
            const selected = presetLocations[e.target.value]
            if (selected) {
              setLatitude(selected.lat)
              setLongitude(selected.lon)
              onLocationChange(selected.lat, selected.lon)
            }
          }}
          className="w-full px-3 py-2 bg-celestial-navy border border-heritage-bronze rounded-lg text-celestial-starlight"
        >
          <option value="">Select a location</option>
          {presetLocations.map((loc, idx) => (
            <option key={idx} value={idx}>{loc.name}</option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Latitude</label>
          <input
            type="number"
            step="0.0001"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="w-full px-3 py-2 bg-celestial-navy border border-heritage-bronze rounded-lg text-celestial-starlight"
            placeholder="e.g., 28.6139"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Longitude</label>
          <input
            type="number"
            step="0.0001"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="w-full px-3 py-2 bg-celestial-navy border border-heritage-bronze rounded-lg text-celestial-starlight"
            placeholder="e.g., 77.2090"
          />
        </div>
        <button type="submit" className="btn-primary w-full">
          Update Location
        </button>
      </form>
    </div>
  )
}

export default LocationInput
