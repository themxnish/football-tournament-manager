import { useState } from "react";
import { toast } from "sonner";

export const CreateTeam = () => {
    const [user, setUser] = useState({
        name: '',
        category: '',
        coach: '',
    });

    const categories = ['Boys', 'Girls', 'Mixed gender'];

    const create = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/team/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", 
                body: JSON.stringify(
                    {
                        name: user.name,
                        category: user.category,
                        coach: user.coach,
                    }
                ),
            });

            if (response.ok) {
                toast.success('Team created successfully.');
            } else {
                const { message } = await response.json();
                toast.error(message);
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'An error occurred');
        }
    }
    return (
        <div>
             <form onSubmit={create} className='flex flex-col gap-5'>
                <div>
                    <label className='block mb-1 text-black text-sm font-semibold'>Team Name</label>
                    <input type="text" placeholder="FC Pune" onChange={(e) => setUser({ ...user, name: e.target.value })} className='w-full sm:w-1/2 px-4 py-2 text-sm rounded-lg bg-[#4a6e4d] border border-[#4a6e4d] focus:outline-none focus:ring-2 focus:ring-[#4a6e4d]' />
                </div>
                <div>
                    <label className='block mb-1 text-black text-sm font-semibold'>Category</label>
                    <select value={user.category} onChange={(e) => setUser({ ...user, category: e.target.value })} className='w-full sm:w-1/2 px-4 py-2 text-sm rounded-lg bg-[#4a6e4d] focus:outline-none focus:ring-2 focus:ring-[#4a6e4d]'>
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className='block mb-1 text-black text-sm font-semibold'>Coach Name</label>
                    <input type="text" placeholder="John Doe" onChange={(e) => setUser({ ...user, coach: e.target.value })} className='w-full sm:w-1/2 px-4 py-2 text-sm rounded-lg bg-[#4a6e4d] border border-[#4a6e4d] focus:outline-none focus:ring-2 focus:ring-[#4a6e4d]' />
                </div>
                <button type="submit" className='bg-gray-300 shadow-xl text-black font-semibold px-4 py-2 rounded-lg mt-2 w-fit'>Create Team</button>
            </form>
        </div>
    );
};
