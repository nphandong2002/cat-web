'use client';

import { ISpineResource } from '@pixi-spine/loader-base';

import { useEffect, useRef, useState } from 'react';
import { Assets, LoaderParser } from 'pixi.js';

import { ApplicationCustom } from './_utils/ApplicationCustom';
import { resourcesType } from './cat-type';
import { PetLayer } from './_layer/pet_layer';

import { spineLoaderExtension } from './_utils/spineLoaderExtension';
import { spineTextureAtlasLoader } from './_utils/spineTextureAtlasLoader';

type renderManagerType = Partial<{
  app: ApplicationCustom;
  resources: resourcesType;
  petLayer: PetLayer;
}>;

function CatLayer({ skinName }: { skinName: string }) {
  const [renderManager, setrenderManager] = useState<renderManagerType>({
    app: undefined,
    resources: undefined,
    petLayer: undefined,
  });

  const canvasref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    renderManager.petLayer?.changeSkin(skinName);
  }, [renderManager, skinName]);
  useEffect(() => {
    const handle
  }, [renderManager.petLayer]);
  useEffect(() => {
    Assets.loader.parsers.push(spineTextureAtlasLoader.loader as LoaderParser);
    Assets.loader.parsers.push(spineLoaderExtension.loader as LoaderParser);
    Assets.add('cat', '/spine/cat.json');
    Assets.load(['cat']).then((a: any) => {
      if (canvasref.current) {
        const bound = canvasref.current.getBoundingClientRect();
        let appinit = new ApplicationCustom({
          height: bound.height,
          width: bound.width,
        });
        appinit.resizeTo = canvasref.current;

        let layer = new PetLayer(a, {
          height: appinit.view.height,
          width: appinit.view.width,
        });
        appinit.pets.addChild(layer.getLayer());
        canvasref.current.innerHTML = '';
        canvasref.current.appendChild(appinit.view as unknown as Node);
        setrenderManager((a) => ({
          ...a,
          app: appinit,
          petLayer: layer,
        }));
      }
    });
  }, [canvasref]);
  return <div className="w-full h-full" ref={canvasref}></div>;
}

export default CatLayer;
