import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import style from "../styles/singletrail.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import L from "leaflet";

interface TrailMapProps {
  lat: string;
  lon: string;
  trailID: number;
  currentPosition: Array<Object>;
  setCurrentPosition: Function;
}

type MessageDataObject = {
  id: number;
  user: number;
  trail_id: number;
  latitude: string;
  longitude: string;
  message: string;
  likes: number;
  dislikes: number;
  date: string;
};

const TrailMap = ({
  lat,
  lon,
  trailID,
  currentPosition,
  setCurrentPosition,
}: TrailMapProps) => {
  const latNumber = parseFloat(lat);
  const lonNumber = parseFloat(lon);
  const [messageData, setMessageData] = useState<MessageDataObject[]>([]);
  const leafletIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
    popupAnchor: [2, -40],
  });

  const fetchMessageData = async () => {
    const fetchedMessageData = await axios.get(
      `https://hikeable-backend.herokuapp.com/api/trails/${trailID}/messages`
    );
    setMessageData(fetchedMessageData.data);
  };

  useEffect(() => {
    fetchMessageData();
  }, []);

  return (
    <>
      <MapContainer
        className={style.map}
        center={[latNumber, lonNumber]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://maptiles.p.rapidapi.com/en/map/v1/{z}/{x}/{y}.png?rapidapi-key=${process.env.NEXT_PUBLIC_MAP_API}`}
        />
        {messageData.map((message, index) => {
          const messageLatNumber = parseFloat(message.latitude);
          const messageLonNumber = parseFloat(message.longitude);
          return (
            <Marker
              key={index}
              icon={leafletIcon}
              position={[messageLatNumber, messageLonNumber]}
            >
              <Popup>{message.message}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </>
  );
};

export default TrailMap;