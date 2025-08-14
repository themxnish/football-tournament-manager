export default function Register() {
    return (
        <div className='flex items-center justify-center px-4 my-10'>
            <div className='text-white w-full max-w-md p-8 bg-[#6c9968] rounded-xl shadow-xl'>
                <h2 className='text-3xl font-bold text-black mt-2 mb-10 text-center'>Create a new account</h2>
                <form className='flex flex-col gap-5'>
                    <div>
                        <label className='block mb-1 text-black text-sm font-semibold'>Name</label>
                        <input type="text" placeholder="John Doe" className='w-full px-3 py-2 rounded-lg bg-[#4a6e4d] border border-[#4a6e4d] focus:outline-none focus:ring-2 focus:ring-[#4a6e4d]' />
                    </div>
                    <div>
                        <label className='block mb-1 text-black text-sm font-semibold'>Email</label>
                        <input type="email" placeholder="you@email.com" className='w-full px-3 py-2 rounded-lg bg-[#4a6e4d] border border-[#4a6e4d] focus:outline-none focus:ring-2 focus:ring-[#4a6e4d]' />
                    </div>
                    <div>
                        <label className='block mb-1 text-black text-sm font-semibold'>Password</label>
                        <input type="password" placeholder="••••••••" className='w-full px-3 py-2 rounded-lg bg-[#4a6e4d] border border-[#4a6e4d] focus:outline-none focus:ring-2 focus:ring-[#4a6e4d]' />
                    </div>
                    <button type="submit" className='bg-white text-black font-semibold px-3 py-2 rounded-lg mt-2'>Register</button>
                    <div className='flex items-center mt-2 text-sm'>
                        <p className='text-black mr-1'>Already have an account?</p>
                        <a href="/login" className='text-green-50 hover:underline hover:text-white transition'>Log in</a>
                    </div>
                </form>
            </div>
        </div>
    );
}