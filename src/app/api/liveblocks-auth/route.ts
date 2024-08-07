import { Liveblocks } from '@liveblocks/node';
import { auth } from 'src/auth';
import uuidv4 from 'src/shared/utils/uuidv4';

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: Request) {
  const authorization = await auth();
  const { room } = await request.json();

  if (!authorization || !authorization.user?.id) {
    const userInfo = {
      name: 'customer_' + uuidv4(),
      picture: '',
      isUser: false,
    };

    const session = liveblocks.prepareSession(uuidv4(), { userInfo });

    if (room) session.allow(room, session.READ_ACCESS);

    const { status, body } = await session.authorize();
    return new Response(body, { status });
  }

  const user = authorization.user;

  const userInfo = {
    name: user.name || 'Teammeate',
    picture: user.image,
    isUser: true,
  };

  const session = liveblocks.prepareSession(user.id, { userInfo });

  if (room) session.allow(room, session.FULL_ACCESS);

  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
