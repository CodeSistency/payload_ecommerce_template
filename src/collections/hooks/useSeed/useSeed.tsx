import { useState } from 'react';
import { Payload } from 'payload';
import { generateSeedData, resetCollections } from './generateSeedData';

const useSeed = (payload: Payload) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const seedData = async (productType: string, force: boolean = false) => {
    setLoading(true);
    setError(null);
    try {
      const response = await generateSeedData(payload, productType, force);
      setResult(response);
    } catch (err) {
        if (err instanceof Error) {
            setError('Failed to reset data: ' + err.message);
          } else {
            setError('An unknown error occurred');
          }
    } finally {
      setLoading(false);
    }
  };

  const resetData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await resetCollections(payload);
      setResult(response);
    } catch (err) {
        if (err instanceof Error) {
            setError('Failed to reset data: ' + err.message);
          } else {
            setError('An unknown error occurred');
          }
    } finally {
      setLoading(false);
    }
  };

  return { seedData, resetData, loading, error, result };
};

export default useSeed;