type Team = {
    coach: string;
    name: string;
};

type Match = {
    date: string;
    time: string;
    teamA: Team;
    teamB: Team;
    pitch: string | number;
    category: string;
    status: boolean;
};
const dateFormat = (date: string) => new Date(date).toDateString();

interface MatchCardProps {
    match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
    return (
        <div className='flex flex-col sm:flex-row items-center bg-[#6c9968] rounded-xl px-4 py-2 mb-2'>
            <div className='text-xs text-gray-800 w-full sm:w-32 text-center sm:text-left mb-2 sm:mb-0'>
                {dateFormat(match.date)}<br />{match.time}
            </div>
            <div className='flex-1 flex flex-row items-center justify-center gap-3'>
                <div className='flex items-center gap-2'>
                    <div className='flex flex-col items-start'>
                        <p className='font-bold text-sm text-black'>{match.teamA.name}</p>
                        <p className='text-xs text-gray-800'>{match.teamA.coach}</p>
                    </div>
                </div>
                <span className='text-gray-800 flex font-semibold mx-2'>vs</span>
                <div className='flex items-center gap-2'>
                    <div className='flex flex-col items-start'>
                        <p className='font-bold text-sm text-black'>{match.teamB.name}</p>
                        <p className='text-xs text-gray-800'>{match.teamB.coach}</p>
                    </div>
                </div>
            </div>
            <div className='text-xs text-gray-800 w-full sm:w-24 text-center sm:text-left'>
                <p className='sm:mr-2'>Pitch no. {match.pitch}</p>
            </div>
            <div className='flex flex-col items-center sm:items-end mt-2 sm:mt-0 w-full sm:w-auto'>
                <span className='text-xs font-semibold text-black mb-1'>{match.category}</span>
                <span className={`rounded px-2 py-1 text-xs font-semibold ${match.status ? 'bg-green-100 text-green-900' : 'bg-red-200 text-red-700'}`}>
                {match.status ? "Completed" : "Not Started"}
                </span>
            </div>
            <div className='sm:ml-4 w-24'>
                <button className='bg-white text-black text-sm font-semibold px-3 py-1 rounded-lg mt-2'>Play Match</button>
            </div>
        </div>
    )
}