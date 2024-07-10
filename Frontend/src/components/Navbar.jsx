import React from 'react';

const Navbar = () => {
    return (
        <nav className='bg-blue-800 h-16 text-white py-4 px-6 flex justify-between items-center'>
            <h1 className='text-3xl'>TaskFlows <sup className='small-sup'>Elite</sup></h1>
            <ul className='flex space-x-6'>
                <li><a href="#home">Home</a></li>
                <li><a href="#tasks">Tasks</a></li>
                <li><a href="#completed">Completed</a></li>
                <li><a href="#settings">Settings</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;