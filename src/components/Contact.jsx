import React, { useRef, useState, useEffect } from "react";
import SendIcon from '@mui/icons-material/Send';
import emailjs from '@emailjs/browser';

function Contact() {
    const form = useRef();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
                setStatus("");
            }, 4000); // 4 seconds

            return () => clearTimeout(timer); // cleanup if component unmounts or message changes
        }
    }, [message]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        emailjs.sendForm(
            "service_qw5mhke",
            "template_y5f8vzi",
            form.current,
            "R6Xu2nLlNahrP19uD"
        )
        .then(() => {
            setLoading(false);
            setStatus("success");
            setMessage("Message sent successfully!");
            form.current.reset();
        })
        .catch((err) => {
            setLoading(false);
            setStatus("error");
            setMessage("Failed to send message. Please try again.");
            console.error("EmailJS error:", err);
        });
    };

    return (
        <section id="contact" className="py-12 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-lg mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    Contact Me
                </h2>
                <form
                    ref={form}
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex flex-col gap-4"
                >
                    {/* Inputs */}
                    <input
                        type="text"
                        name="user_name"
                        placeholder="Full Name"
                        className="border border-gray-300 dark:border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                        required
                    />
                    <input
                        type="email"
                        name="user_email"
                        placeholder="Email"
                        className="border border-gray-300 dark:border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                        required
                    />
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        className="border border-gray-300 dark:border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Message"
                        rows={5}
                        className="border border-gray-300 dark:border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                        required
                    />
                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-6 py-2 rounded transition ${
                            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                        }`}
                    >
                        {loading ? "Sending..." : "Send Message"} <SendIcon fontSize="small" />
                    </button>

                    {/* Notification */}
                    {message && (
                        <p
                            className={`text-sm mt-2 text-center font-medium ${
                                status === "success" ? "text-green-600" : "text-red-500"
                            }`}
                        >
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
}

export default Contact;
