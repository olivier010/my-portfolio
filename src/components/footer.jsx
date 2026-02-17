
// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    © {currentYear} Yves Olivier. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
