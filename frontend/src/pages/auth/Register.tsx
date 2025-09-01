import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Register() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        fullName: user.name,
                        email: user.email,
                        password: user.password,
                    }
                ),
            });

            if (response.ok) {
                toast.success('User registered, please log in.');
                navigate('/login');
            } else {
                const { message } = await response.json();
                toast.error(message);
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'An error occurred');
            console.error('Error during registration:', error);   
        }
    }

    return (
        <div className='flex items-center justify-center px-4 my-10'>
            <div className='text-white w-full max-w-md p-8 bg-[#6c9968] rounded-xl shadow-xl'>
                <h2 className='text-3xl font-bold text-black mt-2 mb-10 text-center'>Create a new account</h2>
                <form onSubmit={onSubmit} className='flex flex-col gap-5'>
                    <div>
                        <label className='block mb-1 text-black text-sm font-semibold'>Name</label>
                        <input value={user.name} onChange={e => setUser({ ...user, name: e.target.value })}  type="text" placeholder="John Doe" className='w-full px-3 py-2 rounded-lg bg-[#4a6e4d] border border-[#4a6e4d] focus:outline-none focus:ring-2 focus:ring-[#4a6e4d]' />
                    </div>
                    <div>
                        <label className='block mb-1 text-black text-sm font-semibold'>Email</label>
                        <input value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} type="email" placeholder="you@email.com" className='w-full px-3 py-2 rounded-lg bg-[#4a6e4d] border border-[#4a6e4d] focus:outline-none focus:ring-2 focus:ring-[#4a6e4d]' />
                    </div>
                    <div>
                        <label className='block mb-1 text-black text-sm font-semibold'>Password</label>
                        <input value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} type="password" placeholder="••••••••" className='w-full px-3 py-2 rounded-lg bg-[#4a6e4d] border border-[#4a6e4d] focus:outline-none focus:ring-2 focus:ring-[#4a6e4d]' />
                    </div>
                    <div>
                        <label className='block mb-1 text-black text-sm font-semibold'>Confirm Password</label>
                        <input value={user.confirmPassword} onChange={e => setUser({ ...user, confirmPassword: e.target.value })} type="password" placeholder="••••••••" className='w-full px-3 py-2 rounded-lg bg-[#4a6e4d] border border-[#4a6e4d] focus:outline-none focus:ring-2 focus:ring-[#4a6e4d]' />
                    </div>
                    <button type="submit" className='bg-white text-black font-semibold px-3 py-2 rounded-lg mt-2 hover:cursor-pointer'>Register</button>
                    <div className='flex items-center mt-2 text-sm'>
                        <p className='text-black mr-1'>Already have an account?</p>
                        <a href="/login" className='text-green-50 hover:underline hover:text-white transition'>Log in</a>
                    </div>
                </form>
            </div>
        </div>
    );
}