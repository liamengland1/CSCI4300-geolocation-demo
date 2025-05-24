import { useAdvancedMarkerRef, AdvancedMarker, InfoWindow, Pin, useMap } from "@vis.gl/react-google-maps";
import { useCallback } from "react";


interface Poi {
  key: string;
  location: google.maps.LatLngLiteral;
  propsForInfoWindow?: {
    '@spider'?: string;
    name?: string;
    'addr:street_address'?: string;
    'addr:city'?: string;
    'addr:state'?: string;
    opening_hours?: string;
  };
}

interface MarkerWithInfoWindowProps {
    poi: Poi;
    isOpen: boolean;
    onClick: () => void;
  }

const MarkerWithInfoWindow = ({poi, isOpen, onClick}: MarkerWithInfoWindowProps) => {
    // `markerRef` and `marker` are needed to establish the connection between
    // the marker and infowindow (if you're using the Marker component, you
    // can use the `useMarkerRef` hook instead).
    const [markerRef, marker] = useAdvancedMarkerRef();
    
    // clicking the marker will toggle the infowindow

    // if the maps api closes the infowindow, we have to synchronize our state
    //const handleClose = useCallback(() => setInfoWindowShown(false), []);

    // conditional styling based on infowindow text
    // mcdonalds, etc

    //console.log(children);

    const poi_data = poi.propsForInfoWindow || {};
    const chain_name = poi_data['@spider'] || '';

    function getPinProps () {
        if (chain_name == 'mcdonalds') {
            return {background: '#FBBC04', glyphColor: '#000', borderColor: '#000'};
        }
        else if (chain_name == 'chick_fil_a') {
          return {background: '#dd0031', glyphColor: '#000', borderColor: '#000'};
        }
        else {
          return {background: '#4a80f5', glyphColor: '#d1cdcd', borderColor: '#000'};
        }
    }

    const map = useMap();

    const handleMarkerClick = useCallback(
      (ev: google.maps.MapMouseEvent) => {
        if (!map || !ev.latLng) return;
        map.panTo(ev.latLng);
        onClick();
      },
      [map, onClick]
    );
      
    return (
      <>
        <AdvancedMarker
          ref={markerRef}
          position={poi.location}
          onClick={handleMarkerClick}
        >
                      <Pin {...getPinProps()} />

        </AdvancedMarker>

         
  
        {isOpen && (
          <InfoWindow anchor={marker} onClose={() => onClick()}>
            {(chain_name != '') ? (
            <div className={chain_name}>
                    
                    <h3><span className='reset-font-weight'>This {poi_data['name']} is located at</span>
                    <br></br>
                    <span>{poi_data['addr:street_address']}, {poi_data['addr:city']}, {poi_data['addr:state']}</span>
                    <br></br> 
                    <span className='reset-font-weight'>and is open from</span>
                    <br></br>
                    <span>{poi_data['opening_hours']}</span>
                    </h3>
                    
              </div>) : (
                <div className={'currentlocation'}>
                  <h2>You are here</h2>
                </div>
              )}
          </InfoWindow>
        )}
      </>
    );
  };

  export default MarkerWithInfoWindow;