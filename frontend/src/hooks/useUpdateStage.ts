import { useState } from "react";

interface UpdateStageDetailData {
  project_stage_status?: string;
  project_stage_notes?: string;
  project_stage_attachment_links?: string[];
}

interface UseUpdateStageDetailReturn {
  updateStageDetail: (
    stageDetailId: string,
    data: UpdateStageDetailData
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<any>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const useUpdateStageDetail = (): UseUpdateStageDetailReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const updateStageDetail = async (
    stageDetailId: string,
    data: UpdateStageDetailData
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> => {
    console.log("useUpdateStageDetail - stageDetailId:", stageDetailId);
    console.log("useUpdateStageDetail - data:", data);

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/stages/${stageDetailId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        // Try to get the error message from the response
        const errorData = await response.json().catch(() => null);
        console.log("Error response data:", errorData);

        const errorMessage =
          errorData?.error ||
          errorData?.message ||
          `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("Success result:", result);
      setSuccess(true);
      return result.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error updating stage detail:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateStageDetail, loading, error, success };
};

export default useUpdateStageDetail;
