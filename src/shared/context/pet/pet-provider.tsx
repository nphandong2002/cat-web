'use client';

import { LiveList, LiveMap, LiveObject } from '@liveblocks/client';
import { ClientSideSuspense } from '@liveblocks/react';

import { TextureAtlas } from 'pixi-spine';
import { Assets, LoaderParser } from 'pixi.js';
import { ReactNode, useEffect, useState } from 'react';

import { RoomProvider } from 'src/liveblocks.config';
import { defaultInitPet } from 'src/config/pet-config';
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
  return (
    <RoomProvider
      id="112345456841"
      initialPresence={{
        pet: defaultInitPet,
      }}
      initialStorage={{
        layerIds: new LiveList([]),
        layers: new LiveMap<string, LiveObject<any>>(),
      }}
    >
      <ClientSideSuspense fallback={<></>}>
        <PetContext.Provider value={value}>{children}</PetContext.Provider>
      </ClientSideSuspense>
    </RoomProvider>
  );
}

export default PetProvider;
