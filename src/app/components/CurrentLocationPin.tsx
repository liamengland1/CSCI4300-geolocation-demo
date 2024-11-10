interface Poi {
    key: string;
    location: google.maps.LatLngLiteral;
}

interface CurrentLocationPinProps {
    currentLoc: Poi | undefined;
}

import { AdvancedMarker, AdvancedMarkerAnchorPoint, Pin } from '@vis.gl/react-google-maps';
import MarkerWithInfoWindow from './MarkerWithInfoWindow';

const CurrentLocationPin = ({currentLoc}: CurrentLocationPinProps) => {
    return (
     (currentLoc == undefined) ? null : (
      <MarkerWithInfoWindow poi={currentLoc} key={currentLoc.key} />
      
    )
          
      
    );
  };
export default CurrentLocationPin;