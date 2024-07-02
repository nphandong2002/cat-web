import { useState } from "react";
import CatLayer from "../cat/cat-layer";

function RoomPage() {
  const [skinName, setskinName] = useState("meow");

  return (
    <div className="h-screen">
      <CatLayer skinName={skinName}></CatLayer>
    </div>
  );
}

export default RoomPage;
