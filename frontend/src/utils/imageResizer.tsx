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
  const result: File = new File([], "default");

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

  Resizer.imageFileResizer(
    file,
    getSize().width,
    getSize().height,
    "JPEG",
    100,
    0,
    (result) => {
      console.log(result);
      result = file;
    },
    "file"
  );

  return result;
};

export default imageResizer;
