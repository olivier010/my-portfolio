import React, { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const ScrollControls = () => {
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setCanScrollUp(y > 50);
      setCanScrollDown(y < Math.max(0, max - 50));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  const showUp = canScrollUp;
  const available = canScrollUp || canScrollDown;

  const handleClick = () => {
    if (canScrollUp) scrollToTop();
    else scrollToBottom();
  };

  return (
    <div className="fixed right-6 bottom-28 z-50 flex flex-col items-center">
      <button
        onClick={handleClick}
        aria-label={showUp ? 'Scroll to top' : 'Scroll to bottom'}
        title={showUp ? 'Scroll to top' : 'Scroll to bottom'}
        disabled={!available}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-200 ${
          available ? 'opacity-100' : 'opacity-40 pointer-events-none'
        } bg-indigo-600 hover:scale-105 text-white dark:bg-indigo-500`}
      >
        {showUp ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
    </div>
  );
};

export default ScrollControls;
