function InstrumentCard({ instrument, onSelect }) {
  return (
    <div className="card-heritage transform transition-transform hover:scale-105 cursor-pointer" onClick={onSelect}>
      <h3 className="text-2xl font-bold text-heritage-gold mb-3">{instrument.name}</h3>
      <p className="text-celestial-starlight mb-4">{instrument.description}</p>
      <div className="mt-4">
        <span className="inline-block bg-heritage-bronze text-white px-3 py-1 rounded-full text-sm">
          {instrument.type.replace('_', ' ').toUpperCase()}
        </span>
      </div>
    </div>
  )
}

export default InstrumentCard
