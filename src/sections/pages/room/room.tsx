import { useState } from "react";
import CatLayer from "../../component/pet/pet-layer";

function RoomPage() {

  return (
    <div className="h-screen">
      <CatLayer optionPet={
        {scale: 0.3}
      }></CatLayer>
    </div>
  );
}

export default RoomPage;
