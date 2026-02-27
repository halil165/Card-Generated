import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();
  const text = `© ${year} Generator Kartu NRG & NUPTK By Hayyan-Tec Production`;

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-2 overflow-hidden z-[100] shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="whitespace-nowrap flex group">
        <div className="animate-marquee inline-block px-4">
          <span className="text-blue-600 font-bold mx-8 italic text-sm">
            {text}
          </span>
          <span className="text-blue-600 font-bold mx-8 italic text-sm">
            {text}
          </span>
        </div>
        <div className="animate-marquee inline-block px-4" aria-hidden="true">
          <span className="text-blue-600 font-bold mx-8 italic text-sm">
            {text}
          </span>
          <span className="text-blue-600 font-bold mx-8 italic text-sm">
            {text}
          </span>
        </div>
      </div>
    </footer>
  );
}
