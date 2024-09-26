/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import Image from "next/image";
import { PrefList as MobilePrefList } from "../components/MobilePrefList";
import { PrefList as BrowserPrefList } from "../components/BrowserPrefList";
import { Container, Box } from "@mui/material";
import { BrowserView, MobileView } from "react-device-detect";
import styles from "../styles/prefectures.module.css";

const prefectures = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <div className={styles.bg__map}>
        <h1>Where do you want to walk next?</h1>
        <Link
          className={styles.link__all}
          href={{
            pathname: "trails/[pref]",
            query: { pref: "all" },
          }}
        >
          <h2 className={styles.txt__link}>
            Not sure where to go?🤔{" "}
            <span className={styles.span__underline}> See all trails</span>
          </h2>
        </Link>
        <BrowserView>
          <div className={styles.img__position__hiking}>
            <Image
              src={"/hiking.png"}
              alt="illustration of people hiking"
              width={500}
              height={500}
            />
          </div>
          <BrowserPrefList />
        </BrowserView>
        <MobileView>
          <MobilePrefList />
        </MobileView>
      </div>
    </Container>
  );
};

export default prefectures;
