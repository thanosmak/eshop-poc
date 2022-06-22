import ReactDOM from "react-dom/client";
import "./css/bootstrap.min.css";
import App from "./App";
import { initializeApp } from "firebase/app";

initializeApp({
	apiKey: "AIzaSyDMt645YpSnI-fBMAAWlV8HUtW_4q4B9aY",
	authDomain: "bohemiaecommerce.firebaseapp.com",
	projectId: "bohemiaecommerce",
	storageBucket: "bohemiaecommerce.appspot.com",
	messagingSenderId: "446703534654",
	appId: "1:446703534654:web:45fd5ef14b56e65b3b076f",
});

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(<App />);
