import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore,enableIndexedDbPersistence  } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDF4PugsLsg_36s6e3i4SPnHtzOg9q1SZ8",
    authDomain: "perfil-9687c.firebaseapp.com",
    projectId: "perfil-9687c",
    storageBucket: "perfil-9687c.appspot.com",
    messagingSenderId: "187584483961",
    appId: "1:187584483961:web:7cd77832689390a9263aa8",
    measurementId: "G-EPKCQR0DGS"
};

const app = initializeApp(firebaseConfig);

 const db = getFirestore(app);

enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.

        console.log("You have Violated The law only use 1 Tab")
    } else if (err.code === 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
        console.log("Browser does not support IndexedDB")
    }
});


export const auth = getAuth(app);
export {db}