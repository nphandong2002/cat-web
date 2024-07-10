import { createContext, useContext } from 'react';
import { PetContextType } from 'src/shared/type/pet-type';

export const PetContext = createContext({} as PetContextType);
export const usePetContext = function () {
  const context = useContext(PetContext);

  if (!context) throw new Error('usePetContext must be use inside PetProvider');

  return context;
};
