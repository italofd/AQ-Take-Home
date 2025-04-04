import { apiClient as axiosClient } from "@/api/client";
import { ping } from "./ping";
import { ExecuteRequestBody } from "@/types/api";
import axios from "axios";

export const executePythonCode = async (
  apiClient: typeof axiosClient,
  code: string,
  should_save: boolean,
) => {
  //[TO-DO]: Transform into a factory and avoid this drilling
  await ping(apiClient);

  let output: string | null = null;

  //Wait for ping to be successful to proceed, that could be just on cold starts
  //As we are on server free tier, it goes off if its not being used and takes somewhere about 40s to get up.
  //[TO-DO]: Implement type for response, great if could be directly from the OpenAPI doc from python server =)
  try {
    const res = await apiClient().post<
      ExecuteRequestBody,
      { message: string; code_output?: string }
    >("/execute", {
      code,
      should_save,
    });

    output = res.code_output ? res.code_output : res.message;
  } catch (e) {
    const isAxiosError = axios.isAxiosError(e);
    if (isAxiosError) output = `Error: ${e?.response?.data.detail.error}`;
    else throw e;
  }

  return output;
};
