import { atom } from 'recoil';

export const currencyAtom = atom({
  key: 'currencyAtom', 
  default: 'USD', 
});

export const languageAtom = atom({
  key: 'languageAtom',
  default: 'en',
});
