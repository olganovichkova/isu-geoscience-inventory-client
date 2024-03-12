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

  const [containerStyle, setContainerStyle] = useState(defaultContainerStyle);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleApiKey,
    libraries: libraries,
  });

  const [map, setMap] = useState<google.maps.Map>();

  const onMapLoad = useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance
    // const getCenterPosition = (
    //   rectPosition: google.maps.LatLngBoundsLiteral
    // ): google.maps.LatLngLiteral => {
    //   var nw = new google.maps.LatLng(rectPosition.north, rectPosition.west);
    //   var se = new google.maps.LatLng(rectPosition.south, rectPosition.east);
    //   return {
    //     lng: se.lng(),
    //     lat: nw.lat(),
    //   };
    // };
    // if (
    //   document.getElementById("view-google-map")?.parentElement?.clientWidth
    // ) {
    //   setContainerStyle({
    //     width: `${
    //       document.getElementById("view-google-map")?.parentElement?.clientWidth
    //     }px`,
    //     height: "600px",
    //   });
    // }
    //map.setCenter(getCenterPosition(rectanglePosition));
    setMap(map);
  }, []);

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

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(undefined);
  }, []);

  return isLoaded ? (
    <div id="view-google-map">
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={10}
        onLoad={onMapLoad}
        onUnmount={onUnmount}
      >
        <Rectangle bounds={rectanglePosition} onLoad={onRectangleLoad} />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
});
