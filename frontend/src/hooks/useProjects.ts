import { useState, useEffect } from "react";
import type { Project } from "../types/DataTypes";

interface UseProjectsReturn {
  projects: Project[];
  loading: boolean;
  error: string | null | undefined;
  refetch: () => Promise<void>;
}

const useProjects = (): UseProjectsReturn => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const url = import.meta.env.VITE_API_URL;

  const fetchProjects = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${url ? url : "http://localhost:3000/"}api/v1/projects`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setProjects(result.data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, loading, error, refetch: fetchProjects };
};

export default useProjects;
