import React, { useRef, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import emailjs from 'emailjs-com';

function Contact() {
    const form = useRef();
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID, //service ID
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // template ID
            form.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY // replace with your EmailJS user ID (public key)
        ).then(() => {
            setSent(true);
            setLoading(false);
        }, (err) => {
            setError("Failed to send. Please try again.");
            setLoading(false);
        });
    };

    return (
        <section id="contact" className="py-12 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-lg mx-auto px-4">
                <h2 className="text-3xl font-bold text-blue-600 dark:text-white mb-8 text-center">
                    Contact Me
                </h2>
                <form
                    ref={form}
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex flex-col gap-4"
                >
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
                    <textarea
                        name="message"
                        placeholder="Message"
                        rows={5}
                        className="border border-gray-300 dark:border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                        required
                    />
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Message"} <SendIcon fontSize="small" />
                    </button>
                    {sent && <p className="text-green-600 mt-2 text-center">Message sent successfully!</p>}
                    {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
                </form>
            </div>
        </section>
    );
}

export default Contact;