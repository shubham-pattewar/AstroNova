import axios from 'axios'

const getApiUrl = () => {
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:8000'
  }
  
  const protocol = window.location.protocol
  const hostname = window.location.hostname
  return `${protocol}//${hostname}:8000`
}

const API_BASE_URL = getApiUrl()

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getInstruments = async () => {
  const response = await api.get('/api/instruments')
  return response.data
}

export const calculateDimensions = async (latitude, longitude) => {
  const response = await api.post('/api/dimensions', { latitude, longitude })
  return response.data
}

export const calculateShadow = async (latitude, hour, minute, dayOfYear) => {
  const response = await api.post('/api/shadow', {
    latitude,
    hour,
    minute,
    day_of_year: dayOfYear,
  })
  return response.data
}

export const getCelestialTracking = async (latitude, hour, dayOfYear) => {
  const response = await api.post('/api/celestial-tracking', {
    latitude,
    hour,
    day_of_year: dayOfYear,
  })
  return response.data
}

export const getAstronomicalCalendar = async (year) => {
  const response = await api.get('/api/astronomical-calendar', {
    params: { year },
  })
  return response.data
}

export default api
