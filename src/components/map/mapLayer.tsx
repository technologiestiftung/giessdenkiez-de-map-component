import React, { FC, useState } from 'react';

import { DeckGL } from '@deck.gl/react';
import { _MapContext as MapContext, StaticMap } from 'react-map-gl';
import { ContextProviderValue } from '@deck.gl/core/lib/deck';

import MapControls from './mapControls';
import { OnViewStateChange, ViewState } from './types';

import trees from '../../assets/small_trees.json';
import { getLayers } from './layer';
import { GeoJsonLayer, GeoJsonLayerProps } from '@deck.gl/layers';

interface Props {
  viewState: ViewState;
  onViewStateChange: OnViewStateChange;
}

const MapLayer = ({ viewState, onViewStateChange }: Props): JSX.Element => {
  // const layers = getLayers(trees);

  const layers = [
    new GeoJsonLayer({
      id: 'geojson-layer',
      data: trees.features,
      pickable: true,
      stroked: false,
      filled: true,
      extruded: true,
      lineWidthScale: 20,
      lineWidthMinPixels: 2,
      getFillColor: [255, 0, 0, 200],
      getLineColor: [0, 255, 0, 200],
      getRadius: 10,
      getLineWidth: 1,
      getElevation: 30,
    }),
  ];

  return (
    <DeckGL
      viewState={viewState}
      onViewStateChange={onViewStateChange}
      controller={true}
      layers={getLayers(onViewStateChange, trees)}
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
