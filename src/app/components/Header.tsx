import { ReactNode, useEffect } from 'react';
import styles from './Header.module.css';



const Header = () => { 
  //const classes = `card ${className}`; // Combine card class with additional classes

//  useEffect(() => {
//    console.log("users changed inside users")
//  }, [data])
  return (<div className={styles.header}>
    <h1>My First Mappy App</h1>
  </div>)
  
};
export default Header;