import { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  createTheme,
  Button,
  Select,
  FormControl,
  MenuItem,
  ThemeProvider,
} from "@mui/material";
import MessageThumbUp from "./MessageThumbUp";
import { useAuthContext } from "./context/UseAuthContext";
import { TMessageLike, TMessageDetailsProps } from "../global";
import { GeolocationMessageLike, MessageReport } from "../src/APIFunctions";
import { green } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
});

const style = {
  position: "absolute" as "absolute",
  borderRadius: "1rem",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  select: {
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: "green",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "green",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "green",
    },
  },
};

const MessageDetails = ({
  messageDetails,
  setMessageDetails,
}: TMessageDetailsProps) => {
  const [data, setData] = useState<TMessageLike[]>([]);
  const [messageID, setMessageID] = useState<number | null>(null);
  const [recordExists, setRecordExists] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [numberOfLikes, setNumberOfLikes] = useState<number>(0);
  const [likeID, setLikeID] = useState<number | null>(null);
  const { userId } = useAuthContext();

  useEffect(() => {
    setMessageID(messageDetails["data"]["id"]);
  }, [messageDetails]);

  useEffect(() => {
    const fetchMessageLikeData = async () => {
      const fetchedMessageLikeData = await GeolocationMessageLike.getAllByID(
        messageID
      );
      setData(fetchedMessageLikeData?.data);
    };

    if (messageID !== null) fetchMessageLikeData();
  }, [messageID, isLiked]);

  useEffect(() => {
    const filterMessageLikeData = () => {
      let count = 0;
      if (data.length === 0) {
        setRecordExists(false);
        setLikeID(null);
        setIsLiked(false);
        setNumberOfLikes(count);
      } else {
        return data.map((record) => {
          if (record["user"] === userId) {
            setRecordExists(true);
            setLikeID(record["id"]);
            if (record["value"] === 1) setIsLiked(true);
          }

          count += record["value"];
          setNumberOfLikes(count);
        });
      }
    };

    filterMessageLikeData();
  }, [data, userId]);

  const handleClose = () => {
    setMessageDetails({
      selected: "false",
      data: {
        id: null,
        message: null,
        date: null,
      },
    });
    setIsLiked(false);
    setMessageID(null);
  };

  function ChildModal() {
    const arrayOfReasons = [
      { id: 0, value: "Hate Speech" },
      { id: 1, value: "Harassment" },
      { id: 2, value: "Spam" },
      { id: 3, value: "Misleading Information" },
      { id: 4, value: "Privacy Violation" },
      { id: 5, value: "Illegal Activity" },
      { id: 6, value: "Other" },
    ];
    const [childOpen, setChildOpen] = useState(false);
    const handleChildOpen = () => setChildOpen(true);
    const handleChildClose = () => setChildOpen(false);
    const [selectedReason, setSelectedReason] = useState<string>(
      arrayOfReasons[0].value
    );

    const handleChildSubmit = async () => {
      const current = new Date();
      const reportedMessage = messageDetails.data.message;

      const newMessageReport: MessageReport = new MessageReport(
        userId,
        messageID,
        selectedReason,
        `${current.getFullYear()}-${
          current.getMonth() + 1
        }-${current.getDate()}`,
        reportedMessage,
        false
      );

      await MessageReport.create(newMessageReport);
      setSelectedReason(arrayOfReasons[0].value);
      handleClose();
    };

    const ChildSubmitButton = () => {
      return (
        <Button
          variant="contained"
          disableElevation
          style={{ cursor: "pointer", zIndex: 99 }}
          onClick={handleChildSubmit}
          onTouchStart={handleChildSubmit}
          sx={{
            background: "#304b35",
            "&:hover": {
              background: "#64801a",
            },
            mt: 2,
          }}
        >
          Submit
        </Button>
      );
    };

    return (
      <>
        <Button sx={{ color: "#5e7119" }} onClick={handleChildOpen}>
          Report Message
        </Button>
        <Modal
          open={childOpen}
          onClose={handleChildClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
          sx={{ borderRadius: "1rem" }}
          keepMounted
        >
          <Box sx={style}>
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              Report Message
            </Typography>
            <Typography
              id="keep-mounted-modal-description"
              sx={{ mt: 2, mb: 2 }}
            >
              Please select why the message violates our guidelines. Any user
              who abuses the report function needlessly will be subject to
              disciplinary action, including potential account suspension or
              termination.
            </Typography>
            <FormControl fullWidth>
              <Select
                sx={style.select}
                value={selectedReason}
                onChange={(event) => setSelectedReason(event.target.value)}
              >
                {arrayOfReasons.map((reason) => (
                  <MenuItem key={reason.id} value={reason.value}>
                    {reason.value}
                  </MenuItem>
                ))}
              </Select>
              <ChildSubmitButton />
            </FormControl>
          </Box>
        </Modal>
      </>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Modal
        keepMounted
        open={messageDetails["selected"] === true}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        sx={{ borderRadius: "1rem" }}
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Message
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            Posted on {messageDetails["data"]["date"]}
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2, mb: 2 }}>
            {messageDetails["data"]["message"]}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <MessageThumbUp
                recordExists={recordExists}
                setRecordExists={setRecordExists}
                isLiked={isLiked}
                setIsLiked={setIsLiked}
                userId={userId}
                likeID={likeID}
                messageID={messageID}
              />

              <>{numberOfLikes}</>
            </Box>
            <Box>
              <ChildModal />
            </Box>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default MessageDetails;
