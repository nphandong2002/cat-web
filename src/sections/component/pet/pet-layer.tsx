'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Assets, LoaderParser } from 'pixi.js';

import { ApplicationCustom } from './_utils/ApplicationCustom';
import { PetLayer } from './_layer/pet_layer';

import { spineLoaderExtension } from './_utils/spineLoaderExtension';
import { spineTextureAtlasLoader } from './_utils/spineTextureAtlasLoader';
import { BackgroundLayer } from './_layer/bg_layer';
import { KeysType, optionConfigPet, optionPetLayerType, renderManagerType } from 'src/shared/type/pet-type';
import { defaultPet, moveConfig, zindex } from 'src/config/pet-config';
import { Keys } from 'src/shared/constants/constants';

function CatLayer({ optionPet }: { optionPet: Partial<optionConfigPet> }) {
  const canvasref = useRef<HTMLDivElement>(null);
  const [renderManager, setrenderManager] = useState<renderManagerType>({});

  const keydownHandle = useCallback(
    (e: KeyboardEvent) => {
      Object.values(Keys).includes(e.key as Keys) &&
        renderManager.layer &&
        Object.values(renderManager.layer).forEach((a) => {
          a.addKey(e.key as KeysType);
        });
    },
    [renderManager],
  );

  const keyupHandle = useCallback(
    (e: KeyboardEvent) => {
      Object.values(Keys).includes(e.key as Keys) &&
        renderManager.layer &&
        Object.values(renderManager.layer).forEach((a) => {
          a.removeKey(e.key as KeysType);
        });
    },
    [renderManager],
  );
  const clickHandle = useCallback((e: MouseEvent) => {}, [renderManager]);

  useEffect(() => {
    window.addEventListener('keydown', keydownHandle);
    window.addEventListener('keyup', keyupHandle);
    window.addEventListener('click', clickHandle);
    return () => {
      window.removeEventListener('keydown', keydownHandle);
      window.removeEventListener('keyup', keyupHandle);
      window.addEventListener('click', clickHandle);
    };
  }, [keydownHandle, keyupHandle]);
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

        let petlayer = new PetLayer(a, {
          height: appinit.screen.height,
          width: appinit.screen.width,
          ...defaultPet,
          ...optionPet,
        });

        let bgLayer = new BackgroundLayer({
          height: appinit.screen.height,
          width: appinit.screen.width,
          x: -1000,
          y: -650,
          zIndex: zindex.bg,
          scale: 2,
          speed: 13,
        });
        appinit.pets.addChild(bgLayer.container);
        appinit.pets.addChild(petlayer.container);
        appinit.ticker.add(() => {
          let k = petlayer.key[0];
          k == Keys.RIGHT && (petlayer.stats.direction = 'right');
          k == Keys.LEFT && (petlayer.stats.direction = 'left');
          petlayer.setDirection();
          petlayer.changeAnimation(0, k ? 'walk' : 'idle', true);
          bgLayer.move();
        });
        canvasref.current.innerHTML = '';
        canvasref.current.appendChild(appinit.view as unknown as Node);
        setrenderManager((a) => ({
          ...a,
          app: appinit,
          layer: {
            petLayer: petlayer,
            bgLayer: bgLayer,
          },
        }));
      }
    });
  }, [canvasref, optionPet]);
  return <div className="w-full h-full" ref={canvasref}></div>;
}

export default CatLayer;
