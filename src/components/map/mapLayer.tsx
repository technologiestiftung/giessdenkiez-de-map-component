import React, { FC, useState } from 'react';

import { DeckGL } from '@deck.gl/react';
import { _MapContext as MapContext, StaticMap } from 'react-map-gl';
import { ContextProviderValue } from '@deck.gl/core/lib/deck';

import MapControls from './mapControls';
import { ViewState, OnViewStateChange, SetSelectedTree } from './types';

// import trees from '../../assets/small_trees.json';
import trees from '../../assets/trees_medium.json';
import { getLayers } from './layer';

interface Props {
  isMobile: boolean;
  viewState: ViewState;
  onViewStateChange: OnViewStateChange;
  selectedTree: string;
  setSelectedTree: SetSelectedTree;
}

const MapLayer = ({
  isMobile,
  viewState,
  onViewStateChange,
  selectedTree,
  setSelectedTree,
}: Props): JSX.Element => {
  const layers = getLayers(
    isMobile,
    onViewStateChange,
    trees,
    true,
    selectedTree,
    setSelectedTree
  );

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
    </DeckGL>
  );
};

export default MapLayer;
