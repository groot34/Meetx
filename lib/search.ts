// lib/firebase.ts
import { collection, query, where, getDocs, QuerySnapshot, DocumentData } from "firebase/firestore";
import { db } from "./firebase"; // Ensure you have your db instance configured

interface SearchResult {
  id: string;
  data: DocumentData;
}

const searchInCollection = async (
  collectionName: string,
  fieldName: string,
  searchTerm: string
): Promise<SearchResult[]> => {
  const q = query(collection(db, collectionName), where(fieldName, "==", searchTerm));
  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

  const results: SearchResult[] = [];
  querySnapshot.forEach((doc) => {
    results.push({ id: doc.id, data: doc.data() });
  });

  return results;
};

export { searchInCollection };
