import { ISpineResource } from '@pixi-spine/loader-base';
import { Layer } from '@pixi/layers';
import { ISkeletonData, ISkin } from 'pixi-spine';
import { Skin, Spine, SkeletonData, RegionAttachment } from '@pixi-spine/runtime-4.1';
import { Container, Sprite, Texture } from 'pixi.js';
import { optionLayerType, positionType, resourcesType, statsType, viewportType } from './cat-type';
import { idleType, action, feeling } from './cat-config';

var n = idleType,
  i = feeling,
  a = action,
  versionPet = [
    { v: 'v1', skin: [] },
    { v: 'v2', skin: ['husky', 'choco', 'cheetah'] },
    { v: 'v3', skin: ['koala'] },
    { v: 'v4', skin: ['howie'] },
  ];
export class CatLayer {
  private resources: resourcesType;
  private rendererPet: Spine;
  private rendererContainer: Container;
  private viewport: viewportType;
  constructor(resources: resourcesType, option: optionLayerType) {
    this.resources = resources;
    this.viewport = {
      width: option?.width || 150,
      height: option?.height || 125,
    };
    this.rendererPet = new Spine(resources.cat.spineData as SkeletonData);
    this.rendererContainer = new Container();
    this.initData();
    this.draw();
  }
  initData() {
    this.rendererPet.filters = [];
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
  private draw() {}
  getLayer() {
    return this.rendererContainer;
  }
}
