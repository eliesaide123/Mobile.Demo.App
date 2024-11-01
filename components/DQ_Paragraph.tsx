import React from 'react';
import { Text } from 'react-native';

export default function DQ_Paragraph({ 
    content, 
    fontSize = 16, 
    textColor = '#333',     
    textAlign = 'left',
    uppercased= false,
    capitalized = false,
} : any) {
    return (
        <Text style={{ fontSize, color: textColor, textAlign, textTransform: uppercased ? "uppercase": capitalized? 'capitalize' : 'none' }}>
            {content}
        </Text>
    );
}
