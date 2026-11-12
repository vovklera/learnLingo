import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { handleAuthError } from '../utils/authErrors';

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(user, {
      displayName: name,
    });

    return {
      success: true as const,
      user,
    };
  } catch (error) {
    return handleAuthError(error);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    console.log('Find user: ', user);

    return {
      success: true as const,
      user,
    };
  } catch (error) {
    return handleAuthError(error);
  }
};
