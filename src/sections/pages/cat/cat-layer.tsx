"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Assets, LoaderParser } from "pixi.js";

import { ApplicationCustom } from "./_utils/ApplicationCustom";
import { renderManagerType } from "./cat-type";
import { PetLayer } from "./_layer/pet_layer";

import { spineLoaderExtension } from "./_utils/spineLoaderExtension";
import { spineTextureAtlasLoader } from "./_utils/spineTextureAtlasLoader";
import { BackgroundLayer } from "./_layer/bg_layer";
import { defaultData, zindex } from "./cat-config";
import { keyDown } from "./_handle/keydown";

function CatLayer({ skinName, scale }: { skinName: string; scale?: number }) {
  const [renderManager, setrenderManager] = useState<renderManagerType>({
    speed: defaultData.speed,
  });
  const handleKeyDown = useCallback(keyDown, [renderManager])(renderManager);
  const canvasref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    renderManager.petLayer?.changeSkin(skinName);
  }, [renderManager, skinName]);
  const typeKey = {
    w: handleKeyDown.keyW,
    a: handleKeyDown.keyA,
    s: handleKeyDown.keyS,
    d: handleKeyDown.keyD,
  };

  const keydownHandle = useCallback(
    (e: KeyboardEvent) => {
      if (e.key in typeKey && renderManager.petLayer && renderManager.bgLayer) {
        typeKey[e.key as keyof typeof typeKey]([renderManager.petLayer.container, renderManager.bgLayer.container]);
      }
    },
    [renderManager]
  );

  const keyupHandle = useCallback((e: KeyboardEvent) => {
    if (e.key in typeKey) {
      // typeKey[e.key as keyof typeof typeKey]();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", keydownHandle);
    window.addEventListener("keyup", keyupHandle);
    return () => {
      window.removeEventListener("keydown", keydownHandle);
      window.removeEventListener("keyup", keyupHandle);
    };
  }, [keydownHandle, keyupHandle]);
  useEffect(() => {
    Assets.loader.parsers.push(spineTextureAtlasLoader.loader as LoaderParser);
    Assets.loader.parsers.push(spineLoaderExtension.loader as LoaderParser);
    Assets.add("cat", "/spine/cat.json");
    Assets.load(["cat"]).then((a: any) => {
      if (canvasref.current) {
        const bound = canvasref.current.getBoundingClientRect();
        let appinit = new ApplicationCustom({
          height: bound.height,
          width: bound.width,
        });
        appinit.resizeTo = canvasref.current;

        let petlayer = new PetLayer(a, {
          height: appinit.screen.height,
          width: appinit.screen.width,
          x: 0,
          y: 0,
          skin: defaultData.skin,
          zIndex: zindex.pet,
        });
        let bgLayer = new BackgroundLayer({
          height: appinit.screen.height,
          width: appinit.screen.width,
          x: -735,
          y: -650,
          zIndex: zindex.bg,
        });
        appinit.pets.addChild(bgLayer.container);
        appinit.pets.addChild(petlayer.container);
        canvasref.current.innerHTML = "";
        canvasref.current.appendChild(appinit.view as unknown as Node);
        setrenderManager((a) => ({
          ...a,
          app: appinit,
          petLayer: petlayer,
          bgLayer: bgLayer,
        }));
      }
    });
  }, [canvasref, scale]);
  return <div className="w-full h-full" ref={canvasref}></div>;
}

export default CatLayer;
