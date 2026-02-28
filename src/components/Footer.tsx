import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-600">
          © {year} Generator Kartu NRG & NUPTK By Hayyan-Tec Production.
        </p>
        <p className="text-center text-xs text-gray-500 mt-1">
          <strong>Privasi Terjamin:</strong> Aplikasi ini berjalan sepenuhnya di browser Anda. Data tidak pernah dikirim atau disimpan di server.
        </p>
      </div>
    </footer>
  );
}
