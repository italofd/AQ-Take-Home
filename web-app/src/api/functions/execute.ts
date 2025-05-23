import { ApiClient, ExecuteRequestBody, ExecuteRequestResponse } from "@/types/api";
import axios from "axios";

export const executePythonCode = async (
  deps: { apiClient: ApiClient },
  params: { code: string; should_save: boolean },
) => {
  const { apiClient } = deps;
  const { code, should_save } = params;

  let output: string | null = null;
  let wasInserted: boolean = false;

  try {
    const { data, status } = await apiClient.post<ExecuteRequestBody, ExecuteRequestResponse>(
      "/execute",
      {
        code,
        should_save,
      },
    );

    output = data.code_output ? data.code_output : data.message;
    wasInserted = status === 201;
  } catch (e) {
    const isAxiosError = axios.isAxiosError(e);

    if (isAxiosError) output = `Error: ${e?.response?.data.detail.error}`;
    else throw e;
  }

  return { output, wasInserted };
};
