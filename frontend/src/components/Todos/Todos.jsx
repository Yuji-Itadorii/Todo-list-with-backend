import React, { useEffect, useState } from 'react'
import "./Todos.css"
import axios from 'axios'
import TodoCard from './TodoCard'
import { PlusCircleOutlined } from '@ant-design/icons'


const Todos = () => {
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState("")

    async function getTodos() {

        const alltokens = document.cookie;
        const token = alltokens.split('=')[1];
        // console.log(token)

        const data = {
            token: token
        }

        const res = await axios.post("http://localhost:3000/api/alltodos", data)
        setTodos(res.data)
        setLoading(false)

    }


    const submitNote = async (e) => {
        e.preventDefault();

        const allCookies = document.cookie;
        const token = allCookies.split("=")[1];
        // console.log(token);


        const data = {
            text: title,
            token: token
        }
        try {
            await axios.post("http://localhost:3000/api/todos", data);
            setTitle("")
        }
        catch (err) {
            console.log(err);
        }

        getTodos()


    };


    useEffect(() => {
        getTodos()
    }, [])

    return (
        <>
            {/* <CreateArea /> */}
            <div>
                <form className="create-note">
                    <input
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        placeholder="Title"
                    />
                    <button onClick={submitNote}>
                        <PlusCircleOutlined />
                    </button>
                </form>
            </div>

            <div className="todo-container">
                {todos && todos.map((todo, index) => {
                    return <TodoCard key={index} data={todo} />
                })}
            </div>


        </>
    )
}

export default Todos