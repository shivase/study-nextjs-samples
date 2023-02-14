import * as jose from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const middleware = async (req: NextRequest, _: NextResponse) => {
  const bearerToken = req.headers.get('authorization') as string;

  if (!bearerToken) {
    return new NextResponse(
      JSON.stringify({ errorMessage: 'Unauthorized request(no bearer token)' }),
      {
        status: 401,
      },
    );
  }

  const token = bearerToken.split(' ')[1];

  if (!token) {
    return new NextResponse(JSON.stringify({ errorMessage: 'Unauthorized request(no token)' }), {
      status: 401,
    });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ errorMessage: 'Unauthorized request(token invalid)' }),
      {
        status: 401,
      },
    );
  }
};

export default middleware;

export const config = {
  matcher: ['/api/auth/me'],
};
