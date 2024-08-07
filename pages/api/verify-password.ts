import type { NextApiRequest, NextApiResponse } from 'next';
import argon2 from 'argon2';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { enteredPassword, accountPassword } = req.body;

  if (!enteredPassword || !accountPassword) {
    return res.status(400).json({ error: 'Password is required' });
  }

  try {
    // Verify if the entered password matches the hashed password
    const isPasswordCorrect = await argon2.verify(
      accountPassword,
      enteredPassword
    );

    if (isPasswordCorrect) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ error: 'Incorrect password' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Server Error' });
  }
}
