import { useState } from "react";
import type { StageDetailType } from "../types/DataTypes";

type UpdateStageDetailData = Partial<StageDetailType>;

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateStageDetail = async (
    stageDetailId: string,
    data: UpdateStageDetailData
  ) => {
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
        const errorData = await response.json().catch(() => null);
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
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      console.error("Error updating stage detail:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateStageDetail, loading, error, success };
};

export default useUpdateStageDetail;
