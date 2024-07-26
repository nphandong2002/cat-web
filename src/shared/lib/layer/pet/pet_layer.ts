import { Skin, Spine, SkeletonData } from '@pixi-spine/runtime-4.1';

import { Keys } from 'src/shared/constain';
import { action, feeling, idleType } from 'src/shared/constain/pet-constain';
import { PetContextType, PetOptionLayer, StatsPetType, VisualsPet } from 'src/shared/type/pet-type';

import { DynamicLayer } from '../base';
import { Graphics } from 'pixi.js';

var n = idleType,
  i = feeling,
  a = action;
export class PetLayer extends DynamicLayer {
  rendererPet: Spine;
  resources: PetContextType;
  visualsPet: VisualsPet;
  stats: StatsPetType;

  constructor(option: PetOptionLayer) {
    super(option);
    this.visualsPet = option.visual;
    this.resources = option.resources;
    this.stats = option.stats;
    this.rendererPet = new Spine(this.resources.cat.spineData as SkeletonData);

    this.init();
  }
  init() {
    this.rendererPet.filters = [];
    this.setMixAction();
    this.changeSkin(this.visualsPet.skin);
    this.rendererPet.state.setAnimation(0, this.visualsPet.idle, true);
    this.container.addChild(this.rendererPet);
  }
  getGraphics(color: number) {
    const graphics = new Graphics();
    graphics.beginFill(color, 1);
    graphics.drawCircle(0, 0, 20);
    graphics.endFill();
    return graphics;
  }
  setDefaultData() {
    this.container.x = this.position.x;
    this.container.y = this.position.y;
    this.container.zIndex = this.appearance.zIndex;
    this.container.zOrder = this.appearance.zIndex;

    this.container.scale.x =
      (this.visualsPet && this.visualsPet.direction == Keys.LEFT ? -1 : 1) * this.appearance.scale;
    this.container.scale.y = this.appearance.scale;
  }
  changeSkin(skin: string) {
    this.visualsPet.skin = (this.resources.cat.spineData.findSkin('skins/' + skin) && skin) || 'meow';
    this.rendererPet.skeleton.setSkinByName('skins/' + skin);
    var i = new Skin('skin1');
    i.copySkin(this.resources.cat.spineData.findSkin('skins/' + skin) as Skin);
    i.addSkin(this.resources.cat.spineData.findSkin('bow-arrow/type1') as Skin);
    this.rendererPet.skeleton.setSkin(i);
    this.rendererPet.skeleton.setToSetupPose();
  }
  update() {
    this.container.scale.x = (this.visualsPet.direction == Keys.RIGHT ? 1 : -1) * this.appearance.scale;
  }

  clearAnimation() {}
  changeAnimation(trackIndex: number, animation: string, loop: boolean) {
    this.clearAnimation();
    if (this.visualsPet.animation != animation) {
      this.visualsPet.animation = animation;
      this.rendererPet.state.setAnimation(trackIndex, animation, loop);
    }
  }
  private setMixAction() {
    for (var o in n) {
      for (var h in n) this.rendererPet.stateData.setMix(n[o], n[h], 0.2);
      for (var l in i) this.rendererPet.stateData.setMix(n[o], i[l], 0.3);
      for (var c in a) this.rendererPet.stateData.setMix(n[o], a[c], 0.4);
    }
    for (var u in i) {
      for (var d in n) this.rendererPet.stateData.setMix(i[u], n[d], 0.3);
      for (var p in i) this.rendererPet.stateData.setMix(i[u], i[p], 0.2);
      for (var f in a) this.rendererPet.stateData.setMix(i[u], a[f], 0.2);
    }
    for (var m in a) {
      for (var g in n) this.rendererPet.stateData.setMix(a[m], n[g], 0.4);
      for (var x in i) this.rendererPet.stateData.setMix(a[m], i[x], 0.3);
      for (var w in a) this.rendererPet.stateData.setMix(a[m], a[w], 0.4);
    }
  }
}
