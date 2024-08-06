import { getFirestore, doc, getDoc } from 'firebase/firestore';
import firebase_app from '../firebase/config';
import { User } from '../interfaces/user.interface';

const db = getFirestore(firebase_app);

export default async function getDocument<T>(
  collection: string,
  id: string
): Promise<{ result: User; error: string | null }> {
  const docRef = doc(db, collection, id);
  let result: User = null;
  let error: string | null = null;

  try {
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      result = docSnapshot.data() as User;
    } else {
      error = 'Document not found';
    }
  } catch (e) {
    error = e instanceof Error ? e.message : 'An unknown error occurred';
  }

  return { result, error };
}
