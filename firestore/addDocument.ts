import { getFirestore, doc, setDoc } from 'firebase/firestore';
import firebase_app from '../firebase/config';

const db = getFirestore(firebase_app);

export default async function addDocument<T>(
  collection: string,
  id: string,
  data: T
) {
  try {
    // Set or update the document in the specified collection
    await setDoc(doc(db, collection, id), data, { merge: true });

    // Return a success message or any relevant result
    return { result: 'Document added or updated successfully', error: null };
  } catch (e) {
    // Handle and return any error that occurs
    return { result: null, error: e.message };
  }
}
