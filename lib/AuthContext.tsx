'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut, updateProfile, deleteUser } from 'firebase/auth';
import { auth, getMessagingInstance } from './firebase';
import { getToken } from 'firebase/messaging';
import { saveFCMToken, saveUserProfile, fetchUserProfile, subscribeToUserProfile } from './db';
import { UserProfile } from '@/types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  updateDisplayName: (name: string) => Promise<void>;
  updatePreferences: (updates: Partial<UserProfile>) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  signOut: async () => {},
  updateDisplayName: async () => {},
  updatePreferences: async () => {},
  deleteAccount: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('echoscribe_user_profile');
        if (cached) return JSON.parse(cached);
      } catch (e) {
        // ignore
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (currentUser) {
        // Subscribe to user profile from Firestore
        unsubscribeProfile = subscribeToUserProfile(currentUser.uid, (profile) => {
          if (profile) {
            setUserProfile(profile);
            try {
              localStorage.setItem('echoscribe_user_profile', JSON.stringify(profile));
            } catch (e) {}
          } else {
            // Initialize basic profile if not exists
            const defaultProfile: UserProfile = {
              uid: currentUser.uid,
              displayName: currentUser.displayName || '',
              email: currentUser.email || '',
              languageSettings: {
                uiLanguage: 'English (US)',
                defaultSpokenLanguage: 'English',
                autoDetect: true,
              },
            };
            setUserProfile(defaultProfile);
            saveUserProfile(currentUser.uid, defaultProfile).catch(() => {});
          }
        });

        try {
          const messaging = await getMessagingInstance();
          if (messaging) {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
              const currentToken = await getToken(messaging);
              if (currentToken) {
                await saveFCMToken(currentUser.uid, currentToken);
              }
            }
          }
        } catch (error) {
          console.error("Failed to get FCM token", error);
        }
      } else {
        setUserProfile(null);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('echoscribe_user_profile');
        }
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setUserProfile(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('echoscribe_user_profile');
    }
  };

  const updateDisplayName = async (name: string) => {
    if (!auth.currentUser) throw new Error("No user logged in");
    const trimmed = name.trim();
    
    // Update in Firebase Auth
    await updateProfile(auth.currentUser, { displayName: trimmed });
    
    // Trigger local user update
    setUser(Object.assign(Object.create(Object.getPrototypeOf(auth.currentUser)), auth.currentUser, { displayName: trimmed }));

    // Save to Firestore
    const updates: Partial<UserProfile> = {
      uid: auth.currentUser.uid,
      displayName: trimmed,
      email: auth.currentUser.email || undefined,
    };
    await saveUserProfile(auth.currentUser.uid, updates);

    // Update local state and localStorage
    setUserProfile((prev) => {
      const next = { ...(prev || { uid: auth.currentUser!.uid }), ...updates };
      try {
        localStorage.setItem('echoscribe_user_profile', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const updatePreferences = async (updates: Partial<UserProfile>) => {
    if (!auth.currentUser) throw new Error("No user logged in");
    
    await saveUserProfile(auth.currentUser.uid, updates);
    
    setUserProfile((prev) => {
      const next = { ...(prev || { uid: auth.currentUser!.uid }), ...updates };
      try {
        localStorage.setItem('echoscribe_user_profile', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const deleteAccount = async () => {
    if (!auth.currentUser) throw new Error("No user logged in");
    const uid = auth.currentUser.uid;
    await deleteUser(auth.currentUser);
    setUser(null);
    setUserProfile(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('echoscribe_user_profile');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userProfile, 
      loading, 
      signOut, 
      updateDisplayName, 
      updatePreferences, 
      deleteAccount 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

