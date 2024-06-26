import { ISpineResource } from "@pixi-spine/loader-base";
import { Layer } from "@pixi/layers";
import { ISkeletonData, ISkin } from "pixi-spine";
import { Skin, Spine, SkeletonData, RegionAttachment } from "@pixi-spine/runtime-4.1";
import { Container, Sprite, Texture } from "pixi.js";
import { optionLayerType, positionType, resourcesType, statsType, viewportType } from "./cat-type";
import { idleType, action, feeling } from "./cat-config";

var n = idleType,
  i = feeling,
  a = action,
  versionPet = [
    { v: "v1", skin: [] },
    { v: "v2", skin: ["husky", "choco", "cheetah"] },
    { v: "v3", skin: ["koala"] },
    { v: "v4", skin: ["howie"] },
  ];
export class CatLayer {
  rendererPet: Spine;
  scale: number;
  currzIndex: number;
  skin: string;
  skinLayer: Skin;
  bottomContainer: Container;
  bottomContainerBG: Sprite;
  resources: resourcesType;
  animationName: string;
  rendererContainer: Container;
  stats: statsType;
  viewport: viewportType;
  constructor(resources: resourcesType, option: optionLayerType) {
    this.viewport = {
      width: option?.width || 150,
      height: option?.height || 125,
    };
    this.scale = 0.24;
    this.currzIndex = 1;
    this.skin = "meow";
    this.animationName = "idle";
    this.resources = resources;
    this.rendererPet = new Spine(resources.cat.spineData as SkeletonData);
    this.rendererPet.filters = [];
    this.rendererContainer = new Container();
    this.bottomContainer = new Container();
    this.bottomContainerBG = new Sprite();
    this.skinLayer = new Skin("cat1");
    this.stats = {
      walkType: null,
      posLeft: 0,
      direction: "right",
      posTop: 0,
      walk: !0,
      talk: !0,
      name: "",
      clowderName: "",
      idleType: "idle",
      level: 0,
      skin: "grey",
      eyes: "",
      hat: "",
      glasses: "",
      mask: "",
      wings: "",
      costume: "",
      faceMask: "",
      companion: "",
      rod: "rod1",
    };
    this.setMixAction();
    this.setInit();
    this.changeSkin();
  }
  setInit() {
    this.rendererPet.autoUpdate = true;
    this.bottomContainerBG.alpha = 0;
    this.bottomContainerBG.tint = 16777215;
    this.bottomContainer.zOrder = +this.currzIndex;
    this.skinLayer.copySkin(this.resources.cat.spineData.findSkin("skins/" + this.skin) as Skin);
    this.skinLayer.addSkin(this.resources.cat.spineData.findSkin("bow-arrow/type1") as Skin);
    this.rendererPet.skeleton.setSkin(this.skinLayer);
    this.rendererPet.skeleton.setBonesToSetupPose();
    this.rendererContainer.addChild(this.rendererPet);
    this.rendererContainer.position.x = 200;
    this.rendererContainer.position.y = 200;
  }
  setMixAction() {
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
  setSkin(skin: string) {
    this.skin = skin;
    this.draw();
  }
  clearAllActions() {}
  changeAnimation(nameAnimation: string) {
    this.clearAllActions();
    this.rendererPet.state.setAnimation(0, nameAnimation, true);
  }
  sendAction(method: any, data: any, callback: Function) {}
  changeSkin() {
    let version = versionPet.find((a) => a.skin.some((ab) => ab == this.skin))?.v || "v1";

    this.rendererPet.skeleton.setSkinByName("skins/" + this.skin);
  }
  reposition(draw: boolean, send: boolean) {
    this.fixPositions();
    draw && this.drawPositions();
    send && this.sendAction("a", "a", () => {});
  }
  fixPositions(t?: boolean, e?: positionType) {
    !e &&
      (e = {
        x: this.stats.posLeft,
        y: this.stats.posTop,
      });
    this.viewport.width < e.x + Math.abs(this.rendererPet.width / 2)
      ? (e.x = this.viewport.width - Math.abs(this.rendererPet.width / 2))
      : e.x - Math.abs(this.rendererPet.width / 2) < 0 && (e.x = Math.abs(this.rendererPet.width / 2));
    e.y - this.rendererPet.height < 0 ? (e.y = this.rendererPet.height) : (this.viewport.height < e.y || "BOTTOM" == this.stats.walkType) && (e.y = this.viewport.height);
    if (t) return e;
    this.stats.posLeft = e.x;
    this.stats.posTop = e.y;
  }
  drawPositions() {
    this.rendererContainer.position.x = this.stats.posLeft;
    this.rendererContainer.position.y = this.stats.posTop;
  }
  draw() {
    this.changeSkin();
    this.changeAnimation(this.animationName);
    this.reposition(true, false);
  }
}
