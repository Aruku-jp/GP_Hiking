import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { TrailCard } from "../../components";

const _ = require("lodash");

interface Trail {
  id: number;
}

async function fetcher(key: string, init?: RequestInit) {
  return fetch(key, init).then((res) => res.json() as Promise<Trail | null>);
}

const searchresults = () => {
  const router = useRouter();
  const { pref } = router.query;
  const { data: trail, error } = useSWR(
    "https://hikeable-backend.herokuapp.com/api/trail",
    fetcher
  );

  console.log(trail);

  const capitalizePref = _.capitalize(pref as string);

  useEffect(() => {
    if (!pref) {
      return;
    }

    router.prefetch("/prefectures");
  }, [pref]);

  return (
    <>
      <h1>Trails in {capitalizePref}</h1>
      <TrailCard />
    </>
  );
};

export default searchresults;
