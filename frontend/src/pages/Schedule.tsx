import MatchCard from "../components/MatchCard";

const matches = [
    {
        date: "12 Aug, 2025",
        time: "7:00 PM",
        teamA: { name: "ADH Mavericks A", coach: "Coach A" },
        teamB: { name: "ADH Mavericks B", coach: "Coach B" },
        category: "mixed gender",
        pitch: 1,
        status: true,
    },
    {
        date: "13 Aug, 2025",
        time: "8:00 PM",
        teamA: { name: "Team C", coach: "Coach C" },
        teamB: { name: "Team D", coach: "Coach D" },
        category: "boys",
        pitch: 2,
        status: false,
    }
];
    
export default function Schedule() {
    return (
        <div className='flex flex-col sm:items-center'>
            <div className='sm:w-1/2'>
                <h2 className='text-2xl font-bold mb-4 text-center'>Match Schedule</h2>
                {matches.map((m, i) => (
                    <MatchCard key={i} match={m} />
                ))}
            </div>
        </div>
    );
}