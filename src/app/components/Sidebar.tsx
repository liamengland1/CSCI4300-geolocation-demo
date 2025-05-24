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
  propsForInfoWindow?: any;
}

interface SidebarProps {
  addPinFunc: (pins: PinFromGeoJson[]) => void;
  addCurrentLocPinFunc: (lat: number, lng: number) => void;
  clearPinsFunc: () => void;
}

const Sidebar = ({ addPinFunc, addCurrentLocPinFunc, clearPinsFunc }: SidebarProps) => { 

  const map = useMap();
  //const s = useMapsLibrary('marker');
  //console.log(map);

  const navigateToCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (map == null) {
        return;
      } else {
      addCurrentLocPinFunc(position.coords.latitude, position.coords.longitude);
      map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
      map.setZoom(13);
    }
    });
  }

  const mcdonaldsTime = () => {
    const pinsToAdd: PinFromGeoJson[] = [];
    if (map == null) {
      return;
    } else {
      fetch('https://alltheplaces-data.openaddresses.io/runs/2025-05-17-13-31-55/output/mcdonalds.geojson')
        .then(response => response.json())
        .then(data => {
          //console.log(data);
          for (let i = 0; i<data.features.length; i++) {
            const feature = data.features[i];
            const coords = feature.geometry.coordinates;
            if (map.getBounds()?.contains({lat: coords[1], lng: coords[0]}) == true) {
            pinsToAdd.push({id: feature.id, lat: coords[1], lng: coords[0], propsForInfoWindow: feature.properties});
            console.log(data.features[i]);
            }
            else {
              console.log('skipped, not in bounds');
            }
            //const marker = new AdvancedMarkerElement({position: {lat: coords[1], lng: coords[0]}});
            //marker.setMap(map);
            //
          }
          addPinFunc(pinsToAdd);
        }
        )
    }
  }

  const chickfilaTime = () => {
    const pinsToAdd: PinFromGeoJson[] = [];
    if (map == null) {
      return;
    } else {
      fetch('https://alltheplaces-data.openaddresses.io/runs/2025-05-17-13-31-55/output/chick_fil_a.geojson')
        .then(response => response.json())
        .then(data => {
          //console.log(data);
          for (let i = 0; i<data.features.length; i++) {
            const feature = data.features[i];
            const coords = feature.geometry.coordinates;
            if (map.getBounds()?.contains({lat: coords[1], lng: coords[0]}) == true) {
              pinsToAdd.push({id: feature.id, lat: coords[1], lng: coords[0], propsForInfoWindow: feature.properties});
              console.log(data.features[i]);
            }
            else {
              console.log('skipped, not in bounds');
            }
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
    <h2>Menu</h2>
    <ul className={styles.list}>
        <button className={styles.button} id={styles['mcdonalds-button']} onClick={mcdonaldsTime}>I'm lovin' it!</button>
        <button className={styles.button} id={styles['chickfila-button']} onClick={chickfilaTime}>Chick-fil-A</button>
        <br>
        </br>
        <br></br>
        <br></br>
        <button className={styles.button} onClick={navigateToCurrentLocation}>Click me to go to your current location</button>
        <button className={styles.button} onClick={()=>{
          confirm('Are you sure you want to clear the map?') && clearPinsFunc();
        }}>Clear Map</button>
    </ul>
  </div>)
  
};
export default Sidebar;
