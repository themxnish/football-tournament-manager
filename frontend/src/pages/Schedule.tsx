import { useEffect, useState } from "react";
import MatchCard from "../components/MatchCard";

interface Team {
  name: string;
  coach: string;
}

interface Match {
  date: string;
  time: string;
  teamA: Team;
  teamB: Team;
  category: string;
  pitch: number;
  status: boolean;
}

export default function Schedule() {
    const [matches, setMatches] = useState<Match[]>([]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/schedule/allMatches`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if(!response.ok) {
                    console.error("Failed to fetch matches");
                    return;
                }

                const data = await response.json();
                setMatches(data || []);
            } catch (error) {
                console.error("Error fetching matches:", error);
            }
        }
        fetchMatches();
    }, []);
    return (
        <div className='flex flex-col sm:items-center'>
            <div className='sm:w-full lg:w-3/4 xl:w-1/2 mt-4'>
                <h2 className='text-2xl font-bold mb-4 text-center'>Match Schedule</h2>
                {matches.map((m, i) => (
                    <MatchCard key={i} match={m} />
                ))}
            </div>
        </div>
    );
}