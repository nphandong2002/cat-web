'use client';

import { useEffect, useRef, useState } from 'react';
import { useOthers, useSelf } from 'src/liveblocks.config';
import { usePetContext } from 'src/shared/context/pet';
import { ApplicationCustom } from 'src/shared/lib/pet/application';

function RoomPage() {
  const users = useOthers();
  const currentUser = useSelf();
  const divRef = useRef<HTMLDivElement>(null);
  const resources = usePetContext();

  const app = new ApplicationCustom({
    resources: resources,
  });
  useEffect(() => {
    app.setSeflPet(currentUser.presence.pet, {
      scale: 0.3,
    });
  }, [currentUser]);
  useEffect(() => {
    if (divRef.current && divRef.current.querySelector('canvas')) {
      divRef.current.appendChild(app.view as unknown as HTMLCanvasElement);
      app.resizeTo = divRef.current;
    }
  }, [divRef, app]);

  return <div ref={divRef} className="h-screen"></div>;
}

export default RoomPage;
