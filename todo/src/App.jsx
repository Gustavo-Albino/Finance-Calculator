import { useState } from 'react'
import './App.css'

//Components
import './components/Todo'
import Todo from './components/Todo'
import TodoForm from './components/TodoForm'
import Search from './components/Search'

function App() {

  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Organizar o setor",
      category: "Trabalho",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Treinar Kickboxing",
      category: "Pessoal",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Estudar React",
      category: "Estudos",
      isCompleted: false,
    }
  ])

  const [search, setSearch] = useState("")

  const addTodo = (text, category) => {
    const newTodos = [
      ...todos,
      {
        id: todos.length,
        text,
        category,
        isCompleted: false
      }
    ]
    setTodos(newTodos)  
  }

  const removeTodo = (id) => {
    const newTodos = [...todos]
    const filteredTodos = newTodos.filter((todo) => todo.id !== id ? todo : null)
    setTodos(filteredTodos)
  }

  const completeTodo = (id) => {
    const newTodos = [...todos]
    newTodos.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo)
    setTodos(newTodos)
  }

  return (
    <div className='app'>
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch}/>
      <div className="todo-list">
        {todos.filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase())).
        map((todo) => (
          <Todo todo={todo} key={todo.id} removeTodo={removeTodo} completeTodo={completeTodo}/>
        ))}
      </div>
      <TodoForm addTodo={addTodo}/>
    </div>
  )
}

export default App
