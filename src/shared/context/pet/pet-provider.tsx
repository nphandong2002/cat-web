'use client';

import { TextureAtlas } from 'pixi-spine';
import { Assets, LoaderParser } from 'pixi.js';
import { ReactNode, useEffect, useState } from 'react';

import { PetContextType } from 'src/shared/type/pet-type';
import { defaultSkeletonData } from 'src/shared/constain/pet-constain';

import { PetContext } from './pet-context';
import { spineLoaderExtension } from './_utils/spineLoaderExtension';
import { spineTextureAtlasLoader } from './_utils/spineTextureAtlasLoader';

function PetProvider({ children }: { children: ReactNode }) {
  const [value, setvalue] = useState<PetContextType>({
    cat: {
      spineData: defaultSkeletonData,
      spineAtlas: new TextureAtlas(),
    },
  });
  useEffect(() => {
    Assets.loader.parsers.push(spineTextureAtlasLoader.loader as LoaderParser);
    Assets.loader.parsers.push(spineLoaderExtension.loader as LoaderParser);
    Assets.add('cat', '/spine/cat.json');
    Assets.load(['cat']).then((a: any) => {
      setvalue(a);
    });
  }, [setvalue]);
  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
}

export default PetProvider;
