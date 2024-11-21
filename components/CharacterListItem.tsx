import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Character } from '../types/Character';
import { highlightText } from '../utils/highlightText';
import { useCharacterStore } from '../store/selectedCharactersStore';

interface CharacterListItemProps {
    character: Character;
    searchQuery: string;
}

export const CharacterListItem: React.FC<CharacterListItemProps> = ({
    character,
    searchQuery
}) => {
    const { addCharacter, selectedCharacters } = useCharacterStore();
    const isSelected = selectedCharacters.some(c => c.id === character.id);

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => !isSelected && addCharacter(character)}>
                <View style={styles.checkbox}>
                    {isSelected && <View style={styles.checked} />}
                </View>
            </TouchableOpacity>
            <Image source={{ uri: character.image }} style={styles.image} />
            <View style={styles.textContainer}>
                    {highlightText(character.name, searchQuery)}
                <Text style={styles.subtitle}>{character.episode.length} Episodes</Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 5,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checked: {
        width: 12,
        height: 12,
        backgroundColor: '#007aff',
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontWeight: 'regular',
    },
    subtitle: {
        color: '#666',
    },
});

