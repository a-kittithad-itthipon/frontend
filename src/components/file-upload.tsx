import { UploadCloud } from "lucide-react";

export function FileUpload({
  checkFile,
}: {
  checkFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <label
        htmlFor="file_zip"
        className="border flex p-3 rounded-2xl w-full h-[60%] flex-col justify-center items-center hover:bg-gray-100 transition cursor-pointer"
      >
        <UploadCloud size={48} className="mb-3 text-gray-400" />
        <span className="text-lg font-medium">
          Click to upload .zip project
        </span>
        <span className="text-sm text-gray-500 mt-1">
          Please Archive your project (.zip only)
        </span>
      </label>
      <input
        type="file"
        name="file_zip"
        id="file_zip"
        accept=".zip"
        hidden
        onChange={checkFile}
        required
      />
    </>
  );
}
