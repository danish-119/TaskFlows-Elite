import { useRef, useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TodoCard = () => {
    const [todos, setTodos] = useState([]);
    const [showFinished, setShowFinished] = useState(false);
    const [editingTodoId, setEditingTodoId] = useState(null);
    const inputTodo = useRef();

    useEffect(() => {
        fetchTodos();
    });

    const fetchTodos = async () => {
        try {
            const response = await fetch('http://localhost:3000/taskflows');
            if (!response.ok) {
                throw new Error(response.data);
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
                    throw new Error(response.data);
                }
                fetchTodos();
            }
            inputTodo.current.value = '';
        } catch (error) {
            console.error('Error saving todo:', error.message);
        }
    };

    const handleEdit = (id) => {
        setEditingTodoId(id);
        const todoToEdit = todos.find(todo => todo._id === id);
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
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error.message);
        }
    };

    const toggleTodoFinished = async (id) => {
        try {
            const todoToUpdate = todos.find(todo => todo._id === id);
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
                todo._id === id ? updatedTodo : todo
            ));
        } catch (error) {
            console.error('Error updating todo:', error.message);
        }
    };

    const handleToggleFinished = () => {
        setShowFinished(!showFinished);
    };

    return (
        <div className='taskflows-container  h-5/6 w-1/3 m-28 rounded-lg p-5'>
            <h2 className='taskflows-title text-3xl font-bold mb-4 text-center'>TaskFlows - Your Personal Task Organizer</h2>
            <label htmlFor="" className='taskflows-label block mb-2 font-bold mx-2'>Add your Todo</label>
            <input ref={inputTodo} type="text" className='taskflows-input border border-gray-300 px-3 py-2 rounded-lg mb-2 focus:outline-none focus:border-blue-500 w-10/12 mx-1' spellCheck='false' />
            <button onClick={handleSave} className='taskflows-button bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>
                {editingTodoId !== null ? 'Save' : 'Add'}
            </button>
            <div className='taskflows-checkbox mt-4'>
                <input type="checkbox" checked={showFinished} onChange={handleToggleFinished} className='form-checkbox h-5 w-5 text-blue-500' />
                <label className='ml-2'>Show Finished</label>
            </div>
            <div className='taskflows-divider border-b border-gray-300 my-4'></div>
            <label htmlFor="" className='taskflows-label block font-bold mb-2'>Your Todos</label>
            {todos
                .filter(todo => (showFinished ? true : !todo.finished))
                .map(todo => (
                    <div key={todo._id} className='task flex items-center mb-2'>
                        <input type="checkbox" checked={todo.finished} onChange={() => toggleTodoFinished(todo._id)} className='form-checkbox h-5 w-5 text-blue-500' />
                        <div className={`task-text ml-2 ${todo.finished ? 'line-through text-gray-500' : ''}`}>{todo.text}</div>
                        <div className='task-buttons ml-auto'>
                            <button onClick={() => handleEdit(todo._id)} className='task-button-edit mx-3 text-blue-500 hover:text-blue-600'>
                                <FaEdit style={{ fontSize: '1.5em' }} />
                            </button>
                            <button onClick={() => handleDelete(todo._id)} className='task-button-delete text-red-500 hover:text-red-600'>
                                <MdDelete style={{ fontSize: '1.5em' }} />
                            </button>

                        </div>
                    </div>
                ))}
        </div>

    );
};

export default TodoCard;
