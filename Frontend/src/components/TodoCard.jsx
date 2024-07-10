import { stringify } from 'postcss';
import React, { useRef, useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TodoCard = () => {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [showFinished, setShowFinished] = useState(false);
    const [editingTodoId, setEditingTodoId] = useState(null);
    let inputTodo = useRef();

    useEffect(() => {
        if (editingTodoId !== null) {
            const todoToEdit = todos.find(todo => todo.id === editingTodoId);
            if (todoToEdit) {
                inputTodo.current.value = todoToEdit.text;
            }
        }
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [editingTodoId, todos]);

    const handleSave = () => {
        if (editingTodoId !== null) {
            setTodos(todos.map(todo =>
                todo.id === editingTodoId ? { ...todo, text: inputTodo.current.value } : todo
            ));
            setEditingTodoId(null);
        } else {
            const newTodo = {
                id: Date.now(),
                text: inputTodo.current.value,
                finished: false,
            };
            setTodos([...todos, newTodo]);
        }
        inputTodo.current.value = "";
    };

    const handleEdit = (id) => {
        setEditingTodoId(id);
        inputTodo.current.select();
    };

    const handleDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleToggleFinished = () => {
        setShowFinished(!showFinished);
    };

    const toggleTodoFinished = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, finished: !todo.finished } : todo
        ));
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
