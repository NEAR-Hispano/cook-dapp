import { NFTStorage } from "nft.storage";
import { Token } from "nft.storage/dist/src/token";
import { imageInterface } from "../types";

type metadataType = Token<{
  name: string;
  description: string;
  image: File;
}>;

interface Props {
  file: File;
  setBanner?: React.Dispatch<React.SetStateAction<imageInterface | null>>;
  setIsUploadingImage?: React.Dispatch<React.SetStateAction<boolean>>;
}

function formatImageUrl(metadata: metadataType) {
  return `https://ipfs.io/ipfs/${
    metadata.ipnft
  }/image/${metadata.data.name.replaceAll(" ", "%20")}`;
}

async function uploadImage({ file, setBanner, setIsUploadingImage }: Props) {
  const resizedImage = file;

  const client = new NFTStorage({
    token: process.env.REACT_APP_IPFS_TOKEN || "",
  });

  return client
    .store({
      name: file.name,
      description: "cook-dapp-recipe-book-image",
      image: resizedImage,
    })
    .then((metadata) => {
      let newImage = {
        name: file.name,
        url: formatImageUrl(metadata),
        cid: metadata.ipnft,
      };
      if (setBanner) {
        setBanner(newImage);
      } else {
        return newImage;
      }

      if(setIsUploadingImage) {
        setIsUploadingImage(false)
      }

    });
}

export default uploadImage;
