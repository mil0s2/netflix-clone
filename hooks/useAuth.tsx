import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { auth } from '../firebase';

const useAuth = () => {
  return <div>useAuth</div>;
};

export default useAuth;
