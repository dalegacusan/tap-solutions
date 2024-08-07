import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
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
    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Update the user document in the database
    const { result, error } = await updateDocument('users', username, {
      password: hashedPassword,
    });

    // Check if there was an error during the update
    if (error) {
      return res
        .status(500)
        .json({ error: error || 'Error updating user document' });
    }

    // Return success response
    res.status(200).json({ success: true });
  } catch (error) {
    // Handle any errors that occurred during the hashing or updating process
    res.status(500).json({ error: (error as Error).message || 'Server Error' });
  }
}
