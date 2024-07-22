'use client';

import { Application, Container, ResizePlugin, TickerPlugin } from 'pixi.js';

import { PetLayer } from './layer/pet_layer';
import { defaultApplication, zindex } from 'src/config/pet-config';
import { BackgroundLayer } from './layer/bg_layer';
import { Layer, Stage } from '@pixi/layers';
import { ProjectileLayer } from './layer/projectile_layer';
import { BaseLayer } from '../layer/base/base_layer';
import { DynamicLayer } from '../layer/base/dynamic_layer';

!Application._plugins.includes(TickerPlugin) && Application._plugins.push(TickerPlugin);
!Application._plugins.includes(ResizePlugin) && Application._plugins.push(ResizePlugin);

export class ApplicationCustom extends Application {
  moveLayer: DynamicLayer[];
  currentPet: PetLayer;
  allLayers: BaseLayer[];
  container: Container;
  background: BackgroundLayer;
  constructor(option: any) {
    super({
      ...defaultApplication,
      ...option,
    });
    this.moveLayer = [];
    this.allLayers = [];
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
    this.container = new Container();
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

    this.currentPet.container.x = this.view.width / 2;
    this.currentPet.container.y = this.view.height / 2;
    this.container.addChild(this.background.container);
    this.container.addChild(this.currentPet.container);
    this.stage.addChild(layer);
    this.stage.addChild(this.container);

    this.allLayers.push(this.background, this.currentPet);
    this.moveLayer.push(this.background);
  }

  render() {
    this.renderer.render(this.stage);
    if (this.currentPet) {
      this.currentPet.container.x = this.screen.width / 2;
      this.currentPet.container.y = this.screen.height / 2;
    }
    this.background.resize(this.screen.width, this.screen.height);
  }
  loop() {
    this.ticker.add(() => {
      this.moveLayer.forEach((layer) => {
        layer.move();
      });
      this.allLayers.forEach((layer) => {
        layer.update();
      });
    });
  }
  event() {
    this.stage.on('mousemove', (event) => {
      this.allLayers.forEach((layer) => {
        layer.setMousePosition(event.global.x, event.global.y);
      });
    });
    const keydownHandle = (e: KeyboardEvent) => {
      if (this.currentPet && e.keyCode == 32 && this.currentPet.canAction()) {
        this.addProtitle({
          x: this.currentPet.container.x - this.currentPet.container.width,
          y: this.currentPet.container.y - this.currentPet.container.height,
          velocity: Math.atan2(
            this.currentPet.mouseXY.y - this.screen.height / 2,
            this.currentPet.mouseXY.x - this.screen.width / 2,
          ),
          image: this.currentPet.stats.projectileImage,
          damge: this.currentPet.stats.dame,
          id: this.currentPet.info.id,
        });
      }
    };
    window.addEventListener('keydown', keydownHandle);
  }
  addProtitle({
    x,
    y,
    velocity,
    id,
    damge,
    image,
  }: {
    x: number;
    y: number;
    velocity: number;
    id: number;
    damge: number;
    image: string | number;
  }) {
    let p = new ProjectileLayer({
      name: 'projectile',
      loyalty: 100,
      scale: 1,
      attackSpeed: 0,
      autherId: id,
      x: x,
      y: y,
      velocity: velocity,
      speed: 10,
      decay: 40,
      image: image,
      zIndex: zindex.projectile,
      dame: damge,
    });
    this.container.addChild(p.container);
    this.allLayers.push(p);
  }
}
