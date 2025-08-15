import React, { useEffect, useState } from 'react';

const Home = () => {
    const fullText = "Hi, my name is Yves";
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        let i = 0;
        setDisplayText("");
        const interval = setInterval(() => {
            setDisplayText(fullText.slice(0, i + 1));
            i++;
            if (i === fullText.length) clearInterval(interval);
        }, 80);
        return () => clearInterval(interval);
    }, []);

    // Split the displayText so 'Yves' is blue
    const name = "Yves";
    const nameIndex = displayText.indexOf(name);
    const beforeName = nameIndex !== -1 ? displayText.slice(0, nameIndex) : displayText;
    const typedName = nameIndex !== -1 ? displayText.slice(nameIndex) : "";

    return (
        <section
            id="home"
            className="pt-24 min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 text-center px-4"
        >
            <img
                src="/yvs.jpg"
                alt="Avatar"
                className="w-32 h-32 rounded-full shadow-lg border-4 border-blue-500 mb-6 object-cover"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white min-h-[3rem]">
                {beforeName}
                <span className="text-blue-600">{typedName}</span>
                <span className="animate-blink">|</span>
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 max-w-xl">
                Frontend & Backend Developer, Graphic Designer, and Tech Enthusiast
            </p>
            <style>{`
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
                .animate-blink {
                    display: inline-block;
                    width: 1ch;
                    animation: blink 1s steps(1) infinite;
                }
            `}</style>
        </section>
    );
};

export default Home;
