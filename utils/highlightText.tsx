import React from 'react';
import { Text } from 'react-native';

export const highlightText = (text: string, highlight: string) => {
  if (!highlight.trim()) return text;

  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <Text>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() && highlight !== '' ? (
          <Text key={index} style={{ fontWeight: 'bold' }}>{part}</Text>
        ) : (
          <Text key={index}>{part}</Text>
        )
      )}
    </Text>
  );
};