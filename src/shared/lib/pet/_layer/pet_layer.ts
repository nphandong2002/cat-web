import { Skin, Spine, SkeletonData } from '@pixi-spine/runtime-4.1';

import { Keys } from 'src/shared/constain';
import { action, feeling, idleType } from 'src/shared/constain/pet-constain';
import { PetOptionLayer } from 'src/shared/type/pet-type';

import { BaseLayer } from './base_layer';

export class PetLayer extends BaseLayer {
  constructor(option: PetOptionLayer) {
    super({
      ...option.info,
      ...option.appearance,
      ...option.position,
      ...option.stats,
    });
  }
}
