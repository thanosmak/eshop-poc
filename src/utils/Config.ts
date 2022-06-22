import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDMt645YpSnI-fBMAAWlV8HUtW_4q4B9aY",
	authDomain: "bohemiaecommerce.firebaseapp.com",
	projectId: "bohemiaecommerce",
	storageBucket: "bohemiaecommerce.appspot.com",
	messagingSenderId: "446703534654",
	appId: "1:446703534654:web:45fd5ef14b56e65b3b076f",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { db, storage };
