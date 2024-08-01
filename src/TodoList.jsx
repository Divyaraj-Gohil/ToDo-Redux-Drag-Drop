import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateTodo } from './redux/todoSlice.js'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import checkicon from './icons/checkbox.png'
import { Todo } from './Todo.jsx'

import deleteicon from './icons/delete.png'
import updateicon from './icons/edit.png'

export const TodoList = ({ todos }) => {
    const [update, setupdate] = useState(-1)
    const [input, setinput] = useState(null)

    const dispatch = useDispatch()

    const setupdatehandle = (id) => {
        setupdate(id)
    }
    const updatebtn = (id, text) => {
        if (text === null) return
        dispatch(updateTodo({ id, text }))
        setupdate(-1)
        setinput(null)
    }

    return (
        <>
            <div className='w-full lg:w-[80%] flex flex-col mx-auto gap-3'>
                <SortableContext items={todos}
                    strategy={verticalListSortingStrategy}
                >
                    {todos.map((todo) => {
                        return update === todo.id ?
                            <li className='flex mx-8 md:mx-40 gap-3 px-3 py-2 bg-white justify-between font-bold rounded-xl break-words' key={todo.id}>
                                <input type='text' className='w-[70%] px-1 py-1 outline-none rounded-xl '
                                    defaultValue={todo.text}
                                    value={input}
                                    onChange={e => setinput(e.target.value)} />
                                <div className='flex justify-between gap-2'>
                                    <button onClick={(e) => updatebtn(update, input)}> <img className='w-[25px]' src={checkicon} /> </button>
                                    <button onClick={(e) => setupdate(-1)}>cancel</button>
                                </div>
                            </li>
                            :
                            //<div className='w-full lg:w-[80%] flex mx-auto gap-3'>
                            <Todo key={todo.id} id={todo.id} text={todo.text} setupd={setupdatehandle} />
                        {/* <span className='flex gap-2' key={todo.id}>
                                    <button onClick={() => setupdatehandle(todo.id)}> <img className='w-[25px]' src={updateicon} /> </button>
                                    <button onClick={() => dispatch(removeTodo(id))}><img className='w-[25px]' src={deleteicon} /></button>
                                </span></div> */}


                    })
                    }
                </SortableContext>
            </div>
        </>
    )
}
