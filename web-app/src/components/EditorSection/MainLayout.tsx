import { ReactNode } from "react";
import { CodeEditorFooter } from "./CodeEditorFooter";
import { SetIsExecLoading, SetExecutionResponse } from "@/types/api";
import { CodeEditorRef } from "@/types/editor";
import { SetShouldShowDialog } from "@/types/components";

export const MainLayout = ({
  children,
  isExecLoading,
  monacoRef,
  setters,
}: {
  children: ReactNode;
  isExecLoading: boolean;
  monacoRef: CodeEditorRef;
  setters: {
    setExecutionResponse: SetExecutionResponse;
    setIsExecLoading: SetIsExecLoading;
    setShouldShowDialog: SetShouldShowDialog;
  };
}) => {
  const { setExecutionResponse, setIsExecLoading, setShouldShowDialog } =
    setters;

  return (
    <div className="w-full h-full min-w-[40%] flex bg-zinc-900 text-zinc-100 p-4 md:p-8">
      <div className="w-full mx-auto space-y-8">
        <div className="flex flex-col h-full bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-zinc-700">
            <h2 className="text-lg font-semibold">Code Editor</h2>
            <p className="text-sm text-zinc-400">Write your code here</p>
          </div>
          <div className="flex flex-[1] overflow-auto p-4">
            <div className="h-full  w-full p-4 rounded-md font-mono text-sm text-zinc-300 overflow-auto">
              {children}
            </div>
          </div>
          <div className="h-18 min-h-18 max-h-18 p-4 border-t border-zinc-700 flex justify-between">
            <CodeEditorFooter
              monacoRef={monacoRef}
              isExecLoading={isExecLoading}
              setExecutionResponse={setExecutionResponse}
              setIsExecLoading={setIsExecLoading}
              setShouldShowDialog={setShouldShowDialog}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
