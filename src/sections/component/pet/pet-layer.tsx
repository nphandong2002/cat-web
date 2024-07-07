"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Assets, LoaderParser } from "pixi.js";

import { ApplicationCustom } from "./_utils/ApplicationCustom";
import { PetLayer } from "./_layer/pet_layer";

import { spineLoaderExtension } from "./_utils/spineLoaderExtension";
import { spineTextureAtlasLoader } from "./_utils/spineTextureAtlasLoader";
import { BackgroundLayer } from "./_layer/bg_layer";
import { keyDown } from "./_handle/keydown";
import { optionConfigPet, optionPetLayerType, renderManagerType } from "src/shared/type/pet-type";
import { defaultPet, zindex } from "src/config/pet-config";

function CatLayer({ optionPet }: { optionPet: Partial<optionConfigPet> }) {
  const [renderManager, setrenderManager] = useState<renderManagerType>({
  });
  const handleKeyDown = useCallback(keyDown, [renderManager])(renderManager);
  const canvasref = useRef<HTMLDivElement>(null);


  const typeKey = {
    w: handleKeyDown.keyW,
    a: handleKeyDown.keyA,
    s: handleKeyDown.keyS,
    d: handleKeyDown.keyD,
  };

  const keydownHandle = useCallback(
    (e: KeyboardEvent) => {
     
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
          ...defaultPet,
          ...optionPet,
        });
        let bgLayer = new BackgroundLayer({
          height: appinit.screen.height,
          width: appinit.screen.width,
          x: 1,
          y: 1,
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
  }, [canvasref,optionPet]);
  return <div className="w-full h-full" ref={canvasref}></div>;
}

export default CatLayer;
