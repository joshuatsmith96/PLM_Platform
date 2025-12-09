import { useState } from "react";

interface UseDeleteProjectReturn {
  deleteProject: (id: string | undefined) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const useDeleteProject = (): UseDeleteProjectReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const url = import.meta.env.VITE_API_URL;

  const deleteProject = async (id: string | undefined): Promise<void> => {
    if (!id) {
      setError("No project ID provided");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(
        `${url ? url : "http://localhost:3000/"}api/v1/projects/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSuccess(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error deleting project:", err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteProject, loading, error, success };
};

export default useDeleteProject;
