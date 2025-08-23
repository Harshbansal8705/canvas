import { create } from "zustand";

interface CursorPosition {
  x: number;
  y: number;
  userId: string;
  userName: string;
}

interface AuthState {
  user: any;
  setUser: (user: any) => void;
  admin: boolean;
  setAdmin: (admin: boolean) => void;
  roomId: string | null;
  setRoomId: (roomId: string | null) => void;
  canvasTitle: string;
  setCanvasTitle: (title: string) => void;
  roomName: string;
  setRoomName: (roomName: string) => void;
  save: boolean;
  setSave: (save: boolean) => void;
  saving: boolean;
  setSaving: (saving: boolean) => void;
  userCursors: Map<string, CursorPosition>;
  setUserCursor: (userId: string, cursor: CursorPosition) => void;
  removeUserCursor: (userId: string) => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null as any,
  setUser: (user: any) => set({ user }),
  admin: false,
  setAdmin: (admin: boolean) => set({ admin }),
  roomId: null as string|null,
  setRoomId: (roomId: string|null) => set({ roomId }),
  canvasTitle: "",
  setCanvasTitle: (title: string) => set({ canvasTitle: title }),
  roomName: "",
  setRoomName: (roomName: string) => set({ roomName }),
  save: false,
  setSave: (save: boolean) => set({ save }),
  saving: false,
  setSaving: (saving: boolean) => set({ saving }),
  userCursors: new Map() as Map<string, CursorPosition>,
  setUserCursor: (userId: string, cursor: CursorPosition) => set((state) => {
    const newCursors = new Map(state.userCursors);
    newCursors.set(userId, cursor);
    console.log("newCursors.size");
    console.log(newCursors.size);
    return { userCursors: newCursors };
  }),
  removeUserCursor: (userId: string) => set((state) => {
    const newCursors = new Map(state.userCursors);
    newCursors.delete(userId);
    return { userCursors: newCursors };
  }),
}))