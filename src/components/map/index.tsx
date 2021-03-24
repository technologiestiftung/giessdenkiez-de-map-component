import React, { FC, ReactNode, useState } from 'react';

import { DeckGL } from '@deck.gl/react';
import { _MapContext as MapContext, StaticMap } from 'react-map-gl';
import { ContextProviderValue } from '@deck.gl/core/lib/deck';
import useSWR from 'swr';

import MapControls from './mapControls';
import PumpHover from './pumpHover';
import Legend from '../legend';
// import { getLayers } from './layer';

import {
  ViewState,
  OnViewStateChange,
  SetSelectedTree,
  SetLayer,
  HoveredPump,
  SetHoveredPump,
  Feature,
} from './types';
import GeoJsonLayer from '@deck.gl/layers/geojson-layer/geojson-layer';
import { GeoJsonLayerProps } from '@deck.gl/layers';
import { Layer } from 'src/types';

const defaultMapboxApiAccessToken = process.env.REACT_APP_API_KEY;

const defaultMapStyle =
  'mapbox://styles/technologiestiftung/ckke3kyr00w5w17mytksdr3ro';

interface MapProps {
  legend?: ReactNode;
  mapboxApiAccessToken?: string;
  mapStyle?: string;
  viewState: ViewState;
  onViewStateChange: OnViewStateChange;
  layers: Layer<Feature>[];
  // isMobile: boolean;
  // viewState: ViewState;
  // showTrees: boolean;
  // setShowTrees: (v: boolean) => void;
  // showPumps: boolean;
  // setShowPumps: (v: boolean) => void;
  // showRain: boolean;
  // setShowRain: (v: boolean) => void;
  // selectedTree: string | null;
  // setSelectedTree: SetSelectedTree;
  // hoveredPump: HoveredPump | null;
  // setHoveredPump: SetHoveredPump;
}

const Map: FC<MapProps> = ({
  legend = null,
  mapboxApiAccessToken = defaultMapboxApiAccessToken,
  mapStyle = defaultMapStyle,
  viewState,
  onViewStateChange,
  layers,
}: MapProps) => {
  // const setLayer = (layer: string) => {
  //   let showTrees = false,
  //     showPumps = false,
  //     showRain = false;

  //   switch (layer) {
  //     case 'trees':
  //       showTrees = true;
  //       break;
  //     case 'pumps':
  //       showPumps = true;
  //       break;
  //     case 'rain':
  //       showRain = true;
  //       break;
  //   }

  //   setShowTrees(showTrees);
  //   setShowPumps(showPumps);
  //   setShowRain(showRain);
  // };

  // if (!rain || !pumps || !rain) {
  //   return null;
  // } else {
  // const layers = getLayers(
  //   isMobile,
  //   onViewStateChange,

  //   showTrees,
  //   showPumps,
  //   showRain,

  //   trees,
  //   pumps,
  //   rain,

  //   selectedTree,
  //   setSelectedTree,

  //   setHoveredPump
  // );

  return (
    <>
      {/* TODO: */}
      {/* {hoveredPump && (
        <PumpHover
          message={hoveredPump.message}
          pointer={hoveredPump.pointer}
        />
      )} */}
      <DeckGL
        viewState={viewState}
        onViewStateChange={onViewStateChange}
        controller={true}
        layers={layers}
        ContextProvider={
          (MapContext.Provider as unknown) as React.Provider<ContextProviderValue>
        }
      >
        <StaticMap
          mapboxApiAccessToken={mapboxApiAccessToken}
          mapStyle={mapStyle}
        ></StaticMap>
        <MapControls onViewStateChange={onViewStateChange} />
        {legend}
      </DeckGL>
    </>
  );
  // }
};
export default Map;
