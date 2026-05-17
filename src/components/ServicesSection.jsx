import { Code2, Database, Smartphone, PenTool, Rocket, Cloud } from 'lucide-react';
import SectionHeading from './SectionHeading';

const services = [
    {
        icon: Code2,
        title: 'Frontend Development',
        description: 'I create responsive and interactive user interfaces using React, Next.js, Tailwind CSS, and modern libraries.',
    },
    {
        icon: Database,
        title: 'Backend Development',
        description: 'I build robust APIs and backend systems using Node.js, Express.js, and databases like MongoDB.',
    },
    {
        icon: Smartphone,
        title: 'Responsive Design',
        description: 'I build fully responsive websites that work perfectly on all devices and provide great user experience.',
    },
    {
        icon: PenTool,
        title: 'UI/UX Design',
        description: 'I design clean, modern, and user-friendly interfaces focused on usability and aesthetics.',
    },
    {
        icon: Rocket,
        title: 'Performance Optimization',
        description: 'I optimize websites for speed, performance, and SEO to improve ranking and user satisfaction.',
    },
    {
        icon: Cloud,
        title: 'Deployment & Hosting',
        description: 'I deploy web applications to modern hosting platforms like Vercel, Netlify, and AWS for reliability.',
    },
];

const ServicesSection = () => {
    return (
        <section id="services" className="py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-[#050316] text-gray-900 dark:text-white">
            <div className="container mx-auto px-4">
                <div className="mb-14">
                    {/* Section heading component */}
                    <SectionHeading
                        eyebrow="My Services"
                        title={<>What I <span className="text-current">Do</span></>}
                        subtitle={"I help businesses and individuals bring their ideas to life through modern, scalable, and beautiful web solutions."}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto">
                    {services.map((service) => {
                        const Icon = service.icon;

                        return (
                            <article
                                key={service.title}
                                className="group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm dark:border-white/5 dark:bg-white/5 dark:shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:dark:shadow-[0_0_40px_rgba(124,58,237,0.12)]"
                            >
                                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-600 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-300 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:dark:scale-110">
                                    <Icon size={28} strokeWidth={1.9} />
                                </div>

                                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-violet-200">
                                    {service.title}
                                </h3>

                                <p className="text-sm leading-6 text-gray-600 dark:text-slate-300">
                                    {service.description}
                                </p>

                                <button className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-violet-400 transition-colors duration-300 group-hover:text-blue-700 dark:group-hover:text-violet-200">
                                    Learn more
                                    <span className="transition-transform duration-300 group-hover:translate-x-1 text-current">
                                        →
                                    </span>
                                </button>
                            </article>
                        );
                    })}
                </div>

                <div className="mt-14 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:gap-6">
                    <div className="h-px w-24 bg-violet-500/40"></div>
                    <p className="text-sm text-slate-300">
                        Have a project in mind? Let’s work together!
                    </p>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:scale-105 hover:shadow-violet-500/40"
                    >
                        Get in Touch
                        <span>→</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;