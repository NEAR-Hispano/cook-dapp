import Resizer from "react-image-file-resizer";

interface imageSize {
  height: number;
  width: number;
}

interface Props {
  file: File;
  imageType: "recipe" | "recipeBook" | "cookDappRecipe";
}

async function imageResizer({ file, imageType }: Props) {
  const recipeSize: imageSize = {
    height: 1200,
    width: 800,
  };

  const recipeBookSize: imageSize = {
    height: 1200,
    width: 800,
  };

  const cookDappRecipeSize: imageSize = {
    height: 1728,
    width: 2592,
  };

  function getSize(): imageSize {
    if (imageType === "recipe") return recipeSize;
    if (imageType === "recipeBook") return recipeBookSize;
    if (imageType === "cookDappRecipe") return cookDappRecipeSize;
    return recipeSize;
  }

  const size = getSize();

  return new Promise<File | Blob>((resolve) => {
   Resizer.imageFileResizer(
      file,
      size.width,
      size.height,
      "PNG",
      100,
      0,
      (uri) => {
        if (uri instanceof File) {
          console.log(uri)
          return uri;
        }
        if (uri instanceof Blob) {
          console.log(uri)
          return uri;
        }        
        return new File([], "");
      },
      "file",
      size.width,
      size.height
    );  
  });  
}

export default imageResizer;
