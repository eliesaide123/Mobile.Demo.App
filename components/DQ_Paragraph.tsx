import React from 'react';
import { Text } from 'react-native';

export default function DQ_Paragraph({ 
    content, 
    fontSize = 16, 
    fontFamily='Nexa Regular',
    textColor = '#015faf',     
    textAlign = 'left',
    uppercased= false,
    capitalized = false,
} : any) {
    return (
        <Text style={{ fontSize, fontFamily, color: textColor, textAlign, textTransform: uppercased ? "uppercase": capitalized? 'capitalize' : 'none' }}>
            {content}
        </Text>
    );
}
