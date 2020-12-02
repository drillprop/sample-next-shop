import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      name: 'Please login',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'John Smith',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      authorize: async (credentials) => {
        const user = { id: 1, name: 'admin', email: 'admin@example.com' };
        if (
          credentials.username === 'admin' &&
          credentials.password === 'admin'
        ) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
