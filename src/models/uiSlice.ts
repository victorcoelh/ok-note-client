import { StateCreator } from "zustand";

import ChatMessage from "./chatMessage";

export interface UiSlice {
  rightPanelMode: "details" | "chat";
  leftPanelCollapsed: boolean;
  rightPanelCollapsed: boolean;
  chatMessages: Array<ChatMessage>;

  setRightPanelMode: (mode: "details" | "chat") => void;
  setLeftPanelCollapsed: (collapsed: boolean) => void;
  setRightPanelCollapsed: (collapsed: boolean) => void;
  pushMessage: (message: ChatMessage) => void;
}

export const createUiSlice: StateCreator<UiSlice> = (set) => ({
  rightPanelMode: "details",
  leftPanelCollapsed: false,
  rightPanelCollapsed: false,
  chatMessages: [{
    sender: "bot",
    content: "Hello! I'm here to help you with your flowchart. Do you have any questions?"
  }],

  setRightPanelMode: (mode) => set((_state) => ({ rightPanelMode: mode })),

  setLeftPanelCollapsed: (collapsed) =>
    set((_state) => ({ leftPanelCollapsed: collapsed })),

  setRightPanelCollapsed: (collapsed) =>
    set((_state) => ({ rightPanelCollapsed: collapsed })),

  pushMessage: (message) =>
    set((state) => ({ chatMessages: [...state.chatMessages, message] })),
})
