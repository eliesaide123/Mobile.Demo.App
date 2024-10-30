import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function DQ_Paragraph({ 
    content, 
    fontSize = 16, 
    textColor = '#333',     
    textAlign = 'left',
} : any) {
    return (
        <Text style={{ fontSize, color: textColor, textAlign }}>
            {content}
        </Text>
    );
}
