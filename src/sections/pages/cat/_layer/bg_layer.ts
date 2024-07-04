import { Container, Sprite } from "pixi.js";
import { optionLayerType } from "../cat-type";
import { BaseLayer } from "./base_layer";

export class BackgroundLayer extends BaseLayer {
  constructor(op: optionLayerType) {
    super(op);
    const bg = Sprite.from("bg/background.png");
    this.container.addChild(bg);
  }
}
