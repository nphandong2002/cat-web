import { SessionProvider } from 'next-auth/react';

import { auth } from 'src/auth';
import RoomPage from 'src/sections/pages/room/room';

export default async function Home() {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <RoomPage />
    </SessionProvider>
  );
}
