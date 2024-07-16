'use client';

import { Application, Container, ResizePlugin, TickerPlugin } from 'pixi.js';

import { KeysType } from 'src/shared/type/pet-type';

import { Keys } from 'src/shared/constain';
import { BaseLayer } from './_layer/base_layer';
import { PetLayer } from './_layer/pet_layer';
import { defaultApplication, zindex } from 'src/config/pet-config';
import { BackgroundLayer } from './_layer/bg_layer';
import { Layer, Stage } from '@pixi/layers';

!Application._plugins.includes(TickerPlugin) && Application._plugins.push(TickerPlugin);
!Application._plugins.includes(ResizePlugin) && Application._plugins.push(ResizePlugin);

export class ApplicationCustom extends Application {
  petLayers: BaseLayer[];
  currentPet: PetLayer;

  background: BackgroundLayer;
  constructor(option: any) {
    super({
      ...defaultApplication,
      ...option,
    });
    this.petLayers = [];
    this.currentPet = new PetLayer({
      ...option.dataPet,
    });
    this.petLayers.push(this.currentPet);
    this.background = new BackgroundLayer({
      x: this.currentPet.position.x,
      y: this.currentPet.position.y,
      zIndex: zindex.bg,
      scale: 2,
    });
    this.init();
    this.loop();
    this.event();
  }
  init() {
    this.stage = new Stage();

    let layer = new Layer();
    let container = new Container();

    this.ticker.maxFPS = 60;
    this.stage.eventMode = 'static';
    this.stage.hitArea = this.screen;
    this.renderer.plugins.interaction.autoPreventDefault = false;
    this.renderer.view.style && (this.renderer.view.style.touchAction = 'auto');

    layer.group.enableSort = true;
    container.parentLayer = layer;

    container.addChild(this.background.container);
    container.addChild(this.currentPet.container);
    this.stage.addChild(layer);
    this.stage.addChild(container);
  }
  render() {
    this.renderer.render(this.stage);
  }
  loop() {
    this.ticker.add(() => {});
  }
  event() {}
}
