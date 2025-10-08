import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import MatchPlay from "../components/PlayMatch";

type Team = {
  id: string;
  name: string;
  coach: string;
};

type Match = {
  id: string;
  teamA: Team;
  teamB: Team;
  date: string;
  time: string;
  pitch: string | number;
  category: string;
};
const dateFormat = (date: string) => new Date(date).toDateString();

export default function Play() {
  const { id } = useParams();
  const [match, setMatch] = useState<Match | null>(null);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/schedule/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setMatch(data);
        } else {
          const { message } = await response.json();
          toast.error(message);
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'An error occurred');
      }
    };
    fetchMatch();
  }, [id]);

  if (!match) {
    return <div>No match found</div>;
  }

  return (
    <div className='sm:mx-auto my-10 bg-[#6c9968] rounded-xl shadow-lg p-6 max-w-4xl'>
      <div className='flex flex-col items-center'>
        <h1 className='text-2xl font-bold mb-2'>Play Match</h1>
        <p className='text-sm text-gray-800'>{dateFormat(match.date)}, {match.time}</p>

        <div className='flex gap-3 py-2'>
          <span className='bg-green-200 px-3 py-1 rounded'>{match.category}</span>
          <span className='bg-green-700 px-3 py-1 rounded'>Pitch {match.pitch}</span>
        </div>

        <MatchPlay match={match} />
      </div>
    </div>
  )
}