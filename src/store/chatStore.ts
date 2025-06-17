import { create } from 'zustand';

interface ChatState {
  isChatMode: boolean;
  enterChatMode: () => void;
  exitChatMode: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  isChatMode: false,
  enterChatMode: () => set({ isChatMode: true }),
  exitChatMode: () => set({ isChatMode: false }),
}));
