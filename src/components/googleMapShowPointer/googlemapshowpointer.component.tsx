import {
  GoogleMap,
  useJsApiLoader,
  Libraries,
  Marker,
} from "@react-google-maps/api";
import { memo, useCallback, useState } from "react";

const defaultContainerStyle = {
  width: "800px",
  height: "600px",
};

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
  props: GoogleMapShowPointerProps
): JSX.Element {
  const [libraries] = useState<Libraries>(["drawing"]);
  const [pinPosition] = useState<google.maps.LatLngLiteral>({
    lat: props.pinPosition.lat,
    lng: props.pinPosition.lng,
  });

  const [containerStyle, setContainerStyle] = useState(defaultContainerStyle);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleApiKey,
    libraries: libraries,
  });

  const [map, setMap] = useState<google.maps.Map>();

  const onMapLoad = useCallback(function callback(map: google.maps.Map) {
    if (
      document.getElementById("view-google-map")?.parentElement?.clientWidth
    ) {
      setContainerStyle({
        width: `${
          document.getElementById("view-google-map")?.parentElement?.clientWidth
        }px`,
        height: "600px",
      });
    }
    // This is just an example of getting and using the map instance
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(undefined);
  }, []);

  return isLoaded ? (
    <div id="view-google-map">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={pinPosition}
        zoom={10}
        onLoad={onMapLoad}
        onUnmount={onUnmount}
      >
        <Marker key={123} position={pinPosition} />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
});
