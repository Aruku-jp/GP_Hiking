import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { IconButton } from "@mui/material";
import { GeolocationMessageLike } from "../src/APIFunctions";

interface MessageThumbUpProps {
  recordExists: boolean;
  setRecordExists: Function;
  userId: number | undefined;
  isLiked: boolean;
  setIsLiked: Function;
  likeID: number | null;
  messageID: number | null;
}

const MessageThumbUp = ({
  recordExists,
  setRecordExists,
  userId,
  isLiked,
  setIsLiked,
  likeID,
  messageID,
}: MessageThumbUpProps) => {
  const handleClick = async () => {
    let current = new Date();
    let newGeolocationMessageLike: GeolocationMessageLike =
      new GeolocationMessageLike(
        userId,
        messageID,
        1,
        `${current.getFullYear()}-${
          current.getMonth() + 1
        }-${current.getDate()}`,
        null
      );
    let updatedGeolocationMessageLike = newGeolocationMessageLike;

    if (!recordExists) {
      await GeolocationMessageLike.post(newGeolocationMessageLike);

      setIsLiked(true);
      setRecordExists(true);
    } else if (isLiked && recordExists) {
      let updated = new Date();

      updatedGeolocationMessageLike.value = 0;
      updatedGeolocationMessageLike.update_date = `${updated.getFullYear()}-${
        updated.getMonth() + 1
      }-${updated.getDate()}`;

      await GeolocationMessageLike.put(updatedGeolocationMessageLike, likeID);

      setIsLiked(false);
    } else if (!isLiked && recordExists) {
      let updated = new Date();

      updatedGeolocationMessageLike.value = 1;
      updatedGeolocationMessageLike.update_date = `${updated.getFullYear()}-${
        updated.getMonth() + 1
      }-${updated.getDate()}`;

      await GeolocationMessageLike.put(updatedGeolocationMessageLike, likeID);

      setIsLiked(true);
    }
  };

  return (
    <>
      {isLiked === true ? (
        <>
          <IconButton onClick={handleClick}>
            <ThumbUpIcon />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton onClick={handleClick}>
            <ThumbUpOutlinedIcon />
          </IconButton>
        </>
      )}
    </>
  );
};

export default MessageThumbUp;
