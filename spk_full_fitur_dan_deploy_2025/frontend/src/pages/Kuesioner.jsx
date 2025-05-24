import React, { useState } from 'react';
import axios from 'axios';

export default function Kuesioner() {
  const [userId, setUserId] = useState('');
  const [responses, setResponses] = useState('');

  const handleSubmit = () => {
    axios.post('http://localhost:3001/api/kuesioner', {
      userId: parseInt(userId),
      responses: responses.split(',')
    }).then(res => alert('Berhasil disimpan'))
      .catch(err => console.error(err));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Isi Kuesioner</h1>
      <input type="text" placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} className="border p-1 mr-2" />
      <input type="text" placeholder="Jawaban (pisahkan koma)" value={responses} onChange={e => setResponses(e.target.value)} className="border p-1 mr-2" />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-3 py-1">Kirim</button>
    </div>
  );
}