import { Menu, Plus } from "lucide-react";
import { useState } from "react"

export default function Navbar() {
    const [ open, setOpen ] = useState(false);
    const currentPath = window.location.pathname;
    return (
        <div className='w-full min-h-[70px] flex justify-center items-center'>
            <nav className='w-full max-w-6xl px-3 py-2 rounded-xl bg-[#6c9968] shadow-md flex justify-between items-center'>
                <div className='flex items-center space-x-4'>
                    <span className='text-white font-bold text-2xl tracking-wide'>
                        <a href="/">Football</a>
                    </span>
                </div>

                <div className='hidden sm:flex items-center space-x-4'>
                    <ul className='hidden sm:flex gap-5 text-sm mt-2'>
                        {["Home", "Schedule", "Teams", "Play"].map((item, index) => (
                        <li key={index}>
                            <a  href={item === "Home" ? "/" : `/${item.toLowerCase()}`} className='group flex flex-col items-center gap-2'>
                                <p className={`${currentPath === (item === "Home" ? "/" : `/${item.toLowerCase()}`) ? "text-black font-semibold" : "text-white"}`}>{item}</p>
                                <hr className='w-0 group-hover:w-2/4 transition-all duration-500 ease-in-out border-0 h-[1.5px] bg-black' />
                            </a>
                        </li>
                        ))}
                    </ul>
                    <button className='bg-white hidden sm:block text-sm shadow-md text-black font-semibold px-4 py-2 rounded-md'><a href="/login" className='hover:font-bold'>Login</a></button>
                </div>

                <div className='sm:hidden flex items-center justify-center'>
                    <Menu onClick={() => setOpen(true)} className='w-5 h-5 cursor-pointer sm:hidden' />
                    {open && (  
                        <div className='absolute top-18 left-1/2 -translate-x-1/2 max-w-[360px] w-[95vw] px-2 flex flex-col items-center bg-[#6c9968] shadow-xl rounded-xl p-4'>
                            <ul className='flex flex-col space-y-2 text-sm mt-2'>
                                {["Home", "Schedule", "Teams", "Play"].map((item, index) => (
                                    <li key={index}>
                                        <a href={item === "Home" ? "/" : `/${item.toLowerCase()}`} className='group flex flex-col items-center gap-2'>
                                            <p className={`${currentPath === (item === "Home" ? "/" : `/${item.toLowerCase()}`) ? "text-black font-semibold" : "text-white"}`}>{item}</p>
                                        </a>
                                    </li>
                                ))} 
                            </ul>
                            <button className='bg-white text-sm shadow-md text-black font-semibold px-4 py-2 rounded-md mt-4'><a href="/login">Login</a></button>
                            <Plus onClick={() => setOpen(false)} className='mt-4 w-5 h-5 rotate-45 cursor-pointer sm:hidden' />
                        </div>
                    )}
                </div>
            </nav>
        </div>
    )
}