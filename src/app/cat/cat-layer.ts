import { ISpineResource } from "@pixi-spine/loader-base";
import { Layer } from "@pixi/layers";
import { ISkeletonData } from "pixi-spine";
import { Skin, Spine, SkeletonData, RegionAttachment } from "@pixi-spine/runtime-4.1";
import { Container } from "pixi.js";

var n = ["idle", "jump", "walk", "run", "dance", "dance-rock", "dance-tap", "dance-chill", "throw", "bite", "chew", "blink", "wave", "hurt", "laugh", "karate", "tired", "pet other", "shoot-bow"],
  i = ["sad", "thanks", "please", "slide"],
  a = ["dead", "sleep", "lick", "dig", "mad", "sit", "sit-sad", "fish-hook", "fish-catch", "fish", "fish-catch"];
export class CatLayer {
  layer: Layer;
  pet: Container;
  resources: ISpineResource<ISkeletonData>;
  spine: Spine;
  currzIndex: number;
  skin: string;
  _defaultCatID: string;
  constructor(resources: ISpineResource<ISkeletonData>, skin: string) {
    this.layer = new Layer();
    this.layer.group.enableSort = true;
    this.pet = new Container();
    this.pet.parentLayer = this.layer;
    this.pet.zOrder = 4;
    this.resources = resources;
    this.spine = new Spine(resources.spineData as SkeletonData);
    this.currzIndex = 1;
    this.skin = skin;
    this._defaultCatID = "cat1";
  }
  setSkin(skin: string) {
    this.skin = skin;
  }
  changeSkin() {
    let r = "v1";
    let t = this.skin;
    if (!this.resources.spineData.findSkin("skins/" + t)) return;
    "husky" === t || "choco" === t || "cheetah" === t ? (r = "v2") : "koala" === t ? (r = "v3") : "howie" === t && (r = "v4");
    this.spine.skeleton;
    this.spine.skeleton.setSkinByName("skins/" + t);
    let i = new Skin("_defaultCatID");
    i.copySkin(this.resources.spineData.findSkin("skins/" + t) as Skin);
    i.addSkin(this.resources.spineData.findSkin("bow-arrow/type1") as Skin);
    var l = this.resources.spineAtlas.findRegion("eyes/black/" + r + "/open");
    if (l) {
      var c = this.spine.skeleton.getAttachmentByName("Eyes", "Open") as RegionAttachment;
      (c.region = l), c.updateRegion();
    }
    this.spine.skeleton.setSkin(i), this.spine.skeleton.setToSetupPose();
  }
  draw() {
    let r = new Spine(this.resources.spineData as SkeletonData);
    for (var o in n) {
      for (var h in n) r.stateData.setMix(n[o], n[h], 0.2);
      for (var l in i) r.stateData.setMix(n[o], i[l], 0.3);
      for (var c in a) r.stateData.setMix(n[o], a[c], 0.4);
    }
    for (var u in i) {
      for (var d in n) r.stateData.setMix(i[u], n[d], 0.3);
      for (var p in i) r.stateData.setMix(i[u], i[p], 0.2);
      for (var f in a) r.stateData.setMix(i[u], a[f], 0.2);
    }
    for (var m in a) {
      for (var g in n) r.stateData.setMix(a[m], n[g], 0.4);
      for (var x in i) r.stateData.setMix(a[m], i[x], 0.3);
      for (var w in a) r.stateData.setMix(a[m], a[w], 0.4);
    }
    r.state.addListener({
      event: function (t, e) {},
      complete: function (t) {},
      start: function (t) {},
      end: function (t) {},
      dispose: function (t) {},
    });
    r.autoUpdate = true;
    var b = new Container();
    b.parentLayer = this.layer;
    b.zOrder = ++this.currzIndex;
    this.changeSkin();
    b.addChild(r);
  }
}
