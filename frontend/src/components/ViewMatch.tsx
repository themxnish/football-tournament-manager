import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

interface ViewMatchProps {
  scheduleId: string;
  onClose: () => void;
}

interface MatchResult {
  date: string;
  time: string;
  pitch: string;
  category: string;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  scorersA: string[];
  scorersB: string[];
  potmA?: string;
  potmB?: string;
  winner?: string;
}

const dateFormat = (date: string) =>
  new Date(date).toLocaleDateString("en-GB");

export default function ViewMatchModal({ scheduleId, onClose }: ViewMatchProps) {
  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState<MatchResult | null>(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/play/record/${scheduleId}`, {
          credentials: "include",
        });

        if(response.ok){
          const data = await response.json();
          setRecord(data);
        } else {
          toast.error('Failed to fetch match record');
        }        
      } catch (error) {
        console.error('Error during fetch:', error);
        toast.error('Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchRecord();
  }, [scheduleId]);

  if (loading){
    return (
      <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
        <div className='bg-white rounded-xl shadow-xl w-11/12 sm:w-[400px] p-6 text-center'>
          <p className='text-gray-700 text-sm'>Loading...</p>
        </div>
      </div>
    );
  }

  if (!record){
    return (
      <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
        <div className='bg-white rounded-xl shadow-xl w-11/12 sm:w-[400px] p-6 text-center'>
          <p className='text-gray-700 text-sm'>No match record found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
      <div className='bg-white rounded-xl shadow-xl w-11/12 sm:w-[400px] p-5 relative'>
        <button onClick={onClose} className='absolute top-3 right-3 text-gray-600 cursor-pointer'>
          <X size={18} />
        </button>

        <h2 className='text-xl font-bold text-center'>Match Result</h2>
        <div className='text-sm text-gray-700 space-y-1 mt-5'>
          <div className='text-center'>
            <p><span className='font-semibold'>Date:</span> {dateFormat(record.date)} - {record.time}</p>
            <div className='flex justify-between gap-4'> 
              <p><span className='font-semibold'>Pitch:</span> {record.pitch}</p>
              <p><span className='font-semibold'>Category:</span> {record.category}</p>
            </div>
          </div>

          <hr className='my-3' />

          <div className='bg-green-200 p-3 rounded-lg'>
            <div className='flex justify-between font-bold items-center text-center'>
              <div className='flex-1'>
                <p className='text-base'>{record.teamA}</p>
              </div>
              <span className='font-semibold text-2xl px-5'>vs</span>
              <div className='flex-1'>
                <p className='text-base'>{record.teamB}</p>
              </div>
            </div>
            
            <div className='flex justify-between font-bold items-center text-center'>
              <div className='flex-1'>
                <p className='text-2xl'> {record.scoreA}</p>
              </div>
              <span className='px-3'>  </span>
              <div className='flex-1'>
                <p className='text-2xl'> {record.scoreB}</p>
              </div>
            </div>
          </div>
          
          <div className='bg-green-200 p-2 rounded-lg text-xs  space-y-2'>
            <div className='flex justify-between space-x-15'>
              <p><span className='font-semibold'>Scorers:</span> {record.scorersA.join(", ") || "None"}</p>
              <p><span className='font-semibold'>Scorers:</span> {record.scorersB.join(", ") || "None"}</p>
            </div>

            <div className='flex justify-between'>
              <p><span className='font-semibold'>POTM:</span> {record.potmA || "N/A"}</p>
              <p><span className='font-semibold'>POTM:</span> {record.potmB || "N/A"}</p>
            </div>
          </div>

          <div className='flex justify-between mt-2'>
            <span className='font-semibold text-sm'>Winner:</span>{" "}
            <p className='text-sm font-bold'>{record.winner || "N/A"}</p>
          </div>

          <hr className='my-2' />

          <div className='text-gray-500 text-xs text-center'> 
            <p>Final whistle, final word!</p>
            <p>Stats fade, spirit stays strong.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
