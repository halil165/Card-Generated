import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Generator Kartu NRG & NUPTK.</p>
        <p className="mt-2 text-xs">
          Dibuat dengan React, Tailwind CSS, dan Client-Side PDF Generation.
          <br />
          Data Anda diproses secara lokal di browser dan tidak disimpan di server.
        </p>
      </div>
    </footer>
  );
}
