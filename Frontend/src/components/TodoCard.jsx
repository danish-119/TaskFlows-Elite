import React, { useRef, useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TodoCard = () => {
    const [todos, setTodos] = useState([]);
    const [showFinished, setShowFinished] = useState(false);
    const [editingTodoId, setEditingTodoId] = useState(null);
    let inputTodo = useRef();

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await fetch('http://localhost:3000/taskflows');
            if (!response.ok) {
                throw new Error('Failed to fetch todos');
            }
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error('Error fetching todos:', error.message);
        }
    };

    const handleSave = async () => {
        const text = inputTodo.current.value.trim();
        if (!text) return;

        try {
            if (editingTodoId !== null) {
                await fetch(`http://localhost:3000/taskflows/${editingTodoId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text }),
                });
                setEditingTodoId(null);
            } else {
                const response = await fetch('http://localhost:3000/taskflows', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text, finished: false }),
                });
                if (!response.ok) {
                    throw new Error('Failed to add todo');
                }
                const newTodo = await response.json();
                setTodos([...todos, newTodo]);
            }
            inputTodo.current.value = '';
        } catch (error) {
            console.error('Error saving todo:', error.message);
        }
    };

    const handleEdit = (id) => {
        setEditingTodoId(id);
        const todoToEdit = todos.find(todo => todo.id === id);
        if (todoToEdit) {
            inputTodo.current.value = todoToEdit.text;
        }
        inputTodo.current.focus();
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/taskflows/${id}`, {
                method: 'DELETE',
            });
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error.message);
        }
    };

    const toggleTodoFinished = async (id) => {
        try {
            const todoToUpdate = todos.find(todo => todo.id === id);
            if (!todoToUpdate) return;

            const updatedTodo = { ...todoToUpdate, finished: !todoToUpdate.finished };
            await fetch(`http://localhost:3000/taskflows/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTodo),
            });
            setTodos(todos.map(todo =>
                todo.id === id ? updatedTodo : todo
            ));
        } catch (error) {
            console.error('Error updating todo:', error.message);
        }
    };

    const handleToggleFinished = () => {
        setShowFinished(!showFinished);
    };

    return (
        <div className='text-white bg-blue-500 h-5/6 w-1/3 m-5 rounded-lg p-5'>
            <h2 className='text-center text-xl font-medium'>TaskFlows - Your Personal Task Organizer</h2>
            <label htmlFor="" className='block my-2 font-medium px-1'>Add your Todo</label>
            <input ref={inputTodo} type="text" className='rounded-full w-4/5 text-black px-2 py-1 text-xs' spellCheck='false' />
            <button onClick={handleSave} className='w-1/6 text-center bg-blue-700 m-1 p-0.5 rounded-full hover:bg-blue-800'>
                {editingTodoId !== null ? 'Save' : 'Add'}
            </button>
            <div className='flex gap-1 items-center my-3'>
                <input type="checkbox" checked={showFinished} onChange={handleToggleFinished} />
                <label className='text-xs'>Show Finished</label>
            </div>
            <div className='w-11/12 h-0.5 bg-white'></div>
            <label htmlFor="" className='block my-2 font-medium px-1'>Your Todos</label>
            {todos
                .filter(todo => (showFinished ? true : !todo.finished))
                .map(todo => (
                    <div key={todo.id} className='flex items-center'>
                        <input type="checkbox" checked={todo.finished} onChange={() => toggleTodoFinished(todo.id)} className='mr-2' />
                        <div className={`w-3/4 ${todo.finished ? 'line-through' : ''}`}>{todo.text}</div>
                        <div className='w-1/4 flex items-center'>
                            <button onClick={() => handleEdit(todo.id)} className='text-center bg-blue-700 text-xs m-1 p-1 px-2 rounded-full hover:bg-blue-800'><FaEdit /></button>
                            <button onClick={() => handleDelete(todo.id)} className='text-center bg-blue-700 text-xs m-1 p-1 px-2 rounded-full hover:bg-blue-800'><MdDelete /></button>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default TodoCard;
