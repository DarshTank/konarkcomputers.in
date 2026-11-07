import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB60JoaJbK_28QpkfrDUzDtWZfLVejsCnA",
  authDomain: "konarkcomputers-in.firebaseapp.com",
  projectId: "konarkcomputers-in",
  storageBucket: "konarkcomputers-in.firebasestorage.app",
  messagingSenderId: "513598827654",
  appId: "1:513598827654:web:9504de06454bbbc1fb7507",
  measurementId: "G-20EHTZNWQE"
};

const app = initializeApp(firebaseConfig);

async function main() {
  console.log('=== 1. Checking "(default)" database ===');
  try {
    const dbDefault = getFirestore(app);
    await setDoc(doc(dbDefault, 'test', 'ping'), { ok: true });
    console.log('Result: (default) SUCCESS');
  } catch (e: any) {
    console.log('Result: (default) FAILED -> Code:', e.code, '| Message:', e.message);
  }

  console.log('=== 2. Checking "konarkcomputers" database ===');
  try {
    const dbNamed = getFirestore(app, 'konarkcomputers');
    await setDoc(doc(dbNamed, 'test', 'ping'), { ok: true });
    console.log('Result: "konarkcomputers" SUCCESS');
  } catch (e: any) {
    console.log('Result: "konarkcomputers" FAILED -> Code:', e.code, '| Message:', e.message);
  }
}

main().then(() => process.exit(0)).catch(() => process.exit(1));
