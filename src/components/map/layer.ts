import { RGBAColor } from '@deck.gl/core';
import { GeoJsonLayer, GeoJsonLayerProps } from '@deck.gl/layers';
import { scaleLinear, interpolateViridis, easeCubic as d3EaseCubic } from 'd3';
import { FlyToInterpolator } from 'react-map-gl';

import {
  FeatureCollectionSignature,
  FeatureSignature,
  OnViewStateChange,
  SetSelectedTree,
} from './types';

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

const transitionViewState = (feature, isMobile) => {
  return {
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
  };
};

export const getLayers = (
  isMobile: boolean,
  onViewStateChange: OnViewStateChange,
  trees: FeatureCollectionSignature,
  showTrees: boolean,
  selectedTree: string,
  setSelectedTree: SetSelectedTree
): GeoJsonLayer<FeatureSignature, GeoJsonLayerProps<FeatureSignature>>[] => {
  const getTreeLayer = (): GeoJsonLayer<
    FeatureSignature,
    GeoJsonLayerProps<FeatureSignature>
  > => {
    return new GeoJsonLayer({
      id: 'geojson',
      data: trees.features,

      pickable: true,
      stroked: true,
      filled: true,
      extruded: true,

      visible: showTrees,
      opacity: 1,

      getFillColor: tree => getTreeFill(tree.properties.radolan_sum),
      getRadius: 3,
      pointRadiusMinPixels: 0.5,

      getLineColor: [247, 105, 6, 255],
      getLineWidth: tree => {
        if (selectedTree && tree.properties.id == selectedTree) return 1;
        else return 0;
      },
      lineWidthScale: 1,

      autoHighlight: true,
      highlightColor: [200, 200, 200, 255],

      onClick: ({ object: feature }) => {
        setSelectedTree(feature.properties.id);
        onViewStateChange(transitionViewState(feature, isMobile));
      },

      updateTriggers: {
        getLineWidth: [selectedTree],
      },
    });
  };

  const layers = [getTreeLayer()];

  return layers;
};
