import { create } from 'zustand';
import { Character } from '../types/Character';

interface CharacterStore {
  selectedCharacters: Character[];
  addCharacter: (character: Character) => void;
  removeCharacter: (characterId: number) => void;
}

export const useCharacterStore = create<CharacterStore>((set) => ({
  selectedCharacters: [],
  addCharacter: (character) => set((state) => ({
    selectedCharacters: [...state.selectedCharacters, character]
  })),
  removeCharacter: (characterId) => set((state) => ({
    selectedCharacters: state.selectedCharacters.filter(
      (char) => char.id !== characterId
    )
  })),
}));