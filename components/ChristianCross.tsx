import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ChristianCrossProps {
  size?: number;
  color?: string;
}

export default function ChristianCross({ size = 24, color = '#000000' }: ChristianCrossProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2 L12 22 M7 7 L17 7"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
