import Link from "next/link";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "../styles/preflist_mobile.module.css";

const regionsAndPrefectures = [
  {
    region: "Hokkaido",
    prefectures: ["Hokkaido"],
  },

  {
    region: "Tohoku",
    prefectures: [
      "Aomori",
      "Iwate",
      "Miyagi",
      "Akita",
      "Yamagata",
      "Fukushima",
    ],
  },

  {
    region: "Kanto",
    prefectures: [
      "Ibaraki",
      "Tochigi",
      "Gunma",
      "Saitama",
      "Chiba",
      "Tokyo",
      "Kanagawa",
    ],
  },
  {
    region: "Chubu & Hokuriku",
    prefectures: [
      "Niigata",
      "Toyama",
      "Ishikawa",
      "Fukui",
      "Yamanashi",
      "Nagano",
      "Gifu",
      "Shizuoka",
      "Aichi",
    ],
  },
  {
    region: "Kinki",
    prefectures: [
      "Mie",
      "Shiga",
      "Kyoto",
      "Osaka",
      "Hyogo",
      "Nara",
      "Wakayama",
    ],
  },
  {
    region: "Chugoku",
    prefectures: ["Tottori", "Shimane", "Okayama", "Hiroshima", "Yamaguchi"],
  },
  { region: "Shikoku", prefectures: ["Tokushima", "Kagawa", "Ehime", "Kochi"] },
  {
    region: "Kyushu & Okinawa",
    prefectures: [
      "Fukuoka",
      "Saga",
      "Nagasaki",
      "Kumamoto",
      "Oita",
      "Miyazaki",
      "Kagoshima",
      "Okinawa",
    ],
  },
];

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
});

export function PrefList() {
  const accordions = regionsAndPrefectures.map((regionObj, index) => (
    <Accordion key={index} sx={{ mb: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography sx={{ fontWeight: "bold" }}>{regionObj.region}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ul className={styles.pref_list}>
          {regionObj.prefectures.map((prefecture) => (
            <li key={prefecture} className={styles.pref_list_li}>
              <Link href={`/trails/${prefecture.toLowerCase()}`}>
                {prefecture}
              </Link>
            </li>
          ))}
        </ul>
      </AccordionDetails>
    </Accordion>
  ));

  return (
    <>
      <ThemeProvider theme={theme}>{accordions}</ThemeProvider>
    </>
  );
}
