import { Container, Graphics } from 'pixi.js';

import { moveConfig } from 'src/config/pet-config';
import { Keys } from 'src/shared/constain';
import {
  AppearanceType,
  BaseOptionLayer,
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
    this.container.zOrder = this.appearance.zIndex;
    this.appearance.height && (this.container.height = this.appearance.height);
    this.appearance.width && (this.container.width = this.appearance.width);

    this.container.scale.x = this.appearance.scale || 1;
    this.container.scale.y = this.appearance.scale || 1;
    this.listenKeyDown();
  }
  update() {}
  move() {
    let key = this.key[0];
    if (key && moveConfig[key]) {
      let { x, y } = moveConfig[key];
      x != 0 && (this.position.x += x * this.stats.speed);
      y != 0 && (this.position.y += y * this.stats.speed);
      this.container.position.x = this.position.x;
      this.container.position.y = this.position.y;
    }
  }
  getGraphics(color: number) {
    const graphics = new Graphics();
    graphics.beginFill(color, 1);
    graphics.drawCircle(0, 0, 50);
    graphics.endFill();
    return graphics;
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
