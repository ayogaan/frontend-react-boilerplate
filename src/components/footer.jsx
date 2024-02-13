import React from 'react';

const Footer = () => {
    return (
    <footer className="bg-white-500 text-gray-600 py-4 border">
        <div className="w-10/12 mx-auto">
        <div className="flex justify-between items-center">
            <div>
            <h2 className="text-2xl font-bold">Your Company Name</h2>
            <p className="text-sm">A brief description of your company.</p>
            </div>
            <div>
            <ul className="flex space-x-4">
                <li><a href="#" className="hover:text-gray-300">Home</a></li>
                <li><a href="#" className="hover:text-gray-300">About</a></li>
                <li><a href="#" className="hover:text-gray-300">Services</a></li>
                <li><a href="#" className="hover:text-gray-300">Contact</a></li>
            </ul>
            </div>
        </div>
        </div>
    </footer>
    );
};

export default Footer;

