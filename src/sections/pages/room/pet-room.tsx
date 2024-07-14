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
    application?.setSeflPet(currentUser.presence.pet, {
      scale: 0.3,
    });
  }, [currentUser, application]);
  useEffect(() => {
    if (divRef.current && !divRef.current.querySelector('canvas')) {
      const app = new ApplicationCustom({
        resources: resources,
      });
      divRef.current.appendChild(app.view as unknown as HTMLCanvasElement);
      app.resizeTo = divRef.current;
      setapplication(app);
    }
    return application?.destroy();
  }, [divRef, resources, setapplication]);

  return <div ref={divRef}></div>;
}

export default RoomPage;
