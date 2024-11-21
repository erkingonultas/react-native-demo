export interface Character {
    id: number;
    name: string;
    image: string;
    episode: string[];
}

export interface CharacterSearchResult {
    characters: {
        results: Character[];
    };
}