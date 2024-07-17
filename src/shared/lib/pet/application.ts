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
  moveLayer: BaseLayer[];
  currentPet: PetLayer;

  background: BackgroundLayer;
  constructor(option: any) {
    super({
      ...defaultApplication,
      ...option,
    });
    this.moveLayer = [];
    this.currentPet = new PetLayer({
      ...option.dataPet,
      resources: option.resources,
    });
    this.background = new BackgroundLayer({
      x: this.currentPet.position.x,
      y: this.currentPet.position.y,
      height: this.screen.height,
      width: this.screen.width,
      zIndex: zindex.bg,
      scale: 1,
      ...this.currentPet.stats,
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

    this.currentPet.container.x = this.view.width / 2;
    this.currentPet.container.y = this.view.height / 2;
    container.addChild(this.background.container);
    container.addChild(this.currentPet.container);
    this.stage.addChild(layer);
    this.stage.addChild(container);

    this.moveLayer.push(this.background);
  }

  render() {
    this.renderer.render(this.stage);
    this.currentPet.container.x = this.screen.width / 2;
    this.currentPet.container.y = this.screen.height / 2;
    this.background.resize(this.screen.width, this.screen.height);
  }
  loop() {
    this.ticker.add(() => {
      this.moveLayer.forEach((layer) => {
        layer.move();
      });
    });
  }
  event() {}
}
