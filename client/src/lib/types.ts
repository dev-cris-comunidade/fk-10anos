// Additional frontend types and interfaces

export type FilterOption = {
  id: string | number;
  label: string;
  value: string | number;
};

export type MobileMenuState = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

export type ModalState = {
  isOpen: boolean;
  currentId: number | null;
  open: (id: number) => void;
  close: () => void;
};

export type YearFilter = number | 'all';
export type TypeFilter = string | 'all';

export type FormState = 'idle' | 'submitting' | 'success' | 'error';

export type GalleryModalState = {
  isOpen: boolean;
  currentIndex: number;
  images: any[];
  open: (index: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
};

export type DepoimentoFormState = {
  name: string;
  content: string;
  year?: number;
  memberSince?: number;
  imageUrl?: string;
};

export type HomenagemFormState = {
  name: string;
  yearStart?: number;
  yearEnd?: number;
  content: string;
  imageUrl?: string;
};

export type FamiliaFormState = {
  title: string;
  type: string;
  description: string;
  year?: number;
  eventName?: string;
  imageUrl?: string;
};

export type NewsletterFormState = {
  email: string;
};

export type ParticipacaoFormState = {
  name: string;
  email: string;
  type: string;
  message?: string;
};

export type ImageItem = {
  id: number;
  imageUrl: string;
  title?: string;
  description?: string;
  year: number;
  eventType: string;
};
