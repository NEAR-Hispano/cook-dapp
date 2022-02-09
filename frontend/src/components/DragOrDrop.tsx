import { FC, useEffect, useState } from "react";
import { NFTStorage } from "nft.storage";
import { imageInterface } from "../types";

interface Props {
  setImage: React.Dispatch<React.SetStateAction<imageInterface | null>>;
  preview: string;
  setPreview: React.Dispatch<React.SetStateAction<string>>;
}

const DragOrDrop: FC<Props> = ({ setImage, preview, setPreview }) => {
  const [name, setName] = useState<string | null>(null);
  const [cid, setCid] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (cid && name && url) {
      setImage({ name, cid, url });
    }
  }, [cid, name, url]);

  function uploadImage(file: File) {
    console.log(file);
    setName(file.name);

    const client = new NFTStorage({
      token: process.env.REACT_APP_IPFS_TOKEN || "",
    });
    client
      .store({
        name: file.name,
        description: "cook-dapp-recipe-book-image",
        image: file,
      })
      .then((metadata) => {
        console.log(metadata);
      });
  }

  function handleIsImage(file: File) {
    setPreview(
      (window as any).URL.createObjectURL(
        new Blob([file], { type: "application/zip" })
      )
    );
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
    >
      <div>
        <h5>Drop</h5>
        <i className="fas fa-fist-raised" />
        <div>
          <h5>Drag</h5>
          <i className="fas fa-hand-holding" />
          <label htmlFor="file">
            <h4>Upload Img</h4>
            <i className="fas fa-cloud-upload-alt" />
          </label>
          <input onChange={(e) => handleInput(e)} type="file" id="file" />
        </div>
      </div>
    </div>
  );
};

export default DragOrDrop;
