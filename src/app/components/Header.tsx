'use client'

import styles from './Header.module.css';
import { PlaceAutocompleteClassic } from './Autocomplete';
import { useMap } from '@vis.gl/react-google-maps';



const Header = () => { 
  //const classes = `card ${className}`; // Combine card class with additional classes

//  useEffect(() => {
//    console.log("users changed inside users")
//  }, [data])

  const map = useMap(); 
  
  return (<div className={styles.header}>
    <h1>My First Mappy App</h1>
    <div className={styles['search-bar-container']}>Zoom to a place: <PlaceAutocompleteClassic onPlaceSelect={(place)=>{
      
      console.log(place);
      if (map == null) {
        console.log('bruh')
        return;
      } else {
        if (place != null && place.geometry != null) {
        map.panTo(place.geometry.location as google.maps.LatLng);
        map.setZoom(11);
      }
      
      
      }}} /></div>
    
  </div>)
  
};
export default Header;