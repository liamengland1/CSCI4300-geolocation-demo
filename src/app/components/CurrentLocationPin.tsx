interface Poi {
    key: string;
    location: google.maps.LatLngLiteral;
}

interface CurrentLocationPinProps {
    currentLoc: Poi | undefined;
}

import { AdvancedMarker, AdvancedMarkerAnchorPoint, Pin } from '@vis.gl/react-google-maps';
import MarkerWithInfoWindow from './MarkerWithInfoWindow';
import { useState } from 'react';

const CurrentLocationPin = ({currentLoc}: CurrentLocationPinProps) => {
    let [isOpen, setIsOpen] = useState(false);
    return (
     (currentLoc == undefined) ? null : (
      <MarkerWithInfoWindow poi={currentLoc} isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      
    )
          
      
    );
  };
export default CurrentLocationPin;