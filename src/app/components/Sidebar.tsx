import { ReactNode, useEffect } from 'react';
import styles from './Sidebar.module.css';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';


interface PinFromGeoJson {
  id: string;
  lat: number;
  lng: number;
}

interface SidebarProps {
  addPinFunc: (pins: PinFromGeoJson[]) => void;
}

const Sidebar = ({ addPinFunc }: SidebarProps) => { 

  const map = useMap();
  //const s = useMapsLibrary('marker');
  //console.log(map);

  const navigateToCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (map == null) {
        return;
      } else {
      map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
      map.setZoom(12);
    }
    });
  }

  const mcdonaldsTime = () => {
    const pinsToAdd: PinFromGeoJson[] = [];
    if (map == null) {
      return;
    } else {
      fetch('https://alltheplaces-data.openaddresses.io/runs/2024-11-02-13-32-13/output/mcdonalds.geojson')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          for (let i = 0; i<data.features.length; i++) {
            const feature = data.features[i];
            const coords = feature.geometry.coordinates;
            pinsToAdd.push({id: feature.id, lat: coords[1], lng: coords[0]});
            //const marker = new AdvancedMarkerElement({position: {lat: coords[1], lng: coords[0]}});
            //marker.setMap(map);
            //
          }
          addPinFunc(pinsToAdd);
        }
        )
    }
  }

  return (<div className={styles.sidebar}>
    <h2>Menu!!!</h2>
    <ul>
        <li onClick={navigateToCurrentLocation}>Click me to go to your current location</li>
        <li onClick={mcdonaldsTime}>I'm lovin' it!</li>
        <li>Settings</li>
    </ul>
  </div>)
  
};
export default Sidebar;
