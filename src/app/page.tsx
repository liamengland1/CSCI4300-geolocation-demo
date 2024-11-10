'use client'

import Image from "next/image";
import Header from "./components/Header";
import MainMap from "./components/MainMap";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import { APIProvider } from "@vis.gl/react-google-maps";

export default function Home() {
  // add function here to update map based on sidebar selection
  // or make make mainmap a container to hold map and call usemap hook here

  /*useEffect(() => {
    map.setProps({
      style: { width: "auto", height: "100vh" },
      defaultCenter: { lat: 22.54992, lng: 0 },
      defaultZoom: 3,
      gestureHandling: "greedy",
      disableDefaultUI: true,
    });
  }, []);*/
  return (
    <div>
     <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!!}>

      <Header />
      <Main />

      </APIProvider>
      


    </div>
    
  );
}
