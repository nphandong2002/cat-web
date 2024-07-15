'use client';

import Image from 'next/image';

import { useState } from 'react';
import { listPetPro } from 'src/shared/constain/pet-constain';

export default function CatPage() {
  const [skinName, setskinName] = useState(listPetPro[0].tag);

  return (
    <div className="flex flex-row">
      <div className="flex flex-wrap h-full gap-5 basis-1/2">
        {listPetPro.map((pet) => (
          <Image
            key={pet.id}
            onClick={() => setskinName(pet.tag)}
            src={`/skins/${pet.preview_loc}`}
            alt={pet.name}
            className={'h-[64px] w-[64px] ' + (pet.tag == skinName ? 'bg-blue-500' : '')}
            width="100"
            height="100"
          />
        ))}
      </div>
      <div className="basis-1/2"></div>
    </div>
  );
}
