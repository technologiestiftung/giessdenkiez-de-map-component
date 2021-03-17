import React, { FC, useState } from 'react';

import { DeckGL } from '@deck.gl/react';
import { _MapContext as MapContext, StaticMap } from 'react-map-gl';
import { ContextProviderValue } from '@deck.gl/core/lib/deck';
import useSWR from 'swr';

import MapControls from './mapControls';
import {
  ViewState,
  OnViewStateChange,
  SetSelectedTree,
  SetLayer,
  HoveredPump,
  SetHoveredPump,
} from './types';

// import trees from '../../assets/small_trees.json';
// import trees from '../../assets/trees_medium.json';
import { getLayers } from './layer';

//TODO: Remove Legend
import styled from 'styled-components';
import layer from '@deck.gl/core/lib/layer';
const Legend = styled.div`
  z-index: 2;
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: white;
  :hover {
    cursor: pointer;
  }
  p {
    font-size: 12px;
    margin: 0;
    padding: 6px 12px;
  }
  p:hover {
    background: #aaa;
  }
`;
const fetcher = (url, ...args) => fetch(url, ...args).then(res => res.json());

interface Props {
  isMobile: boolean;

  viewState: ViewState;
  onViewStateChange: OnViewStateChange;

  showTrees: boolean;
  showPumps: boolean;
  showRain: boolean;
  setLayer: SetLayer;

  selectedTree: string;
  setSelectedTree: SetSelectedTree;

  hoveredPump: HoveredPump;
  setHoveredPump: SetHoveredPump;
}

const MapLayer = ({
  isMobile,

  viewState,
  onViewStateChange,

  showTrees,
  showPumps,
  showRain,
  setLayer,

  selectedTree,
  setSelectedTree,

  hoveredPump,
  setHoveredPump,
}: Props): JSX.Element => {
  // const trees_ = fetch('http://localhost:8080/assets/trees.json').then(res =>
  //   res.json()
  // );

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
    // console.log('They all loaded', new Date().toISOString());

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

      hoveredPump,
      setHoveredPump
    );

    // console.log('Layer loaded', new Date().toISOString());

    return (
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
        <Legend>
          {['trees', 'pumps', 'rain'].map((layer, key) => {
            return (
              <p key={key} onClick={() => setLayer(layer)}>
                {layer}
              </p>
            );
          })}
        </Legend>
      </DeckGL>
    );
  } else {
    // console.log('Not quite loaded yet :(', new Date().toISOString());

    return <></>;
  }
};

export default MapLayer;
