import { Pencil, Trash2, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, Captlize } from "../../utils";

export const UserCard = ({ user, onDelete }) => {
    const navigate = useNavigate()
    return (
        <div
            className='shadow-xl bg-white min-w-[10em] max-w-[15em] min-h-[14em] flex flex-col px-4 py-4 rounded-md gap-4 border-slate-400 border-[2px]'>
            {/* <User width={60} height={60} className='text-center mx-auto' onClick={() => navigate(`/user/${user._id}`)} /> */}
            <span className="text-center text-white mx-auto rounded-full p-[1em] bg-gray-800 min-w-[1em] text-xl " >{Avatar(user.name)}</span>
            <div className="border-slate-600 border-t-[1px] w-full" />
            <div className='flex flex-col text-sm'>
                <div className='font-semibold'>Name: <span className='font-normal'>{Captlize(user.name)}</span></div>
                <div className='font-semibold  '>Email: <span className='font-medium'>{user.email}</span></div>
            </div>
            <div className='flex justify-between items-center mt-4'>
                <Trash2 onClick={() => onDelete(user._id)} className="hover:cursor-pointer" />
                <div className="border-slate-600 border-x-[1px] mx-2 text-center w-full" >
                    <button className="px-[1em] py-[.5em] bg-slate-800 text-white w-[6em] rounded-md" onClick={() => navigate(`/user/${user._id}`)}>View</button>
                </div>
                <Pencil onClick={() => navigate(`/edit/${user._id}`)} className="cursor-pointer" />
            </div>
        </div>
    );
}