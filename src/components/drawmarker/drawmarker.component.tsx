import { useJsApiLoader, Libraries, Marker } from "@react-google-maps/api";
import { memo, useState } from "react";

const googleApiKey: string = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  ? process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  : "";

type GoogleMapShowPointerProps = {
  pinPosition: {
    lat: number;
    lng: number;
  };
};

export default memo(function GoogleMapShow(
  props: GoogleMapShowPointerProps,
  key: number
): JSX.Element {
  const [libraries] = useState<Libraries>(["drawing"]);
  const [pinPosition] = useState<google.maps.LatLngLiteral>({
    lat: props.pinPosition.lat,
    lng: props.pinPosition.lng,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleApiKey,
    libraries: libraries,
  });

  return <Marker key={key} position={pinPosition} />;
});
