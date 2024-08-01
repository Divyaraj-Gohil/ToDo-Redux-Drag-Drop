import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import deleteicon from './icons/delete.png'
import updateicon from './icons/edit.png'
import { removeTodo } from "./redux/todoSlice";

export const Todo = ({ id, text, setupd }) => {
    const dispatch = useDispatch()
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }
    return (<>
        <div ref={setNodeRef} {...attributes}{...listeners} style={style} className="w-full mx-auto px-5 md:px-40">
            <li className='w-full lg:w-[80%] flex mx-auto touch-none cursor-grab gap-3 px-3 py-2 bg-white font-bold rounded-xl break-words'
                key={id}><p className='flex-1'>{text}</p>
                <div className='flex justify-between gap-2'>
                    <button onClick={() => setupd(id)}> <img className='w-[25px]' src={updateicon} /> </button>
                    <button onClick={() => dispatch(removeTodo(id))}><img className='w-[25px]' src={deleteicon} /></button>
                </div>
            </li>
        </div>
    </>)
}