import React from 'react';

/**
 * BrushSeparator — Renders the vecteezy brush stroke as a real <img>,
 * colorizing it via CSS masking to preserve its natural aspect ratio.
 */
const BrushSeparator = ({ fillColor = '#FDF3E2', className = '' }) => (
  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[140vw] max-w-none flex justify-center items-end overflow-hidden z-20 pointer-events-none translate-y-1/2 ${className}`}>
    <div className="relative w-full flex justify-center">
      {/* 
        This div is colorized by background-color, and masked by the brush image.
        maskSize: '100% auto' forces the mask to match the natural width/height ratio of the image.
      */}
      <div 
        className="w-[140vw]"
        style={{
          backgroundColor: fillColor,
          WebkitMaskImage: 'url(/vecteezy-brush.png)',
          WebkitMaskSize: '100% auto',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'bottom center',
          maskImage: 'url(/vecteezy-brush.png)',
          maskSize: '100% auto',
          maskRepeat: 'no-repeat',
          maskPosition: 'bottom center',
          aspectRatio: '1440 / 324'
        }}
      />
    </div>
  </div>
);

export default BrushSeparator;
