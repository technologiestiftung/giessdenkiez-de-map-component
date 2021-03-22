import React, { FC, useState } from 'react';

import { DeckGL } from '@deck.gl/react';
import { _MapContext as MapContext, StaticMap } from 'react-map-gl';
import { ContextProviderValue } from '@deck.gl/core/lib/deck';
import useSWR from 'swr';

import MapControls from './mapControls';
import PumpHover from './pumpHover';
import Legend from './legend';
import { getLayers } from './layer';

import {
  ViewState,
  OnViewStateChange,
  SetSelectedTree,
  SetLayer,
  HoveredPump,
  SetHoveredPump,
} from './types';

const initialViewState: ViewState = {
  bearing: 0,
  latitude: 52.500869,
  longitude: 13.419047,
  maxZoom: 19,
  minZoom: 9,
  pitch: 45,
  zoom: 11,
};

const fetcher = (url: string, ...args: unknown[]) =>
  fetch(url, ...args).then(res => res.json());

interface MapProps {
  isMobile: boolean;
  viewState: ViewState;
  showTrees: boolean;
  setShowTrees: (v: boolean) => void;
  showPumps: boolean;
  setShowPumps: (v: boolean) => void;
  showRain: boolean;
  setShowRain: (v: boolean) => void;
  selectedTree: string | null;
  setSelectedTree: SetSelectedTree;
  hoveredPump: HoveredPump | null;
  setHoveredPump: SetHoveredPump;
}

const Map: FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const [viewState, setViewState] = useState<ViewState>(initialViewState);

  const [showTrees, setShowTrees] = useState<boolean>(true);
  const [showPumps, setShowPumps] = useState<boolean>(false);
  const [showRain, setShowRain] = useState<boolean>(false);

  const [selectedTree, setSelectedTree] = useState<string | null>(null);

  const [hoveredPump, setHoveredPump] = useState<HoveredPump | null>(null);

  const onViewStateChange = (e: { viewState: ViewState }) =>
    setViewState({ ...viewState, ...e.viewState });

  const setLayer = (layer: string) => {
    let showTrees = false,
      showPumps = false,
      showRain = false;

    switch (layer) {
      case 'trees':
        showTrees = true;
        break;
      case 'pumps':
        showPumps = true;
        break;
      case 'rain':
        showRain = true;
        break;
    }

    setShowTrees(showTrees);
    setShowPumps(showPumps);
    setShowRain(showRain);
  };

  const { data: trees, error: treesError } = useSWR(
    '/assets/trees.json',
    fetcher
  );
  const { data: pumps, error: pumpError } = useSWR(
    '/assets/pumps.json',
    fetcher
  );
  const { data: rain, error: rainError } = useSWR('/assets/rain.json', fetcher);

  if (trees && pumps && rain) {
    const layers = getLayers(
      isMobile,
      onViewStateChange,

      showTrees,
      showPumps,
      showRain,

      trees,
      pumps,
      rain,

      selectedTree,
      setSelectedTree,

      setHoveredPump
    );

    return (
      <>
        {hoveredPump && (
          <PumpHover
            message={hoveredPump.message}
            pointer={hoveredPump.pointer}
          />
        )}
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
            mapboxApiAccessToken={process.env.REACT_APP_API_KEY}
            mapStyle='mapbox://styles/technologiestiftung/ckke3kyr00w5w17mytksdr3ro'
          ></StaticMap>
          <MapControls onViewStateChange={onViewStateChange} />
          <Legend setLayer={setLayer} />
        </DeckGL>
      </>
    );
  } else {
    return <></>;
  }
};
export default Map;
