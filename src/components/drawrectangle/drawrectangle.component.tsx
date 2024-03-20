import {
  GoogleMap,
  useJsApiLoader,
  Libraries,
  Rectangle,
} from "@react-google-maps/api";
import { memo, useCallback, useState } from "react";

const defaultContainerStyle = {
  width: "800px",
  height: "600px",
};

//document.getElementById("view-google-map")?.parentElement?.clientWidth,

const googleApiKey: string = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  ? process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  : "";

type GoogleMapShowRectangleProps = {
  rectanglePosition: {
    east: number;
    north: number;
    south: number;
    west: number;
  };
};

export default memo(function GoogleMapShow(
  props: GoogleMapShowRectangleProps
): JSX.Element {
  const [libraries] = useState<Libraries>(["drawing"]);
  const [rectanglePosition] = useState<google.maps.LatLngBoundsLiteral>(
    props.rectanglePosition
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleApiKey,
    libraries: libraries,
  });

  const [map, setMap] = useState<google.maps.Map>();

  const onRectangleLoad = (rect: google.maps.Rectangle) => {
    const getCenterPosition = (
      lat: number,
      lng: number
    ): google.maps.LatLngLiteral => {
      return { lat, lng };
    };
    let lat = rect.getBounds()?.getCenter().lat();
    let lng = rect.getBounds()?.getCenter().lng();
    if (lat && lng && map) {
      map.setCenter(getCenterPosition(lat, lng));
    }
  };

  return <Rectangle bounds={rectanglePosition} onLoad={onRectangleLoad} />;
});
