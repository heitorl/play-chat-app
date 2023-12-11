import { UserContext } from "@/providers/userContext";
import useAvatarUrl from "@/utils/getAvatarForUser";
import { useContext } from "react";
import { filesize } from "filesize";
import { useDropzone } from "react-dropzone";
import UploadMessage from "./MessageUpload";
import { UserType } from "@/providers/userContext";
import Image from "next/image";
import { ImagePreview } from "./ImagePreview";

interface UpdateAvatarModalProps {
  user: UserType;
}

export interface UploadedFile {
  file: File;
  name: string;
  readableSize: string;
  preview: string;
  progress: number;
  uploaded: boolean;
  error: boolean;
  url: string | null;
}

const UpdloadAvatar = () => {
  const { imageUploaded, setImageUploaded, requestAvatarUpload, user } =
    useContext(UserContext);
  const avatarUrl = useAvatarUrl(user);

  const onDropAccepted = (acceptedFiles: any) => {
    const imageFile = acceptedFiles.filter(
      (file) =>
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg"
    );

    if (imageFile.length === 0) {
      console.error("Nenhum arquivo de imagem válido foi enviado.");

      return;
    }

    const uploadedFile = {
      file: imageFile[0],
      name: imageFile[0].name,
      readableSize: filesize(imageFile[0].size),
      preview: URL.createObjectURL(imageFile[0]),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    };

    setImageUploaded(uploadedFile);

    processUpload(uploadedFile);
  };

  const processUpload = (uploadedFile: UploadedFile) => {
    const data = new FormData();

    data.append("file", uploadedFile.file, uploadedFile.name);

    requestAvatarUpload(data);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: {
        "image/png": [".png"],
        "image/jpeg": [".jpeg", ".jpg"],
      },
      onDropAccepted,
      multiple: false,
    });

  const renderDragMessage = (isDragActive: boolean, isDragReject: boolean) => {
    if (!isDragActive) {
      return <UploadMessage>Arraste sua foto aqui ...</UploadMessage>;
    }

    if (isDragReject) {
      return (
        <UploadMessage type="error">
          Arquivo não suportado! Apenas imagens são permitidas.
        </UploadMessage>
      );
    }
    return <UploadMessage type="success">Solte sua foto aqui!</UploadMessage>;
  };

  return (
    <div className="flex flex-col  w-[380px] h-[420px] items-center bg-zinc-900 fixed -translate-x-2/4 -translate-y-2/4 z-[1000] shadow-[0px_2px_4px_rgba(0,0,0,0.1)] rounded-[10px] left-2/4 top-2/4;">
      <div className="py-4 text-gray-400 font-bold text-xl">
        <h2>Atualize a sua foto de perfil!</h2>
      </div>
      <div className="w-[350px] h-[180px] relative p-4">
        {avatarUrl.avatarUrl && (
          <Image
            src={avatarUrl.avatarUrl}
            className="w-full object-cover"
            fill
            quality={100}
            alt="urlavatar"
          />
        )}
      </div>
      <div>
        <div
          id="dropzone"
          {...getRootProps()}
          className={`border border-dashed w-[350px] mt-6 rounded cursor-pointer bg-zinc-600 transition-[height] ${
            isDragActive ? "text-blue-600 border-blue-400" : ""
          } ${isDragReject ? "text-red-500 border-red-400" : ""}`}
        >
          <input {...getInputProps()} />
          {renderDragMessage(isDragActive, isDragReject)}
        </div>
      </div>

      <ImagePreview file={imageUploaded} />
    </div>
  );
};

export default UpdloadAvatar;
