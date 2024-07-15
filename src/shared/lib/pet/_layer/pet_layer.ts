import { Skin, Spine, SkeletonData } from '@pixi-spine/runtime-4.1';

import { Keys } from 'src/shared/constain';
import { action, feeling, idleType } from 'src/shared/constain/pet-constain';
import { PetContextType, PetOptionLayer, ViewLayerPet } from 'src/shared/type/pet-type';

import { BaseLayer } from './base_layer';

export class PetLayer extends BaseLayer {
  resources: PetContextType;
  rendererPet: Spine;
  stats: ViewLayerPet;
  constructor(resources: any, option: PetOptionLayer) {
    super(option);
    this.resources = resources;

    this.stats = {
      skin: option.skin,
      direction: Keys.RIGHT,
      animation: option.animation,
    };

    this.rendererPet = new Spine(resources.cat.spineData as SkeletonData);
    this.rendererPet.filters = [];
    this.rendererPet.state.setAnimation(0, option.animation, true);
    this.container.addChild(this.rendererPet);
    this.initData();
  }
  initData() {
    this.setMixAction();
    this.changeSkin(this.stats.skin);
    this.setDirection();
    this.setPosition(0, 0);
    this.changeAnimation(0, 'idle', true);
  }
  setMixAction() {
    var n = idleType,
      i = feeling,
      a = action;
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
  setPosition(x: number, y: number): void {
    this.container.position.x = x;
    this.container.position.y = y;
  }
  update(): void {
    this.move();
    let k = this.key[0];
    if (k && this.canAction()) {
      this.stats.direction = k;
      this.setDirection();
      this.changeAnimation(0, 'walk', true);
    } else {
      this.changeAnimation(0, 'idle', true);
    }
  }
  move() {}
  setDirection() {
    (this.stats.direction == Keys.RIGHT || this.stats.direction == Keys.LEFT) &&
      (this.container.scale.x = (this.stats.direction == Keys.RIGHT ? 1 : -1) * this.viewport.scale);
  }
  clearAnimation() {}
  changeAnimation(trackIndex: number, animation: string, loop: boolean) {
    this.clearAnimation();
    if (this.stats.animation != animation) {
      this.stats.animation = animation;
      this.rendererPet.state.setAnimation(trackIndex, animation, loop);
    }
  }
  changeSkin(skin: string) {
    this.stats.skin = (this.resources.cat.spineData.findSkin('skins/' + skin) && skin) || 'meow';
    this.rendererPet.skeleton.setSkinByName('skins/' + skin);
    var i = new Skin('skin1');
    i.copySkin(this.resources.cat.spineData.findSkin('skins/' + skin) as Skin);
    i.addSkin(this.resources.cat.spineData.findSkin('bow-arrow/type1') as Skin);
    this.rendererPet.skeleton.setSkin(i);
    this.rendererPet.skeleton.setToSetupPose();
  }

  canAction(): boolean {
    return !this.status.some((s) => {
      if ('stunned' in s && 'die' in s) {
        return s.stunned || s.die;
      }
      return false;
    });
  }
}
