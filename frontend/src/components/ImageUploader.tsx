import { FC } from "react";
import { imageInterface } from "../types";

import ImageUploadIcon from "../assets/svg/ImageUploadIcon";
import uploadImage from "../utils/uploadImage";

interface Props {
  setImage: React.Dispatch<React.SetStateAction<imageInterface | null>>;
  setIsUploadingImage?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageUploader: FC<Props> = ({ setImage, setIsUploadingImage }) => {

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }
  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }
  async function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    if(setIsUploadingImage) setIsUploadingImage(true)
    e.preventDefault();
    let file = e.dataTransfer.files[0];
    if (file.type.match("video.*")) {     
      return;
    }
    uploadImage({ file, setBanner: setImage, setIsUploadingImage });
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    if(setIsUploadingImage) setIsUploadingImage(true)
    e.preventDefault();
    if (e && e.target && e.target.files && e.target.files[0]) {
      let file = e.target.files[0];      
      uploadImage({ file, setBanner: setImage });
    }
  }

  return (
    <div
      onDragOver={(e) => handleDragOver(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDrop={(e) => handleDrop(e)}
      className="image-uploader-wrapper"
    >
      <label className="image-upload" htmlFor="image-upload">
        <ImageUploadIcon size={40} />
        <input
          onChange={(e) => handleInput(e)}
          type="file"
          id="image-upload"
          accept="image/x-png, image/gif, image/jpeg"
        />
      </label>
    </div>
  );
};

export default ImageUploader;
