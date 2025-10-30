import React, { useState } from 'react';

const SafeImage = ({ src, alt, className, onClick }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return null; // Don't render anything if the image fails to load
  }

  return (
    <div className="group relative break-inside-avoid cursor-pointer" onClick={onClick}>
      <img src={src} alt={alt} className={className} loading="lazy" onError={handleError} />
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
        <p className="text-white text-sm font-bold">View Image</p>
      </div>
    </div>
  );
};

export default SafeImage;
