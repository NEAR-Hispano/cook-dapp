import { FC, useEffect, useState } from "react";
import { NFTStorage } from "nft.storage";
import { imageInterface } from "../types";
import { Token } from "nft.storage/dist/src/token";
import ImageUploadIcon from "../assets/svg/ImageUploadIcon";
import imageResizer from "../utils/imageResizer";

interface Props {
  setImage: React.Dispatch<React.SetStateAction<imageInterface | null>>;
}

type metadataType = Token<{
  name: string;
  description: string;
  image: File;
}>;

const ImageUploader: FC<Props> = ({ setImage }) => {
  const [name, setName] = useState<string | null>(null);
  const [cid, setCid] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (cid && name && url) {
      setImage({ name, cid, url });
    }
  }, [cid, name, url]);

  function formatImageUrl(metadata: metadataType) {
    return `https://ipfs.io/ipfs/${
      metadata.ipnft
    }/image/${metadata.data.name.replaceAll(" ", "%20")}`;
  }

  async function uploadImage(file: File) {
    setName(file.name);
    // const resizedImage = await imageResizer({ file, imageType: "recipeBook" });
    const resizedImage = file;

    const client = new NFTStorage({
      token: process.env.REACT_APP_IPFS_TOKEN || "",
    });

    client
      .store({
        name: file.name,
        description: "cook-dapp-recipe-book-image",
        image: resizedImage,
      })
      .then((metadata) => {
        setUrl(formatImageUrl(metadata));
        setCid(metadata.ipnft);
      });
  }

  function handleIsImage(file: File) {
    uploadImage(file);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }
  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }
  async function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    let file = e.dataTransfer.files[0];
    if (file.type.match("video.*")) {
      // Notification specifing videos are not allowed
      return;
    }
    handleIsImage(file);
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e && e.target && e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      if (file.type.match("video.*")) {
        // Notification specifing videos are not allowed
        return;
      }
      handleIsImage(file);
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
        <input onChange={(e) => handleInput(e)} type="file" id="image-upload" />
      </label>
    </div>
  );
};

export default ImageUploader;
