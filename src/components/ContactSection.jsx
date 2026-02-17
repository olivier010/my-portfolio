import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  Mail, MapPin, Phone, Send, CheckCircle, XCircle, 
  ChevronDown, ChevronUp, MessageSquare, X, Copy, 
  Github, Linkedin, Twitter, Mail as MailIcon, Loader2 
} from 'lucide-react';

const ContactSection = () => {
    const form = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState({ success: null, message: '' });
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState('form'); // 'form' or 'info'
    const [formData, setFormData] = useState({
      from_name: '',
      from_email: '',
      subject: '',
      message: ''
    });
    const [errors, setErrors] = useState({});
    const [charCount, setCharCount] = useState(0);
    const maxCharCount = 500;

    const validateForm = () => {
      const newErrors = {};
      let isValid = true;

      if (!formData.from_name.trim()) {
        newErrors.from_name = 'Name is required';
        isValid = false;
      }

      if (!formData.from_email.trim()) {
        newErrors.from_email = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.from_email)) {
        newErrors.from_email = 'Email is invalid';
        isValid = false;
      }

      if (!formData.message.trim()) {
        newErrors.message = 'Message is required';
        isValid = false;
      }

      setErrors(newErrors);
      return isValid;
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      
      if (name === 'message') {
        setCharCount(value.length);
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    };

    const sendEmail = (e) => {
      e.preventDefault();
      
      if (!validateForm()) return;
      
      setIsSubmitting(true);

      const serviceId = 'service_qw5mhke';
      const templateId = 'template_y5f8vzi';
      const publicKey = 'R6Xu2nLlNahrP19uD';

        emailjs.sendForm(serviceId, templateId, form.current, publicKey)
            .then((result) => {
                console.log(result.text);
                setStatus({
                    success: true,
                    message: 'Your message has been sent successfully! I\'ll get back to you soon.'
                });
                form.current.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
                setStatus({
                    success: false,
                    message: 'Something went wrong. Please try again later or email me directly.'
                });
            })
            .finally(() => {
                setIsSubmitting(false);
                // Clear status after 5 seconds
                setTimeout(() => {
                    setStatus({ success: null, message: '' });
                }, 5000);
            });
    };

    // Auto-close success message after 5 seconds
    useEffect(() => {
        if (status.message) {
            const timer = setTimeout(() => {
                setStatus({ success: null, message: '' });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    return (
        <section id="contact" className="py-12 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
            <div className="container mx-auto px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8 cursor-pointer"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="inline-flex items-center space-x-2">
                        <MessageSquare className="w-5 h-5 text-blue-400" />
                        <h2 className="text-2xl font-bold text-white">Get In Touch</h2>
                        {isExpanded ? 
                            <ChevronUp className="w-5 h-5 text-blue-400" /> : 
                            <ChevronDown className="w-5 h-5 text-blue-400" />
                        }
                    </div>
                </motion.div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                                {/* Tabs */}
                                <div className="flex mb-6 border-b border-white/20">
                                    <button
                                        onClick={() => setActiveTab('form')}
                                        className={`px-4 py-2 font-medium ${activeTab === 'form' ? 'text-white border-b-2 border-blue-400' : 'text-blue-200 hover:text-white'}`}
                                    >
                                        Send Message
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('info')}
                                        className={`px-4 py-2 font-medium ${activeTab === 'info' ? 'text-white border-b-2 border-blue-400' : 'text-blue-200 hover:text-white'}`}
                                    >
                                        Contact Info
                                    </button>
                                    <button 
                                        onClick={() => setIsExpanded(false)}
                                        className="ml-auto text-blue-200 hover:text-white"
                                        aria-label="Close"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Contact Info Tab */}
                                <AnimatePresence mode="wait">
                                    {activeTab === 'info' && (
                                        <motion.div
                                            key="info"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.2 }}
                                            className="space-y-6"
                                        >
                                            <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
                                                <div className="p-2 bg-blue-600/20 rounded-lg text-blue-300 group-hover:bg-blue-500/30 transition-colors">
                                                    <MailIcon className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-blue-100">Email</h3>
                                                    <div className="flex items-center justify-between">
                                                        <a href="mailto:your.email@example.com" className="text-blue-300 hover:text-white text-sm transition-colors">
                                                            oliviernsengiyumva010@gmail.com
                                                        </a>
                                                        <button 
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                navigator.clipboard.writeText('oliviernsengiyumva010@gmail.com');
                                                                // Optional: Add a toast notification here
                                                            }}
                                                            className="text-blue-400 hover:text-blue-200 transition-colors p-1 -mr-2"
                                                            title="Copy to clipboard"
                                                        >
                                                            <Copy className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
                                                <div className="p-2 bg-blue-600/20 rounded-lg text-blue-300 group-hover:bg-blue-500/30 transition-colors">
                                                    <Phone className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-blue-100">Phone</h3>
                                                    <div className="flex items-center">
                                                        <a href="tel:+1234567890" className="text-blue-300 hover:text-white text-sm transition-colors">
                                                            +(250) 791-839-279
                                                        </a>
                                                        <button 
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                navigator.clipboard.writeText('+250791839279');
                                                                // Optional: Add a toast notification here
                                                            }}
                                                            className="text-blue-400 hover:text-blue-200 transition-colors p-1 -mr-2 ml-2"
                                                            title="Copy to clipboard"
                                                        >
                                                            <Copy className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                                <div className="p-2 bg-blue-600/20 rounded-lg text-blue-300">
                                                    <MapPin className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-blue-100">Location</h3>
                                                    <p className="text-blue-300 text-sm">Kigali, Rwanda</p>
                                                </div>
                                            </div>

                                            <div className="pt-4">
                                                <h3 className="text-sm font-medium text-blue-100 mb-3">Connect with me</h3>
                                                <div className="flex space-x-3">
                                                    <a 
                                                        href="https://github.com/olivier010"
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="p-2 bg-white/10 hover:bg-blue-600/30 rounded-lg text-blue-200 hover:text-white transition-colors"
                                                        aria-label="GitHub"
                                                    >
                                                        <Github className="w-5 h-5" />
                                                    </a>
                                                    <a 
                                                        href="https://linkedin.com/in/yourusername" 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="p-2 bg-white/10 hover:bg-blue-600/30 rounded-lg text-blue-200 hover:text-white transition-colors"
                                                        aria-label="LinkedIn"
                                                    >
                                                        <Linkedin className="w-5 h-5" />
                                                    </a>
                                                    <a 
                                                        href="https://twitter.com/yves_olly_" 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="p-2 bg-white/10 hover:bg-blue-600/30 rounded-lg text-blue-200 hover:text-white transition-colors"
                                                        aria-label="Twitter"
                                                    >
                                                        <Twitter className="w-5 h-5" />
                                                    </a>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Contact Form Tab */}
                                <AnimatePresence mode="wait">
                                    {activeTab === 'form' && (
                                        <motion.div
                                            key="form"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {status.message && (
                                                <motion.div 
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className={`mb-6 p-4 rounded-lg ${status.success ? 'bg-green-500/20 text-green-100' : 'bg-red-500/20 text-red-100'}`}
                                                >
                                                    <div className="flex items-start">
                                                        {status.success ? (
                                                            <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                                                        ) : (
                                                            <XCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                                                        )}
                                                        <span className="text-sm">{status.message}</span>
                                                    </div>
                                                </motion.div>
                                            )}

                                            <form ref={form} onSubmit={sendEmail} className="space-y-4">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="from_name"
                                                            value={formData.from_name}
                                                            onChange={handleInputChange}
                                                            className={`w-full px-4 py-2.5 bg-white/5 border ${
                                                              errors.from_name ? 'border-red-500' : 'border-white/10'
                                                            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white placeholder-blue-300/70 text-sm transition-colors`}
                                                            placeholder="Your Name *"
                                                        />
                                                        {errors.from_name && (
                                                          <p className="mt-1 text-xs text-red-400">{errors.from_name}</p>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="email"
                                                            name="from_email"
                                                            value={formData.from_email}
                                                            onChange={handleInputChange}
                                                            className={`w-full px-4 py-2.5 bg-white/5 border ${
                                                              errors.from_email ? 'border-red-500' : 'border-white/10'
                                                            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white placeholder-blue-300/70 text-sm transition-colors`}
                                                            placeholder="Email Address *"
                                                        />
                                                        {errors.from_email && (
                                                          <p className="mt-1 text-xs text-red-400">{errors.from_email}</p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div>
                                                    <input
                                                        type="text"
                                                        name="subject"
                                                        value={formData.subject}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white placeholder-blue-300/70 text-sm transition-colors"
                                                        placeholder="Subject (Optional)"
                                                    />
                                                </div>

                                                <div className="relative">
                                                    <textarea
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleInputChange}
                                                        rows="3"
                                                        className={`w-full px-4 py-2.5 bg-white/5 border ${
                                                          errors.message ? 'border-red-500' : 'border-white/10'
                                                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white placeholder-blue-300/70 text-sm transition-colors resize-none pr-16`}
                                                        placeholder="Your Message *"
                                                        maxLength={maxCharCount}
                                                    ></textarea>
                                                    <div className="absolute bottom-2 right-2 text-xs text-blue-300/70">
                                                      {charCount}/{maxCharCount}
                                                    </div>
                                                    {errors.message && (
                                                      <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                                                    )}
                                                </div>

                                                <div className="pt-1">
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className={`w-full flex items-center justify-center px-6 py-2.5 rounded-lg text-sm font-medium ${
                                                            isSubmitting 
                                                                ? 'bg-blue-500/50 cursor-not-allowed' 
                                                                : 'bg-blue-600 hover:bg-blue-500 shadow-lg hover:shadow-blue-500/30'
                                                        } text-white transition-all duration-300`}
                                                    >
                                                        {isSubmitting ? (
                                                            <>
                                                                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                                                                Sending...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Send className="w-4 h-4 mr-2" />
                                                                Send Message
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </form>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default ContactSection;
