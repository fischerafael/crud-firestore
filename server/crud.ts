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

// const app = "crud";

export const crud = {
  async create(user: string, data: any, app: string) {
    const payload = {
      createdAt: Timestamp.fromDate(new Date()),
      app,
      user,
      data: data,
    };
    const docRef = await addDoc(collection(db, app), payload);
    return docRef.id;
  },

  async delete(id: string, app: string) {
    if (!app) throw new Error("No App");
    await deleteDoc(doc(db, app, id));
  },

  async findById(id: string, app: string) {
    if (!app) throw new Error("No App");
    const docRef = doc(db, app, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error("Document does not exist");
    return { ...docSnap.data(), id: docSnap.id };
  },

  async updateById(id: string, data: any, app: string) {
    if (!app) throw new Error("No App");
    const docRef = doc(db, app, id);
    const docSnap = await getDoc(docRef);
    await updateDoc(docRef, {
      data: { ...docSnap.data()?.data, ...data },
    });
  },

  async list(user: string, queryDict: any, app: string) {
    if (!app) throw new Error("No App");
    if (!user) throw new Error("No user provided");

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

    const q = query(collection(db, app), ...wheres);
    let res: any[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      res.push({ ...doc.data(), id: doc.id });
    });

    return { response: res, count: res.length, query: queryDictArray };
  },
};
