import React from 'react';

const SectionHeading = ({ eyebrow, title, subtitle, id }) => {
  return (
    <div id={id} className="max-w-3xl mx-auto text-center mb-10">
      {eyebrow && (
        <p className="tracking-[0.35em] text-sm font-semibold uppercase text-blue-600 dark:text-violet-300 mb-4">
          {eyebrow}
        </p>
      )}

      <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-violet-300 dark:to-violet-500">
        {title}
      </h2>

      {subtitle && (
        <p className="text-sm md:text-base text-gray-600 dark:text-slate-300 leading-relaxed">
          {subtitle}
        </p>
      )}

      <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
    </div>
  );
};

export default SectionHeading;
