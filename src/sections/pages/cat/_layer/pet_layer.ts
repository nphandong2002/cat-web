import { Container } from 'pixi.js';
import { Skin, Spine, SkeletonData } from '@pixi-spine/runtime-4.1';

import { idleType, action, feeling, zindex } from '../cat-config';
import { optionLayerType, resourcesType, statsType, viewportType } from '../cat-type';

var n = idleType,
  i = feeling,
  a = action,
  versionPet = [
    { v: 'v1', skin: [] },
    { v: 'v2', skin: ['husky', 'choco', 'cheetah'] },
    { v: 'v3', skin: ['koala'] },
    { v: 'v4', skin: ['howie'] },
  ];
export class PetLayer {
  private resources: resourcesType;
  private stats: statsType;
  private rendererPet: Spine;
  private rendererContainer: Container;
  private viewport: viewportType;
  constructor(resources: resourcesType, option: optionLayerType) {
    this.resources = resources;
    this.viewport = {
      width: option?.width || 150,
      height: option?.height || 125,
    };
    this.stats = {
      level: 0,
      posLeft: this.viewport.width / 2,
      direction: 'right',
      posTop: this.viewport.height,
      animation: idleType[0],
      walk: !0,
      talk: !0,
      name: '',
      clowderName: '',
      idleType: 'idle',
      skin: 'meow',
      eyes: '',
      hat: '',
      glasses: '',
      mask: '',
      wings: '',
      costume: '',
      faceMask: '',
      companion: '',
      rod: 'rod1',
      walkType: 'BOTTOM',
    };
    this.rendererPet = new Spine(resources.cat.spineData as SkeletonData);
    this.rendererContainer = new Container();
    this.initData();
    this.changeSkin(this.stats.skin);
    this.changeAnimation(0, this.stats.animation, true);
  }
  initData() {
    this.rendererPet.filters = [];
    this.rendererContainer.addChild(this.rendererPet);
    this.rendererContainer.zOrder = zindex.pet;
    this.rendererContainer.position.x = this.stats.posLeft;
    this.rendererContainer.position.y = this.stats.posTop;
    this.rendererContainer.scale.x = 0.5;
    this.rendererContainer.scale.y = 0.5;
    this.setMixAction();
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
  clearAnimation() {}
  changeAnimation(trackIndex: number, animation: string, loop: boolean) {
    this.clearAnimation();
    this.rendererPet.state.setAnimation(trackIndex, animation, loop);
  }
  changeView(viewport: viewportType) {
    this.viewport = viewport;
    this.stats.posLeft = this.viewport.width / 2;
    this.stats.posTop = this.viewport.height;
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
  getLayer() {
    return this.rendererContainer;
  }
}
