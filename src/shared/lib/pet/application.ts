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
  container: Container;
  layer: Layer;
  constructor(op: any) {
    super({
      ...defaultApplication,
      ...op,
    });
    this.stage = new Stage();
    this.layer = new Layer();
    this.layer.group.enableSort = true;
    this.container = new Container();
    this.background = new BackgroundLayer({
      zIndex: zindex.bg,
      scale: 2,
      name: 'background',
      speed: 10,
      dame: 0,
      attackSpeed: 0,
    });
    this.currentPet = new PetLayer(op.resources, {
      ...op.dataPet.layer,
    });

    this.background.setPosition(op.dataPet.position.x, op.dataPet.position.y);
    this.currentPet.setPosition(this.view.width / 2, this.view.height / 2);
    this.petLayers = [];
    this.stage.eventMode = 'static';
    this.stage.hitArea = this.screen;
    this.container.parentLayer = this.layer;
    this.init();
    this.loop();
    this.event();
  }
  init() {
    this.ticker.maxFPS = 60;
    this.renderer.plugins.interaction.autoPreventDefault = false;
    this.renderer.view.style && (this.renderer.view.style.touchAction = 'auto');
    this.stage.addChild(this.layer);
    this.stage.addChild(this.container);
    this.container.addChild(this.background.container);
    this.container.addChild(this.currentPet.container);
  }

  loop() {
    this.ticker.add(() => {
      this.petLayers.forEach((a) => {
        a.update();
      });
      this.currentPet.canAction() && this.background.update();
      this.currentPet.update();
    });
  }
  event() {
    const keydownHandle = (e: KeyboardEvent) => {
      this.currentPet.addKey(e.keyCode as KeysType);
      this.background.addKey(e.keyCode as KeysType);

      Object.values(this.petLayers).forEach((a) => {
        a.addKey(e.keyCode as KeysType);
      });
    };
    const keyupHandle = (e: KeyboardEvent) => {
      this.currentPet.removeKey(e.keyCode as KeysType);
      this.background.removeKey(e.keyCode as KeysType);

      Object.values(this.petLayers).forEach((a) => {
        a.removeKey(e.keyCode as KeysType);
      });
    };
    this.stage.on('mousemove', (event) => {});
    window.addEventListener('keydown', keydownHandle);
    window.addEventListener('keyup', keyupHandle);
  }
}
