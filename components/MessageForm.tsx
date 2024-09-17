import React, { useState } from "react";
import { Alert, AlertTitle, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import {
  Box,
  Modal,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useAuthContext } from "./context/UseAuthContext";
import { userParticipationBadge } from "../src/UpdateBadges";
import { TMessageFormProps } from "../global";
import { GeolocationMessage } from "../src/APIFunctions";

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
  cursor: "pointer",
};

const inputFormStyle = {
  width: 1,
  mb: 2,
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
};

const MessageForm = ({
  trailID,
  currentPosition,
  formOpen,
  setFormOpen,
  setIsSubmitted,
}: TMessageFormProps) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const { userId } = useAuthContext();

  const handleClose = () => {
    setError(false);
    setFormOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async () => {
    if (currentPosition["lat"] === null || currentPosition["lng"] === null) {
      setError(true);
      return;
    }

    let current = new Date();
    let newGeolocationMessage: GeolocationMessage = new GeolocationMessage(
      userId,
      trailID,
      currentPosition.lat,
      currentPosition.lng,
      value,
      `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`
    );

    await GeolocationMessage.post(newGeolocationMessage);

    setIsSubmitted(true);
    setValue("");
    userParticipationBadge(userId);
    handleClose();
  };

  const SubmitButton = () => {
    return (
      <Button
        variant="contained"
        disableElevation
        style={{ cursor: "pointer", zIndex: 99 }}
        onClick={handleSubmit}
        onTouchStart={handleSubmit}
        sx={{
          background: "#304b35",
          "&:hover": {
            background: "#64801a",
          },
        }}
      >
        Submit
      </Button>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        keepMounted
        open={formOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ borderRadius: "1rem" }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Write Trail Message
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            Messages that condone violence, hate speech, harmful misinformation,
            or criminal acts are subject to deletion, and the offending user
            will be banned.
          </Typography>
          <TextField
            sx={inputFormStyle}
            id="outlined-multiline-static"
            multiline
            rows={3}
            placeholder={"Your message here"}
            value={value}
            onChange={handleChange}
            InputProps={{ endAdornment: <SubmitButton /> }}
          />
          {error === true ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Cannot get location - please ensure{" "}
              <strong>Location Services</strong> are enabled on your device, or
              try again later.
            </Alert>
          ) : (
            <></>
          )}
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default MessageForm;
