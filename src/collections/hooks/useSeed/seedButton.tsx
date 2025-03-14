"use client"

import { useState } from "react";

const SeedButton: React.FC = () => {
  const [productType, setProductType] = useState('clothes');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSeed = (force: boolean) => {
    setLoading(true);
    setError(null);
    fetch('/api/next/seed', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'seed', productType, force }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
      })
      .catch((err) => {
        setError('Failed to seed data: ' + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data except the admin user?')) {
      setLoading(true);
      setError(null);
      fetch('/api/next/seed', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reset' }),
      })
        .then((res) => res.json())
        .then((data) => {
          setResult(data);
        })
        .catch((err) => {
          setError('Failed to reset data: ' + err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Seed Database</h3>
      <select
        value={productType}
        onChange={(e) => setProductType(e.target.value)}
        disabled={loading}
      >
        <option value="clothes">Clothes</option>
        <option value="donuts">Donuts</option>
        <option value="pets">Pets</option>
        <option value="cars">Cars</option>
      </select>
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => handleSeed(false)} disabled={loading} style={{ marginRight: '10px' }}>
          {loading ? 'Seeding...' : 'Seed Data'}
        </button>
        <button onClick={() => handleSeed(true)} disabled={loading} style={{ marginRight: '10px' }}>
          {loading ? 'Forcing...' : 'Force Seed'}
        </button>
        <button onClick={handleReset} disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Data'}
        </button>
      </div>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      {result && <p style={{ color: 'green', marginTop: '10px' }}>{result.message}</p>}
    </div>
  );
};

export default SeedButton;