import { useState, useEffect } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  const handleCalculate = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    });
    const data = await res.json();
    setResult(data.result);
    fetchHistory();
  };

  const fetchHistory = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/history`);
    const data = await res.json();
    setHistory(data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>AI Calculator</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter math or natural query"
      />
      <button onClick={handleCalculate}>Calculate</button>
      <h2>Result: {result}</h2>
      <h3>History</h3>
      <ul>
        {history.map((item, idx) => (
          <li key={idx}>{item.input} = {item.result}</li>
        ))}
      </ul>
    </div>
  );
}
