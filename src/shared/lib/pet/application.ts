'use client';

import { Layer, Stage } from '@pixi/layers';
import { Application, Container, ResizePlugin, TickerPlugin } from 'pixi.js';

import { defaultApplication, DefaultInitBg } from 'src/config/pet-config';

import { BaseLayer } from '../layer/base/base_layer';
import { DynamicLayer } from '../layer/base/dynamic_layer';
import { MainPetLayer } from '../layer/pet';
import { ActionServerType } from 'src/shared/type/baselayer-type';

!Application._plugins.includes(TickerPlugin) && Application._plugins.push(TickerPlugin);
!Application._plugins.includes(ResizePlugin) && Application._plugins.push(ResizePlugin);

export class ApplicationCustom extends Application {
  allLayers: BaseLayer[];
  moveLayers: DynamicLayer[];
  currentPet: MainPetLayer;
  container: Container;
  actionSever: ActionServerType;

  constructor(option: any) {
    super({
      ...defaultApplication,
      ...option,
    });
    this.moveLayers = [];
    this.allLayers = [];
    this.container = new Container();
    this.currentPet = new MainPetLayer({
      ...option.dataPet,
      viewPort: {
        height: this.screen.height,
        width: this.screen.width,
      },
      updateCurrentPet: option.actionServer.updateCurrentPet,
      resources: option.resources,
    });
    this.actionSever = option.actionServer;

    this.init();
    this.loop();
    this.event();
  }
  init() {
    this.stage = new Stage();

    let layer = new Layer();

    this.ticker.maxFPS = 60;
    this.stage.eventMode = 'static';
    this.stage.hitArea = this.screen;
    this.renderer.plugins.interaction.autoPreventDefault = false;
    this.renderer.view.style && (this.renderer.view.style.touchAction = 'auto');

    layer.group.enableSort = true;
    this.container.parentLayer = layer;
    this.stage.addChild(layer);
    this.stage.addChild(this.container);

    this.currentPet.container.x = this.screen.width / 2;
    this.currentPet.container.y = this.screen.height / 2;
    this.container.addChild(this.currentPet.container);
    this.allLayers.push(this.currentPet);
  }

  addPetLayer(option: any) {}

  render() {
    this.renderer.render(this.stage);
    this.allLayers.forEach((layer) => {
      layer.resize(this.screen.height, this.screen.width);
    });
    this.currentPet.container.x = this.screen.width / 2;
    this.currentPet.container.y = this.screen.height / 2;
  }
  loop() {
    this.ticker.add(() => {
      this.currentPet.move();
      this.allLayers.forEach((layer) => {
        layer.update();
      });
    });
  }
  event() {
    this.stage.on('mousemove', (event) => {});
    const keydownHandle = (e: KeyboardEvent) => {
      if (e.keyCode == 32) {
      }
    };
    window.addEventListener('keydown', keydownHandle);
  }
}
