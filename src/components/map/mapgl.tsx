import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';
import ReactMapGL, { NavigationControl, GeolocateControl } from 'react-map-gl';

const initialState = {
  bearing: 0,
  latitude: 52.500869,
  longitude: 13.419047,
  maxZoom: 19,
  minZoom: 9,
  pitch: 45,
  zoom: 11,
};

type Viewport = typeof initialState;

const MAPBOX_TOKEN = process.env.REACT_APP_API_KEY;

interface StyledControlWrapper {
  isNavOpen?: boolean;
}

const ControlWrapper = styled.div<StyledControlWrapper>`
  position: absolute;
  bottom: 12px;
  left: 12px;
  z-index: 2;
  transition: transform 500ms;

  @media screen and (min-width: ${p => p.theme.screens.tablet}) {
    transform: ${props =>
      props.isNavOpen ? 'translate3d(350px, 0, 0)' : 'none'};
  }
`;

const MapGL = () => {
  const [viewport, setViewport] = useState(initialState);

  return (
    <ReactMapGL
      reuseMaps
      mapStyle='mapbox://styles/technologiestiftung/ckke3kyr00w5w17mytksdr3ro'
      {...viewport}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      onViewportChange={(nextViewport: Viewport) => setViewport(nextViewport)}
      onLoad={(i: any) => console.log(i)}
      width='100vw'
      height='100vh'
    >
      <ControlWrapper /*TODO:*/ isNavOpen={false}>
        <GeolocateControl
          style={{ position: 'static' }}
          positionOptions={{ enableHighAccuracy: true }}
          // TODO:
          // trackUserLocation={isMobile ? true : false}
          showUserLocation={true}
          onGeolocate={(e: any) => {
            console.log(e);
          }}
        />
        <NavigationControl
          style={{ position: 'static' }}
          showCompass={false}
          onViewStateChange={(e: any) =>
            setViewport({ ...viewport, ...e.viewState })
          }
        />
      </ControlWrapper>
    </ReactMapGL>
  );
};

export default MapGL;
