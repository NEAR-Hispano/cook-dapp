import { FC, useState } from "react";
import useTranslator from "../hooks/useTranslator";
import { imageInterface } from "../types";
import ImageUploader from "./ImageUploader";
import EditableText from "./EditableText";
import useContract from "../hooks/useContract";
import { toast } from "react-toastify";
import refreshPage from "../utils/refreshPage";
import Spinner from "../assets/svg/Spinner";

interface Props {}

const CreateRecipeBook: FC<Props> = () => {
  const translate = useTranslator();
  const contract = useContract();
  const [title, setTitle] = useState<string | null>("Book title here");
  const [banner, setBanner] = useState<imageInterface | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const [hasTextLengthError, setHasTextLengthError] = useState<string | null>(
    null
  );

  function createRecipeBook() {
    if (!title) {
      toast(translate("Please add title."), {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (!banner) {
      toast(translate("Please add a banner."), {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (!title || !banner) return;
    if (
      contract &&
      title &&
      title.length > 4 &&
      title !== "Book title here" &&
      banner
    ) {
      toast(translate("Creating Recipe Book"), {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      contract.createRecipeBook({ title, banner }).then(() => {
        toast.dismiss();
        toast(translate("Recipe Book Created"), {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          refreshPage();
        }, 3000);
      });
    }
  }

  return (
    <div className="create-recipe-book-tile-container">
      {banner ? (
        <img src={banner.url} alt={banner.name} />
      ) : (
        <div
          className="image-input-placeholder"
          style={
            isUploadingImage
              ? {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }
              : {}
          }
        >
          {isUploadingImage ? (
            <Spinner size={50} isVisible={isUploadingImage} />
          ) : (
            <ImageUploader
              setImage={setBanner}
              setIsUploadingImage={setIsUploadingImage}
            />
          )}
        </div>
      )}
      <div className="recipe-slide-information-wrapper">
        <div className="title">
          <EditableText
            className="create-recipe-book-title"
            onBlur={(e) => setTitle(e.currentTarget.innerText)}
            isEditable={true}
            setHasTextLengthError={setHasTextLengthError}
            textType="title"
          >
            {title && title}
          </EditableText>
        </div>
        <div
          className="explore-option-container"
          onClick={(e) => createRecipeBook()}
        >
          <small>{translate("create_book")}</small>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipeBook;
