import React from 'react';
import { CreditCard, GraduationCap } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-none">
                Generator Kartu
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                NRG & NUPTK Digital
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <CreditCard size={16} />
              Format Resmi
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
