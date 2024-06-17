import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
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
};
