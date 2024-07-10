import { useState } from 'react';
import CatLayer from '../../component/pet/pet-layer';
import { usePetContext } from 'src/shared/context/pet';

function RoomPage() {
  const resources = usePetContext();
  return (
    <div className="h-screen">
      <CatLayer optionPet={{ scale: 0.3 }}></CatLayer>
    </div>
  );
}

export default RoomPage;
