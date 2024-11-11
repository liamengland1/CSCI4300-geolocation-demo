'use client'

import { ReactNode, useEffect } from 'react';
import styles from './MainMap.module.css';
import { GoogleMapsEmbed } from '@next/third-parties/google';
import {APIProvider, Map} from '@vis.gl/react-google-maps';
import CurrentLocationPin from './CurrentLocationPin';
import MarkerWithInfoWindow from './MarkerWithInfoWindow';


interface Poi {
  key: string;
  location: google.maps.LatLngLiteral;
  propsForInfoWindow?: any;
}

interface MainMapProps {
  pinLocs: Poi[]; 
  currentLoc: Poi | undefined;
}

const MainMap = ({pinLocs, currentLoc}: MainMapProps) => {  // pass in props from sidebar

  return ( <>
  <div className={styles['map-container']}>
    <Map
      style={{width: 'auto', height: '85vh'}}
      defaultCenter={{lat: 39.5, lng: -98.35}}
      defaultZoom={5}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
      zoomControl={true}
      mapId={'DEMO_MAP_ID'}
      clickableIcons={false}
      //mapTypeId={google.maps.MapTypeId.HYBRID}
      streetViewControl={true}
    >
        <CurrentLocationPin currentLoc={currentLoc}/>
        {pinLocs.map( (poi: Poi) => (
          <MarkerWithInfoWindow poi={poi} key={poi.key} />
        ))}
    </Map>
  </div>
  </>
  )
  
};
export default MainMap;     
     
     
