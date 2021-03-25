import React, { FC, useEffect, useReducer, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './assets/theme';
import useSWR from 'swr';

import Map from './components/map';
import Legend from './components/legend';
import PumpHover from './components/pumpHover';
import { getLayers } from './components/layer';

import {
  HoveredPump,
  ViewState,
  Layer,
  PumpFeature,
  RainFeature,
  TreeFeature,
  WhichLayerReducer,
  WhichLayer,
  AgeRange,
} from './types';

const fetcher = (url: string, ...args: unknown[]) =>
  fetch(url, ...args).then(res => res.json());

const initialViewState: ViewState = {
  bearing: 0,
  latitude: 52.500869,
  longitude: 13.419047,
  maxZoom: 19,
  minZoom: 9,
  pitch: 45,
  zoom: 11,
};

const whichLayerReducer: WhichLayerReducer = (previousWhichLayer, layer) => {
  for (const key in previousWhichLayer) {
    previousWhichLayer[key] = false;
  }

  const whichLayer: WhichLayer = { ...previousWhichLayer };

  whichLayer['show' + layer.replace(/^\w/, c => c.toUpperCase())] = true;

  return whichLayer;
};

function App(): JSX.Element {
  const [isMobile, setIsMobile] = useState(false);
  const [viewState, setViewState] = useState<ViewState>(initialViewState);

  const [selectedTree, setSelectedTree] = useState<string | null>(null);
  const [hoveredPump, setHoveredPump] = useState<HoveredPump | null>(null);
  const [ageRange, setAgeRange] = useState<AgeRange>([0, 320]);

  const [whichLayer, whichLayerDispatch] = useReducer(whichLayerReducer, {
    showTrees: true,
    showWatered: false,
    showAdopted: false,
    showPumps: false,
    showRain: false,
  });

  const onViewStateChange = (e: { viewState: ViewState }) =>
    setViewState({ ...viewState, ...e.viewState });

  const { data: trees, error: treesError } = useSWR(
    '/assets/trees.json',
    fetcher
  );
  const { data: pumps, error: pumpError } = useSWR(
    '/assets/pumps.json',
    fetcher
  );
  const { data: rain, error: rainError } = useSWR('/assets/rain.json', fetcher);
  const { data: communityData, error: communityDataError } = useSWR(
    '/assets/communityData.json',
    fetcher
  );

  if (!trees || !pumps || !rain || !communityData) {
    return null;
  } else {
    const data = { trees, pumps, rain, communityData };

    return (
      <div className='App'>
        <ThemeProvider theme={theme}>
          <Map
            legend={<Legend setLayer={whichLayerDispatch} />}
            pumpHover={
              hoveredPump &&
              isMobile && (
                <PumpHover
                  message={hoveredPump.message}
                  pointer={hoveredPump.pointer}
                />
              )
            }
            viewState={viewState}
            onViewStateChange={onViewStateChange}
            layers={getLayers({
              isMobile,
              onViewStateChange,
              whichLayer,
              data,
              selectedTree,
              setSelectedTree,
              setHoveredPump,
              ageRange,
            })}
          />
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
