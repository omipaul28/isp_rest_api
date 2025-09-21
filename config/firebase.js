import admin from "firebase-admin";
import serviceAccount from "./firebase-key.json" assert { type: "json" };

export const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});