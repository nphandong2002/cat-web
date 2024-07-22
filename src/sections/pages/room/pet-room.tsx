'use client';

import { useEffect, useRef, useState } from 'react';
import { usePetContext } from 'src/shared/context/pet';
import { ApplicationCustom } from 'src/shared/lib/pet/application';
import { useMutation, useOthers, useSelf } from 'src/liveblocks.config';

function RoomPage() {
  const users = useOthers();
  const currentUser = useSelf();
  const divRef = useRef<HTMLDivElement>(null);
  const resources = usePetContext();
  const [application, setapplication] = useState<ApplicationCustom>();

  const updateLayer = useMutation(({ storage }, data) => {
    const liveLayers = storage.get('layers');
    const layer = liveLayers.get(data.info.id);

    if (layer) {
      layer.update(data);
    }
  }, []);
  const addLayer = useMutation(({ storage }, data) => {
    const liveLayers = storage.get('layers');
    const liveLayerIds = storage.get('layerIds');
    const layerId = data.info.id;
    liveLayerIds.push(layerId);
    liveLayers.set(layerId, data);
  }, []);
  const deleteLayer = useMutation(({ storage }, ids) => {
    const liveLayers = storage.get('layers');
    const liveLayersIds = storage.get('layerIds');

    for (const id of ids) {
      liveLayers.delete(id);
      const index = liveLayersIds.indexOf(id);
      if (index !== -1) liveLayersIds.delete(index);
    }
  }, []);

  useEffect(() => {
    if (resources && divRef.current && !divRef.current.querySelector('canvas')) {
      const app = new ApplicationCustom({
        resources: resources,
        dataPet: currentUser.presence.pet,
        action: {
          updateLayer,
          addLayer,
          deleteLayer,
        },
      });

      divRef.current.appendChild(app.view as unknown as HTMLCanvasElement);
      app.resizeTo = divRef.current;
      setapplication(app);
    }
  }, [divRef, resources, setapplication, currentUser, application]);

  return <div className="h-screen" ref={divRef}></div>;
}

export default RoomPage;
