"use client";
import { apiClient } from "@/api/client";
import { executePythonCode } from "@/functions/execute";
import { PythonCodeDTO, SetExecutionResponse } from "@/types/api";

const onExecutePythonCode = async (
	setExecutionResponse: SetExecutionResponse,
	code: string
) => {
	const { code_output } = await executePythonCode(apiClient, code || "");

	if (code_output) setExecutionResponse(code_output);
};

export const CodeEditorFooter = ({
	code,
	setExecutionResponse,
}: {
	code: PythonCodeDTO;
	setExecutionResponse: SetExecutionResponse;
}) => {
	return (
		<>
			<button
				className="px-6 py-2 bg-gradient-to-r font-bold from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				onClick={async () =>
					code && onExecutePythonCode(setExecutionResponse, code)
				}
			>
				Run your code
			</button>
			<button className="px-6 py-2 bg-gradient-to-r font-bold from-green-500 to-green-600 text-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
				Run and Store
			</button>
		</>
	);
};
