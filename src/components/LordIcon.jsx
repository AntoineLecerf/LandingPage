import React, { useRef, useEffect } from 'react';

const LordIcon = ({
  src,
  trigger = 'hover',
  target,
  colors = 'primary:#19522A,secondary:#F48631',
  size = 32,
  className = '',
  style = {},
}) => {
  const iconRef = useRef(null);

  useEffect(() => {
    const el = iconRef.current;
    if (!el) return;

    // Find parent .group if target is set to '.group'
    const parent = target ? el.closest(target) : el.closest('.group');
    if (parent) {
      const handleEnter = () => {
        if (typeof el.play === 'function') {
          el.play();
        }
      };
      parent.addEventListener('mouseenter', handleEnter);
      return () => {
        parent.removeEventListener('mouseenter', handleEnter);
      };
    }
  }, [target, src]);

  return (
    <lord-icon
      ref={iconRef}
      src={src}
      trigger={trigger}
      target={target}
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
