'use client'

import { ReactNode, useEffect } from 'react';
import styles from './MainMap.module.css';
import { GoogleMapsEmbed } from '@next/third-parties/google';
import {APIProvider, Map} from '@vis.gl/react-google-maps';
import PoiMarkers from './PoiMarkers';


interface Poi {
    key: string;
    location: google.maps.LatLngLiteral;
}

interface MainMapProps {
  locations: Poi[]; // Replace 'any' with the appropriate type if known
}

const MainMap = ({locations}: MainMapProps) => {  // pass in props from sidebar

  return ( <div className={styles['map-container']}>
    <Map
      style={{width: 'auto', height: '100vh'}}
      defaultCenter={{lat: 22.54992, lng: 0}}
      defaultZoom={3}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
      mapId={'DEMO_MAP_ID'}
    >
        <PoiMarkers pois={locations} />
    </Map>
  </div>
  )
  
};
export default MainMap;     
     
     
