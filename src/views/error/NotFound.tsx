import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <main className="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8 bg-aha-green-light text-white">
            <div className="text-center">
                <h2 className="self-center font-bold text-white text-2xl">404 - Not Found</h2>
                <p>Sorry, the page you are looking for does not exist.</p>
                <Link to="/">Go back to the homepage</Link>
            </div>
        </main>
    );
};

export default NotFound;
