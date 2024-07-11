import { createLiveblocksContext, createRoomContext } from '@liveblocks/react';
import { createClient, LiveList, LiveMap, LiveObject } from '@liveblocks/client';

import { effectBadType, effectGoodType, positionType, projectileJson } from './shared/type/pet-type';

const client = createClient({
  throttle: 16,
  authEndpoint: '/api/liveblocks-auth',
});

type Presence = {
  pet: {
    position: positionType;
    loyalty: number;
    animation: string;
    projectile: projectileJson[];
    skin: string;
    name: string;
    effectGood: effectGoodType[];
    effectBad: effectBadType[];
    iddle: string;
    customSkin: Partial<{
      eyes: string;
      hat: string;
      glasses: string;
      mask: string;
      wings: string;
      costume: string;
      faceMask: string;
      companion: string;
      rod: string;
    }>;
  };
};

type Storage = {
  layers: LiveMap<string, LiveObject<Presence>>;
  layerIds: LiveList<projectileJson>;
};

type UserMeta = {
  id?: string;
  info?: {
    name?: string;
    picture?: string;
    isUser: boolean;
  };
};

type RoomEvent = {};

export type ThreadMetadata = {
  // resolved: boolean;
  // quote: string;
  // time: number;
};

export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
    useBatch,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStatus,
    useLostConnectionListener,
    useThreads,
    useUser,
    useCreateThread,
    useEditThreadMetadata,
    useCreateComment,
    useEditComment,
    useDeleteComment,
    useAddReaction,
    useRemoveReaction,
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(client);

export const {
  suspense: {
    LiveblocksProvider,
    useInboxNotifications,
    useUnreadInboxNotificationsCount,
    useMarkAllInboxNotificationsAsRead,
  },
} = createLiveblocksContext(client);
