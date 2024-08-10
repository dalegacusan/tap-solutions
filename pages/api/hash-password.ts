// pages/api/hash-password.js
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { password } = req.body;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      res.status(200).json({ hashedPassword });
    } catch (error) {
      res.status(500).json({ error: 'Error hashing password' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
