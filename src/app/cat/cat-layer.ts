import { ISpineResource } from "@pixi-spine/loader-base";
import { Layer } from "@pixi/layers";
import { ISkeletonData, ISkin } from "pixi-spine";
import { Skin, Spine, SkeletonData, RegionAttachment } from "@pixi-spine/runtime-4.1";
import { Container, Sprite, Texture } from "pixi.js";
import { resourcesType } from "./cat-type";

var n = ["idle", "jump", "walk", "run", "dance", "dance-rock", "dance-tap", "dance-chill", "throw", "bite", "chew", "blink", "wave", "hurt", "laugh", "karate", "tired", "pet other", "shoot-bow"],
  i = ["sad", "thanks", "please", "slide"],
  a = ["dead", "sleep", "lick", "dig", "mad", "sit", "sit-sad", "fish-hook", "fish-catch", "fish", "fish-catch"],
  versionPet = [
    { v: "v1", skin: [] },
    { v: "v2", skin: ["husky", "choco", "cheetah"] },
    { v: "v3", skin: ["koala"] },
    { v: "v4", skin: ["howie"] },
  ];
export class CatLayer {
  spine: Spine;
  scale: number;
  currzIndex: number;
  skin: string;
  skinLayer: Skin;
  bottomContainer: Container;
  bottomContainerBG: Sprite;
  resources: resourcesType;
  animationName: string | null;
  constructor(resources: resourcesType) {
    this.scale = 0.24;
    this.currzIndex = 1;
    this.skin = "meow";
    this.animationName = null;
    this.resources = resources;
    this.spine = new Spine(resources.cat.spineData as SkeletonData);
    this.spine.filters = [];
    this.bottomContainer = new Container();
    this.bottomContainerBG = new Sprite();
    this.skinLayer = new Skin("cat1");
    this.setMixAction();
    this.setInit();
    this.changeSkin();
  }
  setInit() {
    this.spine.scale.y = this.scale;
    this.spine.autoUpdate = true;
    this.bottomContainerBG.alpha = 0;
    this.bottomContainerBG.tint = 16777215;
    this.bottomContainer.addChild(this.spine, this.bottomContainerBG);
    this.spine.skeleton.setSkin(this.skinLayer);
    this.spine.skeleton.setBonesToSetupPose();
  }
  setMixAction() {
    for (var o in n) {
      for (var h in n) this.spine.stateData.setMix(n[o], n[h], 0.2);
      for (var l in i) this.spine.stateData.setMix(n[o], i[l], 0.3);
      for (var c in a) this.spine.stateData.setMix(n[o], a[c], 0.4);
    }
    for (var u in i) {
      for (var d in n) this.spine.stateData.setMix(i[u], n[d], 0.3);
      for (var p in i) this.spine.stateData.setMix(i[u], i[p], 0.2);
      for (var f in a) this.spine.stateData.setMix(i[u], a[f], 0.2);
    }
    for (var m in a) {
      for (var g in n) this.spine.stateData.setMix(a[m], n[g], 0.4);
      for (var x in i) this.spine.stateData.setMix(a[m], i[x], 0.3);
      for (var w in a) this.spine.stateData.setMix(a[m], a[w], 0.4);
    }
  }
  setSkin(skin: string) {
    this.skin = skin;
    this.draw();
  }
  clearAllActions() {}
  changeAnimation(nameAnimation: string) {
    this.clearAllActions();
    this.spine.state.setAnimation(0, nameAnimation, true);
  }

  changeSkin() {
    let version = versionPet.find((a) => a.skin.some((ab) => ab == this.skin))?.v || "v1";
    this.spine.skeleton.setSkinByName("skins/" + this.skin);
    this.skinLayer.copySkin(this.resources.cat.spineData.findSkin("skins/" + this.skin) as Skin);
    this.skinLayer.addSkin(this.resources.cat.spineData.findSkin("bow-arrow/type1") as Skin);
  }
  draw() {
    this.bottomContainer.zOrder = +this.currzIndex;
    this.changeSkin();
    this.changeAnimation("run");
  }
}
