export interface Generic {
  [key: string]: any;
}

export interface ViewState {
  bearing: number;
  latitude: number;
  longitude: number;
  maxZoom: number;
  minZoom: number;
  pitch: number;
  zoom: number;
}

export interface Feature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[] | number[][];
  };
  properties: {
    id: string | number;
  };
}

export interface TreeFeature extends Feature {
  properties: {
    id: string;
    radolan_sum?: number;
    age: number;
  };
}

export interface PumpFeature extends Feature {
  properties: {
    id: number;
    'addr:full': string;
    check_date: string;
    image: string;
    'pump:status': string;
    'pump:style': string;
  };
}

export interface RainFeature extends Feature {
  properties: {
    id: number;
    data: number[];
  };
}

export interface FeatureCollection {
  type: string;
  features: TreeFeature[] | PumpFeature[] | RainFeature[];
}

export type OnViewStateChange = (e: unknown) => void;
export type SetSelectedTree = (id: string) => void;
export type SetLayer = (layer: string) => void;

export interface HoveredPump {
  message: string;
  pointer: number[];
}

export type SetHoveredPump = (info: HoveredPump) => void;

//Color.ts
export type RGBAColor = [number, number, number, number];

export interface Color extends Generic {
  name: string;
  rgba: RGBAColor;
  hex: string;
}
