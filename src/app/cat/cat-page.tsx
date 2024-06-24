"use client";

import { ISpineResource } from "@pixi-spine/loader-base";

import Image from "next/image";
import { ISkeletonData } from "pixi-spine";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Application, Assets, LoaderParser, TickerPlugin } from "pixi.js";

import { CatLayer } from "./cat-layer";
import { listPetPro } from "./cat-config";

import { spineLoaderExtension } from "./_utils/spineLoaderExtension";
import { spineTextureAtlasLoader } from "./_utils/spineTextureAtlasLoader";
import { ApplicationCustom } from "./_utils/ApplicationCustom";

export default function CatPage() {
  const [skinName, setskinName] = useState(listPetPro[0].name);
  const [resources, setresources] = useState<ISpineResource<ISkeletonData>>();
  const canvasref = useRef<HTMLDivElement>(null);
  const app = new ApplicationCustom();
  useEffect(() => {
    if (canvasref.current && !resources) {
      Assets.loader.parsers.push(spineTextureAtlasLoader.loader as LoaderParser);
      Assets.loader.parsers.push(spineLoaderExtension.loader as LoaderParser);
      Assets.add("cat", "/spine/cat.json");
      Assets.load(["cat"]).then((a) => {
        setresources(a);
      });
    }
  }, [canvasref]);

  return (
    <div className="flex flex-row ">
      <div className="flex flex-wrap h-full gap-5">
        {listPetPro.map((pet) => (
          <Image
            key={pet.id}
            onClick={() => setskinName(pet.name)}
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
