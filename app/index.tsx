import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { MultiSelectAutocomplete } from '../components/MultiSelectAutocomplete';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Index() {
    return (
        <QueryClientProvider client={queryClient}>
            <SafeAreaView className="flex-1 bg-white">
                <View className="flex-1">
                    <MultiSelectAutocomplete />
                </View>
            </SafeAreaView>
        </QueryClientProvider>
    );
}