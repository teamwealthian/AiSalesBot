import admin from 'firebase-admin';
import { config } from '../config';
import { ConversationState, LeadData, ChatMessage } from '../types';

let db: admin.firestore.Firestore;

export function initFirebase() {
  if (admin.apps.length > 0) return;

  if (!config.firebase.projectId) {
    console.warn('Firebase not configured — running without persistence');
    return;
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: config.firebase.projectId,
      clientEmail: config.firebase.clientEmail,
      privateKey: config.firebase.privateKey,
    }),
  });

  db = admin.firestore();
  console.log('Firebase initialized');
}

function getDb() {
  if (!db) return null;
  return db;
}

export async function saveConversation(state: ConversationState): Promise<void> {
  const firestore = getDb();
  if (!firestore) return;

  await firestore.collection('conversations').doc(state.id).set({
    messages: state.messages,
    stage: state.stage,
    leadScore: state.leadScore,
    createdAt: state.createdAt,
    updatedAt: Date.now(),
  }, { merge: true });
}

export async function getConversation(id: string): Promise<ConversationState | null> {
  const firestore = getDb();
  if (!firestore) return null;

  const doc = await firestore.collection('conversations').doc(id).get();
  if (!doc.exists) return null;

  const data = doc.data()!;
  return {
    id,
    messages: data.messages as ChatMessage[],
    stage: data.stage,
    leadScore: data.leadScore,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

export async function saveLead(lead: LeadData & { id: string }): Promise<void> {
  const firestore = getDb();
  if (!firestore) return;

  await firestore.collection('leads').doc(lead.id).set({
    ...lead,
    createdAt: Date.now(),
  });
}

export async function getLeads(): Promise<(LeadData & { id: string })[]> {
  const firestore = getDb();
  if (!firestore) return [];

  const snapshot = await firestore.collection('leads').orderBy('createdAt', 'desc').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LeadData & { id: string }));
}
