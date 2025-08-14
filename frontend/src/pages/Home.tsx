import { FaQuoteLeft } from "react-icons/fa"
import Timeline from "../components/Timeline";

export default function Home() {
    const timeline = [
    { label: "Kickoff", date: "12 Aug, 2025" },
    { label: "Group Stage", date: "15 Aug, 2025" },
    { label: "Knockout Stage", date: "20 Aug, 2025" },
    { label: "Semifinals", date: "28 Aug, 2025" },
    { label: "Final", date: "30 Aug, 2025" },
    ];

    const members = [
    { name: "C. Donaldo", image: "https://randomuser.me/api/portraits/men/85.jpg", quote: "The beautiful game!" },
    { name: "L. Sessi", image: "https://randomuser.me/api/portraits/men/32.jpg", quote: "I live for this sport." },
    { name: "K. Fbappé", image: "https://randomuser.me/api/portraits/men/17.jpg", quote: "Winning is everything." },
    ];
    return (
        <div className='w-full flex flex-col items-center py-12 px-2'>
            <h2 className='text-2xl font-bold'>Welcome peeps,</h2>
            <p className='text-gray-700 mb-8 text-md text-center max-w-lg'>
                Experience and track the thrill of Football.<br />
            </p>

            <Timeline events={timeline} />

            <h2 className='text-2xl font-bold tracking-wide mt-6 mb-4'>Our Team</h2>
            <div className='py-4 px-2 w-full max-w-3xl mx-auto'>
                <div className='flex flex-row sm:flex-wrap justify-start sm:justify-center gap-2 items-stretch scrollbar-thin scrollbar-thumb-gray-400 overflow-x-auto  '>
                    {members.map((m, i) => (
                        <div key={i} className='bg-[#6c9968] rounded-2xl text-center w-60 min-w-[220px] flex flex-col items-center px-6 py-6 snap-center'>
                        <img src={m.image} alt={m.name} className='w-24 h-24 rounded-full mx-auto object-cover mb-2 border-white border-3'/>
                        <p className='text-black italic font-semibold'>{m.name}</p>
                        <FaQuoteLeft className='my-3 text-white text-xl' />
                        <p className='text-gray-700 text-sm'>{m.quote}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}