import { Skin, Spine, SkeletonData } from '@pixi-spine/runtime-4.1';

import { action, feeling, idleType } from 'src/shared/constain/pet-constain';
import { optionPetLayerType, resourcesType, statsType } from 'src/shared/type/pet-type';

import { BaseLayer } from './base_layer';

var n = idleType,
  i = feeling,
  a = action,
  versionPet = [
    { v: 'v1', skin: [] },
    { v: 'v2', skin: ['husky', 'choco', 'cheetah'] },
    { v: 'v3', skin: ['koala'] },
    { v: 'v4', skin: ['howie'] },
  ];
export class PetLayer extends BaseLayer {
  resources: resourcesType;
  rendererPet: Spine;
  stats: statsType;
  constructor(resources: resourcesType, option: optionPetLayerType) {
    super(option);
    this.resources = resources;
    this.stats = {
      skin: option.skin,
      direction: 'right',
      scale: option.scale,
      animation: option.animation,
    };
    this.rendererPet = new Spine(resources.cat.spineData as SkeletonData);
    this.rendererPet.filters = [];
    this.container.addChild(this.rendererPet);
    this.rendererPet.state.setAnimation(0, option.animation, true);
    this.setMixAction();
    this.changeSkin(this.stats.skin);
    this.setScale(option.scale);
    this.setDirection();
    this.setPosition(0, 0);
    this.changeAnimation(0, 'idle', true);
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
  setPosition(x: number, y: number): void {
    this.container.position.x = this.viewport.width / 2;
    this.container.position.y = this.viewport.height / 2;
  }
  setDirection() {
    this.container.scale.x = (this.stats.direction == 'right' ? 1 : -1) * this.stats.scale;
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
}
