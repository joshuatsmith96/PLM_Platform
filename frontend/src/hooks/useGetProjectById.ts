import { useState, useEffect } from "react";
import type { Project } from "../types/DataTypes";

interface UseGetProjectByIdReturn {
  project: Project | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const useGetProjectById = (id: string | undefined): UseGetProjectByIdReturn => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const url = import.meta.env.VITE_API_URL;

  const fetchProject = async (): Promise<void> => {
    if (!id) {
      setError("No project ID provided");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${url ? url : "http://localhost:3000/"}api/v1/projects/${id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setProject(result.data || null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error fetching project:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]); // re-run if the ID changes

  return { project, loading, error, refetch: fetchProject };
};

export default useGetProjectById;
