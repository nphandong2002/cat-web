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
  const [application, setapplication] = useState<ApplicationCustom>();

  useEffect(() => {
    if (resources && divRef.current && !divRef.current.querySelector('canvas')) {
      const app = new ApplicationCustom({
        resources: resources,
        dataPet: currentUser.presence.pet,
      });

      divRef.current.appendChild(app.view as unknown as HTMLCanvasElement);
      app.resizeTo = divRef.current;
      setapplication(app);
    }
  }, [divRef, resources, setapplication, currentUser, application]);

  return <div className="h-screen" ref={divRef}></div>;
}

export default RoomPage;
