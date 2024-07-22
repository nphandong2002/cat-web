import { Keys } from 'src/shared/constain';
import { moveConfig } from 'src/config/pet-config';
import { DynamicOptionLayer, KeysType, StatsType, StatusType } from 'src/shared/type/pet-type';

import { BaseLayer } from './base_layer';

export class DynamicLayer extends BaseLayer {
  stats: StatsType;
  effects: StatusType;
  key: KeysType[];

  constructor(option: DynamicOptionLayer) {
    super(option);
    this.stats = {
      speed: option.speed,
      dame: option.dame,
      attackSpeed: option.attackSpeed,
    };
    this.key = [];
    this.effects = [];

    this.listenKeyDown();
  }
  move() {
    let key = this.key[0];
    if (key && moveConfig[key]) {
      let { x, y } = moveConfig[key];
      this.setPosition(this.position.x + x * this.stats.speed, this.position.y + y * this.stats.speed);
    }
  }
  listenKeyDown() {
    const keydownHandle = (e: KeyboardEvent) => {
      if (Object.values(Keys).includes(e.key as Keys) && !this.key.some((a) => a == e.key))
        this.key.unshift(e.key as Keys);
    };
    const keyupHandle = (e: KeyboardEvent) => {
      if (Object.values(Keys).includes(e.key as Keys) && this.key.some((a) => a == e.key)) {
        setTimeout(() => {
          this.key.splice(
            this.key.findIndex((a) => a == e.key),
            1,
          );
        }, 50);
      }
    };
    window.addEventListener('visibilitychange', () => {
      document.hidden && (this.key = []);
    });
    window.addEventListener('keydown', keydownHandle);
    window.addEventListener('keyup', keyupHandle);
  }
}
