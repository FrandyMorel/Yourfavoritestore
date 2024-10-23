import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = getAuth();
  private db = getFirestore();
  user$ = new BehaviorSubject<User | null>(null);
  idToken$ = new BehaviorSubject<string | null>(null);

  constructor() {
    initializeApp(environment.firebaseConfig);
    this.initAuth();
  }

  signInWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.updateIdToken(userCredential.user);
        return userCredential;
      });
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.updateIdToken(userCredential.user);
        return userCredential;
      });
  }

  signOut() {
    return signOut(this.auth).then(() => {
      this.user$.next(null);
      this.idToken$.next(null);
    });
  }

  initAuth() {
    onAuthStateChanged(this.auth, (user) => {
      this.user$.next(user);
      if (user) {
        this.updateIdToken(user);
      } else {
        this.idToken$.next(null);
      }
    });
  }

  private updateIdToken(user: User) {
    user.getIdToken().then((token) => {
      this.idToken$.next(token);
    });
  }

  get currentUser(): User | null {
    return this.user$.getValue();
  }

  get idToken(): string | null {
    return this.idToken$.getValue();
  }

  async saveData(collection: string, document: string, data: any) {
    const docRef = doc(this.db, collection, document);
    await setDoc(docRef, data);
  }

  async getData(collection: string, document: string): Promise<any> {
    const docRef = doc(this.db, collection, document);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  }
}
