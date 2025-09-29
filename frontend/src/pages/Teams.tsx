import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Delete } from "lucide-react";

function groupByCategory(teams: Array<{ id: string; name: string; category: string; coach: string }>) {
  return teams.reduce((acc, team) => {
    (acc[team.category] = acc[team.category] || []).push(team);
    return acc;
  }, {} as Record<string, typeof teams>);
}

export default function Teams() {
  const [teams, setTeams] = useState<Array<{ id: string; name: string; category: string; coach: string }>>([]);
  const [ admin, setAdmin ] = useState(false);

  const groupedTeams = groupByCategory(teams);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/team/teams`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        
        if (response.ok) {
          const data = await response.json();
          setTeams(data.teams || []);
        } else {
          const { message } = await response.json();
          toast.error(message);
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'An error occurred');
      }
    };
    
    fetchTeams();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/session`, {
            credentials: "include"
        });
        if (!response.ok) {
          setAdmin(false);
          return;
        }

        const data = await response.json();
        if (data.user && data.user.role === "admin") {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
      } catch (error) {
          console.log(error);
          setAdmin(false);
      }
    }
  checkAuth();
  }, []);

  const handleDelete = async (teamName: string) => {
    if (!confirm(`Are you sure you want to delete the team - ${teamName}?`)) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/team/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name: teamName }),
      });
      
      if (response.ok) {
        toast.success("Team deleted successfully");
        setTeams(teams.filter(team => team.name !== teamName));
      } else {
        const { message } = await response.json();
        toast.error(message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  }
  return (
    <div className='flex flex-col sm:items-center px-4'>
      <div className='sm:w-2/3 lg:w-1/2 mt-4'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Teams</h2>
        {Object.entries(groupedTeams).map(([category, teamsInCategory]) => (
          <div key={category} className='mb-6 w-full'>
            <h3 className='text-xl font-bold mb-3'>{category}</h3>
            <div className='space-y-2'>
              {(teamsInCategory as Array<{ id: string; name: string; category: string; coach: string }>).map((team) => (
                <div key={team.id} className='flex flex-col sm:flex-row sm:items-center justify-between bg-[#6c9968] bg-opacity-30 gap-2 rounded-xl shadow px-4 py-3'>
                  <div className='flex flex-col sm:flex-row sm:items-center gap-1 flex-1'>
                    <p className='font-bold text-md text-black'>{team.name}</p>
                    <span className='text-xs text-gray-100 bg-[#4a6e4d] px-3 py-1 rounded-xl mt-1 sm:mt-0'>Coach: <span className='font-semibold'>{team.coach}</span></span>
                  </div>
                  {admin && 
                    <button
                      onClick={() => handleDelete(team.name)}
                      className='mt-3 sm:mt-0 sm:ml-4 text-red-600 hover:text-red-800 font-semibold self-end sm:self-auto'
                      title="Delete"
                    >
                      <Delete size={22} />
                    </button>
                  }
                </div>
              ))}
            </div>
          </div>
            ))}
      </div>
    </div>
  );
}
