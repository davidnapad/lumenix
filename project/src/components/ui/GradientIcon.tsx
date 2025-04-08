import React from 'react';
import { CropIcon as IconProps } from 'lucide-react';

interface GradientIconProps extends IconProps {
  icon: React.ComponentType<IconProps>;
}

export function GradientIcon({ icon: Icon, ...props }: GradientIconProps) {
  return (
    <div className="flex items-center justify-center">
      <Icon {...props} stroke="#A855F7" className="w-12 h-12" />
    </div>
  );
}