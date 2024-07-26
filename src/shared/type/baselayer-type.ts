import { TypeofPet } from '../constain/pet-constain';
import { PositionType, ViewPortType } from './common-type';

export type InfoLayerType = {
  id: string;
  name: string;
  type: TypeofPet;
  loyalty: number;
};
export type AppearanceLayerType = {
  zIndex: number;
  scale: number;
};

export type ActionServerType = {
  updateLayer: (data: any) => void;
  addLayer: (data: any) => void;
  deleteLayer: (ids: any) => void;
  updateCurrentPet: (data: any) => void;
};

export type BaseLayerType = {
  info: InfoLayerType;
  position: PositionType;
  viewPort: ViewPortType;
  actionServer: ActionServerType;
  appearance: AppearanceLayerType;
};
