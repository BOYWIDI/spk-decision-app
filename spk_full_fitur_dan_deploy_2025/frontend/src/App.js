import React, { useEffect, useState } from "react";

const API = "http://localhost:3001/api";

function App() {
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    fetch(API + "/users").then(res => res.json()).then(setUsers);
    fetch(API + "/questions").then(res => res.json()).then(setQuestions);
  }, []);

  const handleSubmit = () => {
    fetch(API + "/kuesioner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: parseInt(selectedUser),
        answers: questions.map(q => answers[q.id] || "")
      })
    }).then(() => alert("Jawaban disimpan"));
  };

  const handleExport = () => {
    window.open(API + "/export/hasil", "_blank");
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-xl font-bold mb-4">Kuesioner</h1>
      <select className="border p-2 mb-4" onChange={(e) => setSelectedUser(e.target.value)}>
        <option value="">Pilih Pengguna</option>
        {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
      </select>
      <div className="space-y-2 mb-4">
        {questions.map(q => (
          <div key={q.id}>
            <label className="block">{q.text}</label>
            <input className="border p-1 w-full"
              onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
            />
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 mr-2 rounded">Kirim</button>
      <button onClick={handleExport} className="bg-green-500 text-white px-4 py-2 rounded">Export Excel</button>
    </div>
  );
}

export default App;