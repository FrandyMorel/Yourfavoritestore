// firebase.config.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { environment } from './environments/environment';
import { getAuth } from 'firebase/auth';



// Inicializar Firebase
const app = initializeApp(environment.firebaseConfig);

// Obtener las instancias de la base de datos y el almacenamiento
export const db = getFirestore(app);
export const storage = getStorage(app);
const auth = getAuth(app);

export { auth };