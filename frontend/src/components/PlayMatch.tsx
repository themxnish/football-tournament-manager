import { useState } from "react";
import { toast } from "sonner";

type Team = { id: string; name: string, coach: string };
type Match = {
  id: string;
  teamA: Team;
  teamB: Team;
  date: string;
  time: string;
  pitch: string | number;
  category: string;
};

export default function MatchPlay({ match }: { match: Match }) {

  const [ scoreA, setScoreA ] = useState(0);
  const [ scoreB, setScoreB ] = useState(0);
  const [ scorerA, setScorerA ] = useState<string[]>([]);
  const [ scorerB, setScorerB ] = useState<string[]>([]);
  const [ scorerNameA, setScorerNameA ] = useState("");
  const [ scorerNameB, setScorerNameB ] = useState("");
  const [ potmA, setPotmA ] = useState("");
  const [ potmB, setPotmB ] = useState("");

  const [ ended, setEnded ] = useState(false);

  function addScorerA() {
    if (scorerNameA.trim()) {
      setScoreA(scoreA + 1);
      setScorerA([...scorerA, scorerNameA.trim()]);
      setScorerNameA("");
    }
  }
  
  function addScorerB() {
    if (scorerNameB.trim()) {
      setScoreB(scoreB + 1);
      setScorerB([...scorerB, scorerNameB.trim()]);
      setScorerNameB("");
    }
  }

  function winner() {
    if (scoreA > scoreB) return match.teamA.id;
    if (scoreB > scoreA) return match.teamB.id;
    if (scoreA === scoreB) return "Draw";
    return null;
  }

  const submit = async () => {
    if (!ended) return alert("End the match before submitting. Please verify all details are correct.");
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/play/record`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          scheduleId: match.id,
          teamAId: match.teamA.id,
          teamBId: match.teamB.id,
          scoreA,
          scoreB,
          scorersA: scorerA,
          scorersB: scorerB,
          potmA,
          potmB,
          winner: winner(),
        }),
      });

      if (response.ok) {
        toast.success("Match data recorded successfully");
        window.location.href = '/schedule';
      } else {
        const { message } = await response.json();
        toast.error(message);
      }
    } catch (error) {
      console.error("Error submitting match data:", error);
    }
  }
  
  return (
    <div className='flex flex-col items-center w-full gap-5 mt-4'>
      <div className='flex flex-col sm:flex-row justify-center items-center w-full gap-5'>
        <div className='flex flex-col items-center bg-white/20 rounded-lg p-4 shadow-md'>
          <h4 className='text-lg font-semibold'>{match.teamA.name}</h4>
          <p className='text-sm text-gray-700 mb-2'><span className='text-gray-900'>Coach:</span> {match.teamA.coach}</p>
          <div className='flex items-center gap-3 mb-3'>
            <button className='text-2xl px-3 py-1 rounded bg-gray-300' onClick={() => setScoreA(Math.max(0, scoreA - 1))}>-</button>
            <span className="text-4xl font-bold py-2">{scoreA}</span>
            <button className='text-2xl px-2 py-1 rounded bg-gray-300' onClick={() => setScoreA(scoreA + 1)}>+</button>
          </div>
          <div className='flex gap-2 w-full mb-2'>
            <input value={scorerNameA} onChange={(e) => setScorerNameA(e.target.value)} type="text" className='px-2 py-1 rounded border flex-1' placeholder="Scorer name" disabled={ended} />
            <button className='px-3 py-1 rounded bg-white text-black font-semibold' onClick={addScorerA}  disabled={ended || !scorerNameA.trim()}>Add</button>
          </div>
          {scorerA.length > 0 && (
            <div className='text-xs text-gray-800 self-start'>
              <p className='font-semibold'>Scorers: {scorerA.join(', ')}</p>
            </div>
          )}
          <div className='mt-4 w-full'>
            <input value={potmA} onChange={(e) => setPotmA(e.target.value)} type="text" className='px-2 py-1 rounded border flex-1 w-full' placeholder="Player of the Match" disabled={ended} />
            {potmA && <p className='text-xs bg-gray-300 text-gray-800 mt-2 px-2 py-1 rounded font-semibold'>POTM: {potmA}</p>}
          </div>
        </div>

        <span className='text-3xl font-bold text-gray-800'>VS</span>

        <div className='flex-1 flex flex-col items-center bg-white/20 rounded-lg p-4 shadow-md'>
          <h4 className='text-lg font-semibold'>{match.teamB.name}</h4>
          <p className='text-sm text-gray-700 mb-2'><span className='text-gray-900'>Coach:</span> {match.teamB.coach}</p>
          <div className='flex items-center gap-3 mb-3'>
            <button className='text-2xl px-3 py-1 rounded bg-gray-300' onClick={() => setScoreB(Math.max(0, scoreB - 1))}>-</button>
            <span className="text-4xl font-bold py-2">{scoreB}</span>
            <button className='text-2xl px-2 py-1 rounded bg-gray-300' onClick={() => setScoreB(scoreB + 1)}>+</button>
          </div>
          <div className='flex gap-2 w-full mb-2'>
            <input value={scorerNameB} onChange={(e) => setScorerNameB(e.target.value)} type="text" className='px-2 py-1 rounded border flex-1' placeholder="Scorer name" disabled={ended} />
            <button className='px-3 py-1 rounded bg-white text-black font-semibold' onClick={addScorerB} disabled={ended || !scorerNameB.trim()}>Add</button>
          </div>
          {scorerB.length > 0 && (
            <div className='text-xs text-gray-800 self-start'>
              <p className='font-semibold'>Scorers: {scorerB.join(', ')}</p>
            </div>
          )}
          <div className='mt-4 w-full'>
            <input value={potmB} onChange={(e) => setPotmB(e.target.value)} type="text" className='px-2 py-1 rounded border flex-1 w-full' placeholder="Player of the Match" disabled={ended} />
            {potmB && <p className='text-xs bg-gray-300 text-gray-800 mt-2 px-2 py-1 rounded font-semibold'>POTM: {potmB}</p>}
          </div>
        </div>
      </div>
      <div className='mt-5'>
        {!ended ? (
          <button className='px-5 py-2 rounded bg-green-700 text-white font-bold cursor-pointer' onClick={() => setEnded(true)}>End Match</button>
        ):(
          <div className='text-center'>
            <p className='text-lg font-bold text-red-700'>Match Ended!</p>
            <span className='text-gray-700 font-semibold text-sm'>All the Scores and Details are now saved.</span>
            <p className='font-semibold'>Winner: {scoreA > scoreB ? match.teamA.name : match.teamB.name}</p>
            <button className='px-3 py-1 mt-2 rounded bg-green-700 text-white font-bold cursor-pointer' onClick={submit}>
              Submit Match Record
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
