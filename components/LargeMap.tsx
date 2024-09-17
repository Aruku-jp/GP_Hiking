import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useCallback } from "react";
import L from "leaflet";
import styles from "../styles/mapview.module.css";
import MessageIcon from "./MessageIcon";
import { TLatLng } from "../global";
import { GeolocationMessage } from "../src/APIFunctions";

type MessageDataObject = {
  id: number;
  user: number;
  trail_id: number;
  latitude: string;
  longitude: string;
  message: string;
  date: string;
};

type TLargeMapProps = {
  lat: string | null;
  lon: string | null;
  trailID: number;
  isSubmitted: boolean;
  setIsSubmitted: Function;
  currentPosition: TLatLng;
  setCurrentPosition: Function;
  setMessageDetails: Function;
};

const LargeMap = ({
  lat,
  lon,
  trailID,
  isSubmitted,
  setIsSubmitted,
  currentPosition,
  setCurrentPosition,
  setMessageDetails,
}: TLargeMapProps) => {
  let latNumber = 0;
  let lonNumber = 0;
  if (lat !== null) latNumber = parseFloat(lat);
  if (lon !== null) lonNumber = parseFloat(lon);

  const [messageData, setMessageData] = useState<MessageDataObject[]>([]);
  const messageIcon = L.icon({
    iconUrl: "/messageMarker.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    shadowUrl: "/markerShadow.png",
    popupAnchor: [2, -40],
  });
  const locationIcon = L.icon({
    iconUrl: "/locationMarker.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    shadowUrl: "/markerShadow.png",
    popupAnchor: [2, -40],
  });

  const fetchMessageData = useCallback(async () => {
    const fetchedMessageData = await GeolocationMessage.getAllByID(trailID);
    if (!messageData) {
      setMessageData(fetchedMessageData?.data);
    } else {
      setMessageData([...fetchedMessageData?.data]);
    }
    setIsSubmitted(false);
  }, [isSubmitted]);

  fetchMessageData();

  const LocationMarker = () => {
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setCurrentPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return currentPosition === null ? null : (
      <Marker position={currentPosition} icon={locationIcon}>
        <Popup>You are here</Popup>
      </Marker>
    );
  };

  return (
    <MapContainer
      className={styles.map__wrapper}
      center={[latNumber, lonNumber]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://maptiles.p.rapidapi.com/en/map/v1/{z}/{x}/{y}.png?rapidapi-key=${process.env.NEXT_PUBLIC_MAP_API}`}
      />
      {messageData.map((message) => {
        const messageLatNumber = parseFloat(message.latitude);
        const messageLonNumber = parseFloat(message.longitude);
        return (
          <Marker
            key={message.id}
            position={[messageLatNumber, messageLonNumber]}
            icon={messageIcon}
          >
            <Popup>
              {message.message}{" "}
              <MessageIcon
                message={message}
                setMessageDetails={setMessageDetails}
              />
            </Popup>
          </Marker>
        );
      })}
      <LocationMarker />
    </MapContainer>
  );
};

export default LargeMap;
