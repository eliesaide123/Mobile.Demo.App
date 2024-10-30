import React from 'react';
import { Text } from 'react-native';

export default function DQ_Paragraph({ 
    content, 
    fontSize = 16, 
    textColor = '#333',     
    textAlign = 'left',
    uppercased
} : any) {
    return (
        <Text style={{ fontSize, color: textColor, textAlign, textTransform: uppercased ? "uppercase": 'capitalize' }}>
            {content}
        </Text>
    );
}
