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
  sampleId: string;
};

export default memo(function GoogleMapShow(
  props: GoogleMapShowPointerProps,
  key: number
): JSX.Element {
  const [pinPosition] = useState<google.maps.LatLngLiteral>({
    lat: props.pinPosition.lat,
    lng: props.pinPosition.lng,
  });

  return <Marker key={key} position={pinPosition} title={props.sampleId} />;
});
