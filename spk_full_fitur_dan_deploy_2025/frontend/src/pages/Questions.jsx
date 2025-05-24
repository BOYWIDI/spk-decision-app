import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Questions() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/questions')
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Questions</h1>
      <ol className="list-decimal ml-5">
        {questions.map(q => (
          <li key={q.id}>{q.text}</li>
        ))}
      </ol>
    </div>
  );
}