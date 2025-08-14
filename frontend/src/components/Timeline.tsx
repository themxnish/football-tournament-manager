import { FaFutbol } from "react-icons/fa";

interface TimelineEvent {
  label: string;
  date: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <div className='w-full flex flex-col items-center'>
      <h2 className='text-2xl font-bold tracking-wide mt-6 mb-6'>League Timeline</h2>
      <div className={`w-full max-w-3xl flex gap-4 sm:gap-2 items-center
        ${'overflow-x-auto sm:overflow-x-visible sm:justify-center'}
        snap-x snap-mandatory ${""} scrollbar-thin scrollbar-thumb-gray-400 sm:scrollbar-none px-1 sm:px-2`}>
            {events.map((item, index) => (
                <div key={index} className='flex flex-col items-center flex-shrink-0 snap-center min-w-[80px] sm:min-w-[100px]'>
                    <FaFutbol className='w-10 h-10 rounded-full flex items-center justify-center hover:rotate-12 text-black mb-2 shadow-lg' />
                    <span className='text-gray-800 font-semibold'>{item.label}</span>
                    <span className='text-xs text-gray-600 mt-1'>{item.date}</span>
                </div>
            )).reduce((acc, curr) => {
                return (
                    <>
                        {acc}
                        <div className='h-1 w-7 sm:w-9 bg-gray-600 rounded-full flex-shrink-0' />
                        {curr}
                    </>
                );
            })}
        </div>
    </div>
  );
}
