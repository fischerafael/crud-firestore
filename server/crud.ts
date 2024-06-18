import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firestore";

const collectionName = "crud";

export const crud = {
  async create(app: string, user: string, data: any) {
    const payload = {
      createdAt: Timestamp.fromDate(new Date()),
      app,
      user,
      data: data,
    };
    const docRef = await addDoc(collection(db, collectionName), payload);
    return docRef.id;
  },

  async delete(id: string) {
    await deleteDoc(doc(db, collectionName, id));
  },
};
