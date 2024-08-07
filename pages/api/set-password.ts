import type { NextApiRequest, NextApiResponse } from 'next';
import argon2 from 'argon2';
import { updateDocument } from '../../firestore/updateDocument';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: 'Username and password are required' });
  }

  try {
    const hashedPassword = await argon2.hash(password);

    const { result, error } = await updateDocument('users', username, {
      password: hashedPassword,
    });

    if (error) {
      return res.status(500).json({ error: 'Error updating user document' });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
}
