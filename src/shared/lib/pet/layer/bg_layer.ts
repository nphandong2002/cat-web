import { Sprite } from "pixi.js";

import { DynamicOptionLayer } from "src/shared/type/pet-type";

import { DynamicLayer } from "../../layer/base/dynamic_layer";
export class BackgroundLayer extends DynamicLayer {
  height: number;
  width: number;
  constructor(option: DynamicOptionLayer) {
    super({
      ...option,
    });
    const bg = Sprite.from("bg/background.png");
    this.height = bg._texture.height;
    this.width = bg._texture.width;
    this.container.addChild(bg);
  }
}
