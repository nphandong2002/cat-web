"use client";

import { Layer, Stage } from "@pixi/layers";
import { Application, Container, TickerPlugin } from "pixi.js";

!Application._plugins.includes(TickerPlugin) && Application._plugins.push(TickerPlugin);

export class ApplicationCustom extends Application {
  layer: Layer;
  pets: Container;
  constructor() {
    super({
      backgroundColor: "#fff",
      backgroundAlpha: 0,
      clearBeforeRender: true,
      context: null,
      antialias: true,
      powerPreference: "default",
      premultipliedAlpha: true,
      preserveDrawingBuffer: true,
      hello: true,
    });
    this.layer = new Layer();
    this.layer.group.enableSort = true;
    this.pets = new Container();
    this.stage = new Stage();
    this.pets.parentLayer = this.layer;
    this.pets.zOrder = 4;
    this.stage.addChild(this.layer);
    this.stage.addChild(this.pets);
    this.renderer.plugins.interaction.autoPreventDefault = false;
    this.renderer.view.style && (this.renderer.view.style.touchAction = "auto");
    this.ticker.maxFPS = 60;
  }
}
