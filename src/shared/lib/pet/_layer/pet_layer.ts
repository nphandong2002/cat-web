import { VisualsPet } from './../../../type/pet-type';
import { Skin, Spine, SkeletonData } from '@pixi-spine/runtime-4.1';

import { colors, Keys } from 'src/shared/constain';
import { action, feeling, idleType } from 'src/shared/constain/pet-constain';
import { PetContextType, PetOptionLayer } from 'src/shared/type/pet-type';

import { BaseLayer } from './base_layer';
import { zindex } from 'src/config/pet-config';

var n = idleType,
  i = feeling,
  a = action;
export class PetLayer extends BaseLayer {
  resources: PetContextType;
  rendererPet: Spine;
  visualsPet: VisualsPet;
  constructor(option: PetOptionLayer) {
    super({
      ...option.info,
      ...option.appearance,
      ...option.position,
      ...option.stats,
      zIndex: zindex.pet,
    });
    this.visualsPet = option.visuals;
    this.resources = option.resources;
    this.rendererPet = new Spine(this.resources.cat.spineData as SkeletonData);

    this.init();
  }
  init() {
    this.rendererPet.filters = [];
    this.setMixAction();
    this.changeSkin(this.visualsPet.skin);
    this.container.addChild(this.rendererPet);
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
