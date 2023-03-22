import { atom } from 'recoil';

interface ResponseModal {
  open: boolean;
  content: string;
}

const defaultValue = {
  open: false,
  content: '',
};

export const ResponseModalState = atom<ResponseModal>({
  key: 'ResponseModalState',
  default: defaultValue,
});
