'use client'

import Image from "next/image";
import Header from "./components/Header";
import MainMap from "./components/MainMap";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import { APIProvider } from "@vis.gl/react-google-maps";

export default function Home() {

  return (
    <div>
     <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!!}>

      <Header />
      <Main />

      </APIProvider>
      


    </div>
    
  );
}
