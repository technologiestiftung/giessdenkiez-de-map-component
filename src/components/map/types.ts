export interface ViewState {
  bearing: number;
  latitude: number;
  longitude: number;
  maxZoom: number;
  minZoom: number;
  pitch: number;
  zoom: number;
}

export interface FeatureCollectionSignature {
  type: string;
  features: FeatureSignature[];
}

export interface FeatureSignature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    id: string;
    radolan_sum: number;
    age: number;
  };
}

export type OnViewStateChange = (e: unknown) => void;
export type SetSelectedTree = (id: string) => void;
