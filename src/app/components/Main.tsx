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
}

interface PinFromGeoJson {
    id: string;
    lat: number;
    lng: number;
}

//const locs_init: Poi[] = [{key: '0', location: {lat: 22.54992, lng: 0}}];



const Main = () => {

    const [locations, setLocations] = useState<Poi[]>([]);

    function addPin(id: string, aLat: number, aLng: number) {
        const newLocations = [...locations, {key: id, location: {lat: aLat, lng: aLng}}];
        setLocations(newLocations);
    }

    function addManyPins(pins: PinFromGeoJson[]) {
        const newLocations = pins.map((pin) => {
            return {key: pin.id, location: {lat: pin.lat, lng: pin.lng}};
        });
        setLocations(newLocations);
    }

    return (<div className={styles['main-two-col']}>
        <APIProvider apiKey={'AIzaSyCs_BHP81XgibP5PIBUvGe5SsI4M0_3XJU'}>
            <Sidebar addPinFunc={addManyPins}/>
          <MainMap locations={locations} />
        </APIProvider>

    </div>)
}
export default Main;

