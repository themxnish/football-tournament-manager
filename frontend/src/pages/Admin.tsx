import { useState } from "react";
import { CreateTeam } from "../components/CreateTeam";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CreateMatch } from "../components/CreateMatch";

export const Admin = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const adminTasks = [
    { key: "createTeam", title: "Create New Team", component: <CreateTeam /> },
    { key: "createMatch", title: "Add New Match", component: <CreateMatch /> },
    { key: "manageUsers", title: "Manage Users", component: <div>Manage Users Component</div> },
  ];

  const toggleSection = (key: string) =>
    setOpenSection(openSection === key ? null : key);

  return (
    <div className='flex flex-col sm:items-center'>
      <div className='sm:w-1/2'>
        <h2 className='text-2xl font-bold mb-6 text-center mt-4'>Admin Panel</h2>
        {adminTasks.map(({ key, title, component }) => (
            <div key={key} className='mb-2 rounded-lg overflow-hidden'>
                <button
                    className='w-full text-left px-4 py-2 bg-[#6c9968] font-semibold flex justify-between items-center'
                    onClick={() => toggleSection(key)}
                    >
                    {title}
                    <span>{openSection === key ? <ChevronUp size={22} /> : <ChevronDown size={22} />}</span>
                </button>
                {openSection === key && <div className='p-4 bg-[#6c9968]'>{component}</div>}
            </div>
        ))}
      </div>
    </div>
  );
};
