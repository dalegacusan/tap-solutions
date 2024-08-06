import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import firebase_app from '../firebase/config';

const db = getFirestore(firebase_app);

export async function updateDocument(
  collection: string,
  id: string,
  data: Record<string, any> // Use `Record<string, any>` to allow any field updates
): Promise<{
  result: string | null;
  error: string | null;
}> {
  const docRef = doc(db, collection, id);
  let result: string | null = null;
  let error: string | null = null;

  try {
    await updateDoc(docRef, data);

    result = 'Document updated successfully';
  } catch (e) {
    error = e instanceof Error ? e.message : 'An unknown error occurred';
  }

  return { result, error };
}
