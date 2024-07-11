import React from 'react';
import TodoCard from './TodoCard';

const Main = () => {
    return (
        <main className='h-screen flex justify-center relative'>
            <img className='absolute top-0 left-0 -z-10 w-full' src="https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-8217.jpg" alt="" />
            <TodoCard/>
        </main>
    );
};

export default Main;