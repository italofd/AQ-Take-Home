import { Dispatch, SetStateAction } from "react";

export interface ExecuteRequestBody {
	code: string;
	should_save: boolean;
}

export type SetExecutionResponse = Dispatch<SetStateAction<PythonCodeDTO>>;

export type PythonCodeDTO = string | null;
