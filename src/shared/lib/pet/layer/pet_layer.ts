import { InfoPetType, StatsPetType, VisualsPet } from '../../../type/pet-type';
import { Skin, Spine, SkeletonData } from '@pixi-spine/runtime-4.1';

import { colors, Keys } from 'src/shared/constain';
import { action, feeling, idleType } from 'src/shared/constain/pet-constain';
import { PetContextType, PetOptionLayer } from 'src/shared/type/pet-type';

import { zindex } from 'src/config/pet-config';
import { DynamicLayer } from '../../layer/base/dynamic_layer';

var n = idleType,
  i = feeling,
  a = action;
export class PetLayer extends DynamicLayer {
  resources: PetContextType;
  rendererPet: Spine;
  visualsPet: VisualsPet;
  info: InfoPetType;
  stats: StatsPetType;

  constructor(option: PetOptionLayer) {
    super({
      actionServer: option.actionServer,
      ...option.info,
      ...option.appearance,
      ...option.position,
      ...option.stats,
      zIndex: zindex.pet,
    });
    this.info = {
      ...option.info,
    };
    this.stats = {
      ...option.stats,
    };
    this.visualsPet = option.visuals;
    this.resources = option.resources;
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
    this.changeAnimation(0, this.key.length ? 'walk' : this.visualsPet.idle, true);
    [Keys.RIGHT, Keys.LEFT].some((a) => a === this.key[0]) &&
      (this.visualsPet.direction = this.key[0] == Keys.LEFT ? Keys.LEFT : Keys.RIGHT);
    this.container.scale.x = (this.visualsPet.direction == Keys.RIGHT ? 1 : -1) * this.appearance.scale;
  }
  canAction(): boolean {
    return !this.effects.some((s) => {
      if ('stunned' in s && 'die' in s) {
        return s.stunned || s.die;
      }
      return false;
    });
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
