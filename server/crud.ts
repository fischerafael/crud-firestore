import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  WhereFilterOp,
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

  async findById(id: string) {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error("Document does not exist");
    return docSnap.data();
  },

  async updateById(id: string, data: any) {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    await updateDoc(docRef, {
      data: { ...docSnap.data()?.data, ...data },
    });
  },

  async list(user: string, app: string, queryDict: any) {
    if (!user || !app) throw new Error("No user or app provided");

    const queryDictArray = Object.entries(queryDict).map(([key, value]) => {
      const [keyValue, keySeparator, type] = key.split(" ");

      return {
        key: keyValue,
        separator: (keySeparator as WhereFilterOp) || "==",
        value:
          type === "number"
            ? Number(value)
            : type === "date"
            ? new Date(value as string)
            : value === "true"
            ? true
            : value === "false"
            ? false
            : value,
      };
    });

    const basic = [where("user", "==", user), where("app", "==", app)];
    const advanced = queryDictArray.map((qd) =>
      where(qd.key, qd.separator, qd.value)
    );
    const wheres = [...basic, ...advanced];

    const q = query(collection(db, collectionName), ...wheres);
    let res: any[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      res.push(doc.data());
    });

    return { queryDictArray, response: res };
  },
};
