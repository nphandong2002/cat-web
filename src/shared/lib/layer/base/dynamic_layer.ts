import { DynamicOptionLayer, KeysType, StatsLayerType, StatusType } from 'src/shared/type/pet-type';

import { BaseLayer } from './base_layer';

export class DynamicLayer extends BaseLayer {
  status: StatusType;
  stats: StatsLayerType;

  constructor(option: DynamicOptionLayer) {
    super(option);
    this.status = option.status;
    this.stats = option.stats;
  }
}
