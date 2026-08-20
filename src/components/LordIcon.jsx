import React, { useRef } from 'react';

const LordIcon = ({
  src,
  trigger = 'hover',
  colors = 'primary:#19522A,secondary:#F48631',
  size = 32,
  className = '',
  style = {},
}) => {
  const iconRef = useRef(null);

  return (
    <lord-icon
      ref={iconRef}
      src={src}
      trigger={trigger}
      colors={colors}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-block',
        verticalAlign: 'middle',
        ...style,
      }}
      class={className}
    />
  );
};

export default LordIcon;
