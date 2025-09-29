import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Team = {
  name: string;
};

type Match = {
  teamA: Team;
  teamB: Team;
  date: string;
  time: string;
};

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
    <div>
      <div>
        <h4>{match.teamA.name} vs {match.teamB.name}</h4>
        <p>{match.date}, {match.time}</p>
      </div>
    </div>
  )
}