import React from 'react';

export default function Export() {
  const handleExport = () => {
    window.open('http://localhost:3001/api/export', '_blank');
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Export Data</h1>
      <button onClick={handleExport} className="bg-green-600 text-white px-4 py-2 rounded">Download Excel</button>
    </div>
  );
}