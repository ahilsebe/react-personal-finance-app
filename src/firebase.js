import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, child, update, remove } from 'firebase/database'
// import { getAuth } from 'firebase/auth'
  
const firebaseConfig = {
    apiKey: "AIzaSyBXYsEpd3PZ_l2K71qY00gkiWnQp0RTiBA",
    authDomain: "react-admin-console-335508.firebaseapp.com",
    databaseURL: "https://react-admin-console-335508-default-rtdb.firebaseio.com",
    projectId: "react-admin-console-335508",
    storageBucket: "react-admin-console-335508.appspot.com",
    messagingSenderId: "206802109808",
    appId: "1:206802109808:web:885e5e4742e7f552933bb5",
    measurementId: "G-J279J5JQK8"
};
    
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;