"use client";

import { ISpineResource } from "@pixi-spine/loader-base";

import Image from "next/image";
import { ISkeletonData, Spine } from "pixi-spine";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Application, Assets, Container, LoaderParser, TickerPlugin } from "pixi.js";

import { CatLayer } from "./cat-layer";
import { listPetPro } from "./cat-config";
import { resourcesType } from "./cat-type";

import { spineLoaderExtension } from "./_utils/spineLoaderExtension";
import { spineTextureAtlasLoader } from "./_utils/spineTextureAtlasLoader";
import { ApplicationCustom } from "./_utils/ApplicationCustom";

type renderManagerType = Partial<{
  app: Application;
  resources: resourcesType;
  petLayer: CatLayer;
}>;

export default function CatPage() {
  const [skinName, setskinName] = useState(listPetPro[0].tag);
  const [renderManager, setrenderManager] = useState<renderManagerType>({
    app: undefined,
    resources: undefined,
    petLayer: undefined,
  });

  const canvasref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (renderManager.petLayer && canvasref.current && renderManager.resources && renderManager.app) {
      renderManager.petLayer.setSkin(skinName);
      console.log(renderManager.app);
    }
  }, [renderManager, skinName, canvasref]);
  useEffect(() => {
    if (!renderManager.resources) {
      Assets.loader.parsers.push(spineTextureAtlasLoader.loader as LoaderParser);
      Assets.loader.parsers.push(spineLoaderExtension.loader as LoaderParser);
      Assets.add("cat", "/spine/cat.json");
      Assets.load(["cat"]).then((a) => {
        if (canvasref.current) {
          let appinit = new ApplicationCustom();
          let layer = new CatLayer(a);
          appinit.stage.addChild(layer.bottomContainer);
          canvasref.current.innerHTML = "";
          canvasref.current.appendChild(appinit.view as unknown as Node);
          setrenderManager((b) => ({
            petLayer: layer,
            app: appinit,
            resources: a,
          }));
        }
      });
    }
  }, [canvasref]);

  return (
    <div className="flex flex-row ">
      <div className="flex flex-wrap h-full gap-5">
        {listPetPro.map((pet) => (
          <Image
            key={pet.id}
            onClick={() => setskinName(pet.tag)}
            src={`/skins/${pet.preview_loc}`}
            alt={pet.name}
            className={"h-[64px] w-[64px] " + (pet.name == skinName ? "bg-blue-500" : "")}
            width="100"
            height="100"
          />
        ))}
      </div>
      <div ref={canvasref}></div>
    </div>
  );
}
