const teams = [
  {
    name: "ADH Mavericks A",
    category: "Mixed Gender",
    coach: "Coach A",
  },
  {
    name: "Team D",
    category: "Boys",
    coach: "Coach Darshan",
  },
  {
    name: "FC Barcelona",
    category: "Girls",
    coach: "Drogba Baba",
  }
];

export default function Teams() {
  return (
    <div className='flex flex-col sm:items-center'>
    <div className='sm:w-1/2 mt-4'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Teams</h2>
      {teams.map((team, i) => (
        <div key={i} className='flex flex-row items-center bg-[#6c9968] bg-opacity-90 gap-4 rounded-xl shadow px-4 py-3 mb-2'>
          <div className='flex-1'>
            <p className='font-bold text-sm text-black'>{team.name}</p>
          </div>
          <div className='flex flex-col sm:flex-row'>
            <span className='text-xs font-medium text-gray-800 px-3 py-1 rounded-xl bg-white'>{team.category}</span>
            <span className='text-xs text-gray-100 bg-[#4a6e4d] px-3 py-1 rounded-xl ml-2 ml-0 sm:ml-2 mt-1 sm:mt-0'>Coach: <span className='font-semibold'>{team.coach}</span></span>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}
