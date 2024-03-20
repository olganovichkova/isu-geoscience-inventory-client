import { Rectangle } from "@react-google-maps/api";
import { memo, useState } from "react";

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
  const [rectanglePosition] = useState<google.maps.LatLngBoundsLiteral>(
    props.rectanglePosition
  );

  const onRectangleLoad = (rect: google.maps.Rectangle) => {};

  return <Rectangle bounds={rectanglePosition} onLoad={onRectangleLoad} />;
});
