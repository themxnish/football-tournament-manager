import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", 
                body: JSON.stringify(
                    {
                        email: user.email,
                        password: user.password,
                    }
                ),
            });

            if (response.ok) {
                toast.success('User logged in successfully.');
                navigate('/');
                setTimeout(() => {
                    window.location.reload();
                }, 600);
            } else {
                const { message } = await response.json();
                toast.error(message);
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'An error occurred');
        }
    }
    return (
        <div className='flex items-center justify-center px-4 my-10'>
            <div className='text-white w-full max-w-md p-8 bg-[#6c9968] rounded-xl shadow-xl'>
                <h2 className='text-3xl font-bold text-black mt-2 mb-10 text-center'>Login</h2>
                <form onSubmit={onSubmit} className='flex flex-col gap-5'>
                    <div>
                        <label className='block mb-1 text-black text-sm font-semibold'>Email</label>
                        <input type="email" placeholder="you@email.com" onChange={(e) => setUser({ ...user, email: e.target.value })} className='w-full px-3 py-2 rounded-lg bg-[#4a6e4d] border border-[#4a6e4d] focus:outline-none focus:ring-2 focus:ring-[#4a6e4d]' />
                    </div>
                    <div>
                        <label className='block mb-1 text-black text-sm font-semibold'>Password</label>
                        <input type="password" placeholder="••••••••" onChange={(e) => setUser({ ...user, password: e.target.value })} className='w-full px-3 py-2 rounded-lg bg-[#4a6e4d] border border-[#4a6e4d] focus:outline-none focus:ring-2 focus:ring-[#4a6e4d]' />
                    </div>
                    <button type="submit" className='bg-white text-black font-semibold px-3 py-2 rounded-lg mt-2'>Login</button>
                    <div className='flex items-center mt-2 text-sm'>
                        <p className='text-black mr-1'>Don't have an account?</p>
                        <a href="/register" className='text-green-50 hover:underline hover:text-white transition'>Sign up</a>
                    </div>
                </form>
            </div>
        </div>
    );
}