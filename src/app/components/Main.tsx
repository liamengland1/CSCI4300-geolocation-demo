'use client'

import { ReactNode, useState } from 'react';
//import './Card.css';
import styles from './Main.module.css';
import { APIProvider } from '@vis.gl/react-google-maps';
import MainMap from './MainMap';
import Sidebar from './Sidebar';

interface MainProps {
    className?: string; // Optional additional CSS classes
    children: ReactNode; // Content inside the main body
  }

  // make thisa  two column grid  - 30 70
  /*
const Main: React.FC<MainProps> = ({ className = '', children }) => {
  const classes = `${className}`; // Combine card class with additional classes

  return <div className={styles['main-two-col']}>{children}</div>;
};*/

interface Poi {
    key: string;
    location: google.maps.LatLngLiteral;
    propsForInfoWindow?: any;
}

interface PinFromGeoJson {
    id: string;
    lat: number;
    lng: number;
    propsForInfoWindow?: any;
}

//const locs_init: Poi[] = [{key: '0', location: {lat: 22.54992, lng: 0}}];



const Main = () => {

    const [locations, setLocations] = useState<Poi[]>([]);
    const [currentLoc, setCurrentLoc] = useState<Poi>();

    /*function addPin(id: string, aLat: number, aLng: number) {
        const newLocations = [...locations, {key: id, location: {lat: aLat, lng: aLng}}];
        setLocations(newLocations);
    }*/

    function addManyPins(pins: PinFromGeoJson[]) {
        setLocations((prevLocations) => {
            const newPins = pins.filter(
                (pin) => !prevLocations.some((location) => location.key === pin.id)
            );

            const formattedNewPins = newPins.map((pin) => ({
                key: pin.id,
                location: { lat: pin.lat, lng: pin.lng },
                propsForInfoWindow: pin.propsForInfoWindow,
            }));

            return [...prevLocations, ...formattedNewPins];
        });
    }

    function updateCurrentLoc(aLat: number, aLng: number) {
        setCurrentLoc({key: 'current', location: {lat: aLat, lng: aLng}});
    }

    function clearPins() {
        setLocations([]);
        setCurrentLoc(undefined);
    }

    return (<div className={styles['main-two-col']}>
            <Sidebar addPinFunc={addManyPins} addCurrentLocPinFunc={updateCurrentLoc} clearPinsFunc={clearPins} />
          <MainMap mcdonaldsLocations={locations} currentLoc={currentLoc} />

    </div>)
}
export default Main;

