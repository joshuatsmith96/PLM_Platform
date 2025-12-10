import { useState, useEffect } from "react";

export default function useStageDetails(projectId: string) {
  const [stageDetails, setStageDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!projectId) return;

    const fetchStageDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `http://localhost:3000/api/v1/stages/project/${projectId}`
        );

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to fetch stage details");
        }

        const data = await res.json();
        setStageDetails(data.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStageDetails();
  }, [projectId]);

  return { stageDetails, loading, error };
}
