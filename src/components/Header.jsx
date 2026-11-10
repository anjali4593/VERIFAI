import React from 'react';
import { Layers } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-6 h-6 text-indigo-600" />
          <span className="font-semibold text-lg text-gray-900">Mini Project</span>
        </div>
        <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-medium">
          React + Vite + Tailwind
        </span>
      </div>
    </header>
  );
}

