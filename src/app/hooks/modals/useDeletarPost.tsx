import { create } from "zustand";

interface DeletarPostModalStore {
  isOpen: boolean;
  id: string;
  title: string;
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
}

const useDeletarPost = create<DeletarPostModalStore>((set) => ({
  isOpen: false,
  id: "",
  title: "",
  onOpen: (id, title) => set({ isOpen: true, id, title }),
  onClose: () => set({ isOpen: false, id: "", title: "" }),
}));

export default useDeletarPost;
