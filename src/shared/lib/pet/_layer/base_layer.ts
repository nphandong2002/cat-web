import { Container } from 'pixi.js';

import { moveConfig } from 'src/config/pet-config';
import {
  AppearanceType,
  BaseOptionLayer,
  EffectType,
  InfoType,
  KeysType,
  PositionType,
  StatsType,
  StatusType,
} from 'src/shared/type/pet-type';
export class BaseLayer {
  info: InfoType;
  key: KeysType[];
  stats: StatsType;
  effects: StatusType;
  container: Container;
  position: PositionType;
  appearance: AppearanceType;
  constructor(option: BaseOptionLayer) {
    this.container = new Container();
    this.position = {
      x: option.x,
      y: option.y,
    };
    this.info = {
      name: option.name,
      loyalty: option.loyalty,
    };
    this.stats = {
      speed: option.speed,
      dame: option.dame,
      attackSpeed: option.attackSpeed,
    };
    this.appearance = {
      height: option.height,
      width: option.width,
      zIndex: option.zIndex,
      scale: option.scale,
    };
    this.key = [];
    this.effects = [];
    this.container.x = this.position.x;
    this.container.y = this.position.y;
    this.container.zIndex = this.appearance.zIndex;
    this.container.scale.x = this.appearance.scale;
    this.container.scale.y = this.appearance.scale;
    this.listenKeyDown();
  }
  listenKeyDown() {
    const keydownHandle = (e: KeyboardEvent) => {
      if (!this.key.some((a) => a == e.keyCode)) this.key.unshift(e.keyCode);
    };
    const keyupHandle = (e: KeyboardEvent) => {
      if (this.key.some((a) => a == e.keyCode)) {
        this.key.splice(
          this.key.findIndex((a) => a == e.keyCode),
          1,
        );
      }
      window.addEventListener('visibilitychange', () => {
        document.hidden && (this.key = []);
      });
      window.addEventListener('keydown', keydownHandle);
      window.addEventListener('keyup', keyupHandle);
    };
  }
}
