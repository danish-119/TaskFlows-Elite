import React from 'react';
import TodoCard from './TodoCard';

const Main = () => {
    return (
        <main className='h-screen flex justify-center relative'>
            <img className='absolute top-0 left-0 -z-10 w-full' src="https://img.lovepik.com/background/20211021/large/lovepik-blue-background-of-science-and-technology-image_500486349.jpg" alt="" />
            <TodoCard/>
        </main>
    );
};

export default Main;