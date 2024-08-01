import { TodoList } from "./TodoList"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { nanoid } from "@reduxjs/toolkit"
import { addTodo } from './redux/todoSlice.js'
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { dragTodo } from "./redux/todoSlice.js"

function App() {
  const [input, setinput] = useState('')
  const todos = useSelector(store => store.todos)
  const [tasks, setTask] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    setTask(todos)
  }, [todos])
  const onchange = (e) => {
    setinput(e.target.value)
  }

  const handlesubmit = (text) => {
    if (text.trim() === '') return
    let id = nanoid()
    dispatch(addTodo({ id, text }))
    setinput('')
  }
  const keypress = (event) => {
    if (event.key === 'Enter') {
      handlesubmit(input)
    }
  }
  const getTaskPos = id => tasks.findIndex(task => task.id === id)

  const handleDragEnd = event => {
    const { active, over } = event
    if (active.id === over.id) return
    setTask(tasks => {
      const originalPos = getTaskPos(active.id)
      const newPos = getTaskPos(over.id)

      const newarr = arrayMove(tasks, originalPos, newPos)
      dispatch(dragTodo(newarr))
      return newarr
    })
  }
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <><div className="bg-gradient-to-r  from-blue-200 to-cyan-200 min-h-screen lg:w-[70%] w-full mx-auto  md:rounded-2xl">
      <h1 className="text-center font-bold text-5xl pt-5 text-[#a8142f] ">Todo-List</h1>
      <div className="flex mx-auto mt-8 my-5 md:px-20 lg:px-24 w-[70%]">
        <input type="text" onKeyUp={keypress} required value={input} onChange={onchange} className="px-3 py-2 w-[80%] outline-none rounded-l-2xl bg-white " placeholder="Enter Todo..." />
        <button onClick={() => handlesubmit(input)} className="bg-[#59ed8a] w-[20%] md:font-semibold md:text-lg rounded-r-2xl">Add</button>
      </div>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners} >

        <TodoList todos={tasks} />

      </DndContext>
    </div>
    </>
  )
}

export default App
