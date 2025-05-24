interface Poi {
    key: string;
    location: google.maps.LatLngLiteral;
}

interface CurrentLocationPinProps {
    currentLoc: Poi | undefined;
}

import MarkerWithInfoWindow from './MarkerWithInfoWindow';
import { useState } from 'react';

const CurrentLocationPin = ({currentLoc}: CurrentLocationPinProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
     (currentLoc == undefined) ? null : (
      <MarkerWithInfoWindow poi={currentLoc} isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      
    )
          
      
    );
  };
export default CurrentLocationPin;