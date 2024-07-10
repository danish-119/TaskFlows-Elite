import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-blue-800 text-white py-8">
            <div className="container mx-auto px-4 flex flex-wrap justify-between">
                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                    <h3 className="text-lg font-semibold mb-2">About Us</h3>
                    <p className="text-sm w-3/4">Taskflow is your ultimate tool for managing daily tasks efficiently and effectively.</p>
                </div>
                <div className="w-full md:w-1/4 mb-6 md:mb-0 text-center md:text-left">
                    <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                    <p className="text-sm">Email: support@taskflow.com</p>
                    <p className="text-sm">Phone: (123) 456-7890</p>
                </div>
                <div className="w-full md:w-1/4 mb-6 md:mb-0 text-center md:text-left">
                    <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                    <p className="text-sm">
                        <a href="#" className="hover:underline">Facebook |</a>
                        <a href="#" className="hover:underline mx-2"> Twitter |</a>
                        <a href="#" className="hover:underline">Instagram</a>
                    </p>
                </div>
                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                    <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                    <ul className="text-sm">
                        <li className="mb-1"><a href="#home" className="hover:underline">Home</a></li>
                        <li className="mb-1"><a href="#tasks" className="hover:underline">Tasks</a></li>
                        <li className="mb-1"><a href="#completed" className="hover:underline">Completed</a></li>
                        <li className="mb-1"><a href="#settings" className="hover:underline">Settings</a></li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-4 text-center mt-8">
                <p className="text-sm">&copy; 2024 Taskflow <sup>Elite</sup>. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
