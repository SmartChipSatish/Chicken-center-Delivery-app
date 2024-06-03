// CustomText.tsx
import React from 'react';
import { Text, TextProps } from 'react-native';

const CustomText: React.FC<TextProps> = ({ style, ...rest }) => {
  return <Text style={[{ fontFamily: 'WorkSans' }, style]} {...rest} />;
};

export default CustomText;
