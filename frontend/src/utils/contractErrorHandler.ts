import { toast } from "react-toastify";

export default function contractErrorHandler(error: Error) {
  const unProcessedMessage = JSON.parse(error.message).kind.ExecutionError;
  const prefix = "Smart contract panicked: ";
  const subfix = ", filename:";
  const message = unProcessedMessage.split(prefix)[1].split(subfix)[0];
  toast.dismiss();
  toast(message, {
    position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
