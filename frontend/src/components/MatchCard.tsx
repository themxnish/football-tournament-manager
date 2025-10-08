type Team = {
    coach: string;
    name: string;
};

type Match = {
    id?: string;
    date: string;
    time: string;
    teamA: Team;
    teamB: Team;
    pitch: string | number;
    category: string;
    status: boolean;
};
const dateFormat = (date: string) => new Date(date).toLocaleDateString('en-GB');

interface MatchCardProps {
    match: Match;
}

import { Delete } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function MatchCard({ match }: MatchCardProps) {
    const [ admin, setAdmin ] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
          try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/session`, {
                credentials: "include"
            });
            if (!response.ok) {
              setAdmin(false);
              setLoggedIn(false);
              return;
            }
    
            const data = await response.json();
            if (data.user) {
                setLoggedIn(true);
                if (data.user.role === "admin") {
                    setAdmin(true);
                }
            } else {
                setLoggedIn(false);
                setAdmin(false);
            }

          } catch (error) {
              console.log(error);
              setAdmin(false);
              setLoggedIn(false);
          }
        }
      checkAuth();
      }, []);

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete the match?`)) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/schedule/${match.id}`, {
                method: "DELETE",
                headers: {
                "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ id: match.id }),
            });
            
            if (response.ok) {
                toast.success("Match deleted");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                const { message } = await response.json();
                toast.error(message);
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'An error occurred');
        }
      
    }

    const handlePlay = async () => {
        if (!loggedIn) {
            toast.error("You must log in before starting a match");
            return;
        }
        if (!confirm(`Are you sure you want to play this match?`)) return;
        if (match.id) {
            window.location.href = `/play/${match.id}`;
        }
    }

    return (
        <div className='flex flex-col sm:flex-row items-center bg-[#6c9968] rounded-xl px-4 py-2 mb-2 sm:gap-2'>
            <div className='w-full sm:w-28 flex flex-col items-center sm:items-start text-xs text-gray-800 mb-2 sm:mb-0'>
                <span>{dateFormat(match.date)}</span>
                <span className='font-semibold'>{match.time}</span>
            </div>
            <div className='flex-1 flex flex-row items-center justify-center gap-4'>
                <div className='flex items-center gap-2'>
                    <div className='flex flex-col items-start'>
                        <p className='font-bold text-sm text-black'>{match.teamA.name}</p>
                        <p className='text-xs text-gray-800'>{match.teamA.coach}</p>
                    </div>
                </div>
                <span className='text-gray-800 flex font-semibold mx-3'>vs</span>
                <div className='flex items-center gap-2'>
                    <div className='flex flex-col items-start'>
                        <p className='font-bold text-sm text-black'>{match.teamB.name}</p>
                        <p className='text-xs text-gray-800'>{match.teamB.coach}</p>
                    </div>
                </div>
            </div>
            <div className='w-full sm:w-28 flex flex-col items-center sm:items-start text-xs text-gray-800 mb-2 sm:mb-0'>
                <p className='sm:mr-2'>Pitch no. {match.pitch}</p>
            </div>
            <div className='flex flex-col items-center sm:items-end mt-2 sm:mt-0 w-full sm:w-auto gap-1'>
                <span className='text-xs font-semibold text-black mb-1'>{match.category}</span>
                <span className={`rounded px-2 py-1 text-xs font-semibold ${match.status ? 'bg-green-100 text-green-900' : 'bg-red-200 text-red-700'}`}>
                {match.status ? "Completed" : "Not Started"}
                </span>
            </div>
            
            <div className='w-full sm:w-auto flex items-center justify-end'>
                {admin ? (
                    <button
                        onClick={() => match.id && handleDelete()}
                        className='text-red-600 hover:text-red-800 text-sm font-semibold'
                        title="Delete"
                        >
                        <Delete size={22} />
                    </button>
                ): (
                   <>
                    {!match.status ? (
                        <button onClick={() => match.id && handlePlay()} className='bg-white text-black text-sm font-semibold px-3 py-1 rounded-lg mt-2 hover:cursor-pointer'>Play Match</button>
                    ) :(
                         <button onClick={() => { if (match.id) window.location.href = `/view/${match.id}`; }} className='bg-white text-black text-sm font-semibold px-3 py-1 rounded-lg mt-2 hover:cursor-pointer'>View Match</button>
                    )}
                   </>    
                )}
            </div>
        </div>
    )
}