import { useState } from "react";

interface UpdateProjectData {
  project_name?: string;
  project_team_lead?: string;
  project_lead_department?: string;
  project_poc_email?: string;
  project_poc_phone?: string;
  project_current_stage?: string;
  project_critical_status?: string;
  project_lifecycle_type?: string;
  project_next_required_action?: string;
}

interface UseUpdateProjectReturn {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateProject: (projectId: string, data: UpdateProjectData) => Promise<any>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const useUpdateProject = (): UseUpdateProjectReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const updateProject = async (
    projectId: string,
    data: UpdateProjectData
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/projects/${projectId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setSuccess(true);
      return result.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error updating project:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateProject, loading, error, success };
};

export default useUpdateProject;
