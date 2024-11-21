import React, { useState } from 'react';
import {
    View,
    TextInput,
    FlatList,
    TouchableOpacity,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { CharacterListItem } from './CharacterListItem';
import { useCharacterSearch } from '../hooks/useCharacterSearch';
import { useCharacterStore } from '../store/selectedCharactersStore';
import { Character } from '../types/Character';

export const MultiSelectAutocomplete: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { selectedCharacters, removeCharacter } = useCharacterStore();
    const { data, isLoading, error } = useCharacterSearch(searchQuery);

    const renderSelectedCharacter = (character: Character) => (
        <View key={character.id} style={styles.tag}>
            <Text style={styles.tagText}>{character.name}</Text>
            <TouchableOpacity onPress={() => removeCharacter(character.id)}>
                <Text style={styles.closeButton}>x</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View className="flex-1 p-4">
            <ScrollView style={{ maxHeight: 70 }}>
                <View className="flex-row flex-wrap mb-4" style={styles.multiSelectContainer}>
                    {selectedCharacters.map(renderSelectedCharacter)}
                </View>
            </ScrollView>

            <TextInput
                style={styles.input}
                placeholder="Search characters..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="border p-2 rounded mb-2"
            />

            {isLoading && (
                <Text className="text-center text-gray-500">Loading...</Text>
            )}

            {error && (
                <Text className="text-center text-red-500">
                    {error.message || 'Error fetching characters'}
                </Text>
            )}

            {data?.characters?.results && (
                <FlatList
                    data={data.characters.results}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <CharacterListItem
                            character={item}
                            searchQuery={searchQuery}
                        />
                    )}
                    style={styles.list}
                />
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e3e8ef',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginRight: 5,
        marginBottom: 8,
    },
    tagText: {
        marginRight: 5,
    },
    closeButton: {
        fontSize: 16,
        color: '#fff',
        paddingHorizontal: 6,
        paddingBottom: 3,
        borderRadius: 4,
        backgroundColor: '#97a3b6'
    },
    container: {
        flex: 1,
    },
    multiSelectContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    input: {
        padding: 15,
        margin: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        color: 'black',
        borderRadius: 12,
        lineHeight: 16
    },
    list: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        padding: 10,
        margin: 8,
        height: '80%',
    },
});