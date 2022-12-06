import { useRouter } from "next/router";
import { Trail } from "../global";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import styles from "../styles/singletrail.module.css";

interface TrailData {
  trail: Trail;
}

const difficultyObj = {
  1: "Easy",
  2: "Moderate",
  3: "Hard",
};

const SingleTrail = () => {
  const router = useRouter();
  const trail: Trail = JSON.parse(router.query.trail as string);

  console.log(trail);

  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          m: 1,
          p: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Image src={""} alt="Placeholder" width={250} height={200} />
          <Box
            sx={{
              flexDirection: "column",
            }}
          >
            <Typography variant="h1">{trail.name}</Typography>
            <Typography>{trail.prefecture}</Typography>
            <Typography>{trail.length}</Typography>
            <Typography>{difficultyObj[trail.difficulty]}</Typography>
          </Box>
        </Box>
        <Box>
          <Typography>5 Day Weather at Trail Name</Typography>
        </Box>
        <Box>
          <Typography>Around Map at Trail Name</Typography>
        </Box>
        <Box
          sx={{
            flexDirection: "column",
            width: "40%",
            border: "solid",
            borderRadius: "4px",
            m: 1,
            p: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>Tips for Trails</Typography>
            <Typography>Add Tips</Typography>
          </Box>
          <Box
            sx={{
              marginTop: "1",
              border: "solid",
              borderRadius: "4px",
            }}
          >
            <Typography>From Haruna</Typography>
            <Typography>
              Stone stairs, and very slippery while and after raining!
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default SingleTrail;
