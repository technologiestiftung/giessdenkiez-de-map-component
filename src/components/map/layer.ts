import { RGBAColor } from '@deck.gl/core';
import { GeoJsonLayer, GeoJsonLayerProps } from '@deck.gl/layers';
import { scaleLinear, interpolateViridis, easeCubic as d3EaseCubic } from 'd3';
import { FlyToInterpolator } from 'react-map-gl';

import {
  FeatureCollectionSignature,
  FeatureSignature,
  OnViewStateChange,
} from './types';

const isMobile = false;
// type GeoJsonLayerSignature = typeof GeoJsonLayer<FeatureSignature>;

const getTreeFill = (radolan: number): RGBAColor => {
  const scale = scaleLinear().domain([0, 300]).range([1, 0.6]);
  const hex = interpolateViridis(scale(radolan)).substr(1).match(/.{2}/g);

  return [
    parseInt(hex[0], 16),
    parseInt(hex[1], 16),
    parseInt(hex[2], 16),
    200,
  ];
};

const onTreeClick = (
  feature: FeatureSignature,
  onViewStateChange: OnViewStateChange
) => {
  onViewStateChange({
    viewState: {
      latitude: feature.geometry.coordinates[1],
      longitude: feature.geometry.coordinates[0],
      zoom: 19,
      maxZoom: 19,
      transitionDuration: 2000,
      transitionEasing: d3EaseCubic,
      transitionInterpolator: new FlyToInterpolator(),
      minZoom: isMobile ? 11 : 9,
      pitch: isMobile ? 0 : 45,
      bearing: 0,
    },
  });
};

export const getLayers = (
  onViewStateChange: OnViewStateChange,
  trees: FeatureCollectionSignature
): GeoJsonLayer<FeatureSignature, GeoJsonLayerProps<FeatureSignature>>[] => {
  const layers = [
    new GeoJsonLayer({
      id: 'geojson',
      data: trees.features,

      pickable: true,
      stroked: false,
      filled: true,
      extruded: true,

      opacity: 1,
      getRadius: 10,

      // lineWidthScale: 1,
      // lineWidthMinPixels: 2,
      // getLineColor: [255, 0, 0, 255],
      // getLineWidth: 0.1,
      // getElevation: 30,

      getFillColor: tree => getTreeFill(tree.properties.radolan_sum),
      onClick: ({ object }) => {
        onTreeClick(object, onViewStateChange);
      },
    }),
  ];

  return layers;
};
