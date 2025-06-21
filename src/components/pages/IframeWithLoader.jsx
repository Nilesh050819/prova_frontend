import React, { useState } from 'react';

const IframeWithLoader = ({ src, height = 600, width = '100%' }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div style={{ position: 'relative', width, height }}>
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <div className="loader">Loading...</div>
        </div>
      )}

      <iframe
        src={src}
        title="PDF Viewer"
        style={{ width: '100%', height: '100%', border: 'none' }}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default IframeWithLoader;
