import React, { useState } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-50 text-indigo-600 rounded-full mb-4">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Frontend Setup Complete</h1>
        <p className="text-gray-600 mb-6">
          Vite, React, Tailwind CSS, and Lucide React are configured and ready to build upon.
        </p>

        <div className="flex justify-center items-center gap-4 mb-8">
          <button
            onClick={() => setCount((c) => c + 1)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-sm"
          >
            Count is: {count}
          </button>
        </div>

        <div className="inline-flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-1.5 rounded-md border border-green-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>Ready for development</span>
        </div>
      </div>
    </main>
  );
}

