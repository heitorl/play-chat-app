import { CircularProgressbar } from "react-circular-progressbar";
import { MdLink, MdCheckCircle, MdError } from "react-icons/md";
import Image from "next/image";
import { UploadedFile } from "./UploadAvatarModal";

interface ImagePreviewProps {
  file: UploadedFile;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ file }) => {
  return (
    <div className="w-[350px] mt-4">
      <div className="flex justify-between items-center text-pink-400">
        <div className="flex items-center">
          {/* {file.preview && (
            <Image
              src={file.preview}
              width={40}
              height={40}
              fill
              alt="preview"
            />
          )} */}
          <div className="flex flex-col text-gray-300">
            <strong>{file.name}</strong>
            <span className="text-gray-300 ">{file.readableSize}</span>
          </div>
        </div>

        <div>
          {file.url && (
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              <MdLink
                style={{ marginRight: 8 }}
                size={24}
                className="text-blue-400"
              />
            </a>
          )}
          {file.uploaded && (
            <MdCheckCircle size={24} className="text-green-400" />
          )}
          {file.error && <MdError size={24} color="#FF6666" />}
        </div>
      </div>
    </div>
  );
};
