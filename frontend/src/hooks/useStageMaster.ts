import { useState, useEffect } from "react";

export default function useStageMaster() {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStages = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("http://localhost:3000/api/v1/stage-master");

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Failed to fetch stage master data");
        }

        const data = await res.json();
        setStages(data.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStages();
  }, []);

  return { stages, loading, error };
}
