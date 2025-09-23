import { atom } from 'nanostores';

export interface ChatStore {
  showChat: boolean;
  aborted: boolean;
  started: boolean;
}

export const chatStore = atom<ChatStore>({
  showChat: true,
  aborted: false,
  started: false,
});

export const showChat = atom(true);
export const chatStarted = atom(false);
export const chatAborted = atom(false);