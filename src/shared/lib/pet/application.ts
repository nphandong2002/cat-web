'use client';

import { Layer, Stage } from '@pixi/layers';
import { Application, Container, ResizePlugin, TickerPlugin } from 'pixi.js';

import { defaultInitPet, zindex } from 'src/config/pet-config';
import { KeysType, optionConfigPet, petJson, resourcesType } from 'src/shared/type/pet-type';

import { PetLayer } from './_layer/pet_layer';
import { BackgroundLayer } from './_layer/bg_layer';
import { Keys } from 'src/shared/constain';
import { BaseLayer } from './_layer/base_layer';
import { ProjectileLayer } from './_layer/projectile_layer';

!Application._plugins.includes(TickerPlugin) && Application._plugins.push(TickerPlugin);
!Application._plugins.includes(ResizePlugin) && Application._plugins.push(ResizePlugin);

export class ApplicationCustom extends Application {
  layer: Layer;
  layers: BaseLayer[];
  pets: Container;
  currentPet?: PetLayer;
  background: BackgroundLayer;
  resources: resourcesType;
  private mouseX: number;
  private mouseY: number;
  projectiles: ProjectileLayer[];

  constructor(op: any) {
    super({
      backgroundColor: '#fff',
      backgroundAlpha: 0,
      clearBeforeRender: true,
      context: null,
      antialias: true,
      powerPreference: 'default',
      premultipliedAlpha: true,
      preserveDrawingBuffer: true,
      hello: true,
      ...op,
    });
    this.layers = [];
    this.projectiles = [];

    this.mouseX = 0;
    this.mouseY = 0;
    this.resources = op.resources;
    this.layer = new Layer();
    this.layer.group.enableSort = true;
    this.pets = new Container();
    this.stage = new Stage();
    this.pets.parentLayer = this.layer;
    this.pets.zOrder = 4;
    this.stage.addChild(this.layer);
    this.stage.addChild(this.pets);
    this.renderer.plugins.interaction.autoPreventDefault = false;
    this.renderer.view.style && (this.renderer.view.style.touchAction = 'auto');
    this.background = new BackgroundLayer({
      height: this.view.height,
      width: this.view.width,
      x: 0,
      y: 0,
      zIndex: zindex.bg,
      speed: 10,
      scale: 2,
    });
    this.pets.addChild(this.background.container);
    this.ticker.maxFPS = 60;
    this.loop();
    this.event();
  }
  setSeflPet(json: petJson, op: Partial<optionConfigPet>) {
    if (this.currentPet) {
      this.pets.removeChild(this.currentPet.container);
      this.layers.splice(
        this.layers.findIndex((a) => a === this.currentPet),
        1,
      );
    }
    this.currentPet = new PetLayer(this.resources, {
      height: this.screen.height,
      width: this.screen.width,
      zIndex: zindex.pet,
      zOrder: zindex.pet,
      ...defaultInitPet,
      ...json,
      scale: op.scale || 1,
    });
    this.background.container.position = json.position;
    this.pets.addChild(this.currentPet.container);
    this.layers.push(this.currentPet);
    this.layers.push(this.background);
  }
  loop() {
    this.ticker.add(() => {
      this.layers.forEach((a) => {
        a.update();
      });
      if (!this.currentPet) return;
      let k = this.currentPet.key[0];
      if (k) {
        this.currentPet.stats.direction = k;
        this.currentPet.canAction() && this.background.move();
        this.currentPet.setDirection();
      }
      this.currentPet.changeAnimation(0, k ? 'walk' : 'idle', true);
    });
  }
  event() {
    const keydownHandle = (e: KeyboardEvent) => {
      Object.values(Keys).includes(e.keyCode as Keys) &&
        Object.values(this.layers).forEach((a) => {
          a.addKey(e.keyCode as KeysType);
        });
      if (this.currentPet && e.keyCode == 32 && this.currentPet.canAction()) {
        console.log(this.mouseX);

        this.addProtitle(
          this.currentPet.container.x - this.currentPet.container.width,
          this.currentPet.container.y - this.currentPet.container.height,
          this.mouseX,
          this.mouseY,
          this.currentPet.stats.projectileImage,
          this.currentPet.stats.dame,
        );
      }
    };

    const keyupHandle = (e: KeyboardEvent) => {
      Object.values(Keys).includes(e.keyCode as Keys) &&
        Object.values(this.layers).forEach((a) => {
          a.removeKey(e.keyCode as KeysType);
        });
    };
    this.stage.eventMode = 'static';
    this.stage.hitArea = this.screen;
    this.stage.on('mousemove', (event) => {
      this.mouseX = event.global.x;
      this.mouseY = event.global.y;
    });
    window.addEventListener('keydown', keydownHandle);
    window.addEventListener('keyup', keyupHandle);
  }
  addProtitle(x: number, y: number, velocityx: number, velocityy: number, image: string | number, dame: number) {
    let p = new ProjectileLayer({
      x: x,
      y: y,
      velocity: {
        x: velocityx,
        y: velocityy,
      },
      speed: 10,
      decay: 40,
      image: image,
      zIndex: zindex.projectile,
      dame: dame,
    });
    this.pets.addChild(p.container);
    this.layers.push(p);
  }
}
