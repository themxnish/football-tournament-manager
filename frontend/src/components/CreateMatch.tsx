import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Team {
  id: string;
  name: string;
}

export const CreateMatch = () => {
  const [match, setMatch] = useState({
    date: "",
    time: "",
    pitch: "",
    category: "",
    teamA: "",
    teamB: ""
  });
  const categories = ["mixed gender", "boys", "girls"];
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/team/teams`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setTeams(data.teams || []);
        } else {
          const { message } = await response.json();
          toast.error(message || "Failed to fetch teams");
        }
      } catch {
        toast.error("Error fetching teams");
      }
    };

    fetchTeams();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
       const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/schedule/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          date: match.date,
          time: match.time,
          pitch: match.pitch,
          category: match.category,
          status: false,
          teamAId: match.teamA,
          teamBId: match.teamB
        }),
      });

      if (response.ok) {
        toast.success("Match created successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        const { message } = await response.json();
        toast.error(message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-5 max-w-xl mx-auto'>
      <div className='flex flex-col sm:flex-row gap-5'>
        <div className='flex-1'>
          <label className='block text-black text-sm font-semibold'>Date</label>
          <input type="date" name="date" value={match.date} onChange={e => setMatch({...match, date: e.target.value})} className='w-full px-4 py-2 text-sm rounded-lg bg-[#4a6e4d] border border-[#4a6e4d] focus:outline-none focus:ring-2 focus:ring-[#4a6e4d]' />
        </div>
        <div className='flex-1'>
          <label className='block text-black text-sm font-semibold'>Time</label>
          <input type="time" name="time" value={match.time} onChange={e => setMatch({...match, time: e.target.value})} className='w-full px-4 py-2 text-sm rounded-lg bg-[#4a6e4d] border border-[#4a6e4d] focus:outline-none focus:ring-2 focus:ring-[#4a6e4d]' />
        </div>
      </div>
      <div>
        <label className='text-black text-sm font-semibold'>Pitch</label>
        <input type="number" name="pitch" min={1} max={5} value={match.pitch} onChange={e => setMatch({...match, pitch: e.target.value})} className='w-full px-4 py-2 text-sm rounded-lg bg-[#4a6e4d] border border-[#4a6e4d] focus:outline-none focus:ring-2 focus:ring-[#4a6e4d]' />
      </div>
      <div>
        <label className='text-black text-sm font-semibold'>Category</label>
        <select name="category" onChange={e => setMatch({...match, category: e.target.value})} value={match.category} className='w-full px-4 py-2 text-sm rounded-lg bg-[#4a6e4d] border border-[#4a6e4d] focus:outline-none focus:ring-2 focus:ring-[#4a6e4d]' >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option value={cat} key={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className='flex flex-col sm:flex-row gap-5'>
        <div className='flex-1'>
          <label className='text-black text-sm font-semibold'>Team A</label>
          <select name="teamA" onChange={e => setMatch({...match, teamA: e.target.value})} value={match.teamA} className='w-full px-4 py-2 text-sm rounded-lg bg-[#4a6e4d] border border-[#4a6e4d] focus:outline-none focus:ring-2 focus:ring-[#4a6e4d]' >
            <option value="">Select Team A</option>
            {teams.map(team => (
              <option value={team.id} key={team.id}>{team.name}</option>
            ))}
          </select>
        </div>
        <div className='flex-1'>
          <label className='text-black text-sm font-semibold'>Team B</label>
          <select name="teamB" onChange={e => setMatch({...match, teamB: e.target.value})} value={match.teamB} className='w-full px-4 py-2 text-sm rounded-lg bg-[#4a6e4d] border border-[#4a6e4d] focus:outline-none focus:ring-2 focus:ring-[#4a6e4d]' >
            <option value="">Select Team B</option>
            {teams.map(team => (
              <option value={team.id} key={team.id}>{team.name}</option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit" className='bg-gray-300 shadow-xl text-black font-semibold px-4 py-2 rounded-lg mt-2'>Create Match</button>
    </form>
  );
};
