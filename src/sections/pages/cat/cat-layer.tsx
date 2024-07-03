"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Assets, LoaderParser } from "pixi.js";

import { ApplicationCustom } from "./_utils/ApplicationCustom";
import { renderManagerType } from "./cat-type";
import { PetLayer } from "./_layer/pet_layer";

import { spineLoaderExtension } from "./_utils/spineLoaderExtension";
import { spineTextureAtlasLoader } from "./_utils/spineTextureAtlasLoader";
import { BackgroundLayer } from "./_layer/bg_layer";
import { defaultData } from "./cat-config";
import { keyDown } from "./_handle/keydown";

function CatLayer({ skinName }: { skinName: string }) {
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
      if (e.key in typeKey && renderManager.layer) {
        typeKey[e.key as keyof typeof typeKey]([renderManager.layer.petCurrent]);
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
        });
        let bgLayer = new BackgroundLayer({
          height: appinit.screen.height,
          width: appinit.screen.width,
        });
        appinit.pets.addChild(bgLayer.getLayer());
        appinit.pets.addChild(petlayer.getLayer());
        canvasref.current.innerHTML = "";
        canvasref.current.appendChild(appinit.view as unknown as Node);
        setrenderManager((a) => ({
          ...a,
          app: appinit,
          petLayer: petlayer,
          layer: {
            bg: petlayer.getLayer(),
            petCurrent: petlayer.getLayer(),
            pets: [petlayer.getLayer()],
          },
        }));
      }
    });
  }, [canvasref]);
  return <div className="w-full h-full" ref={canvasref}></div>;
}

export default CatLayer;
