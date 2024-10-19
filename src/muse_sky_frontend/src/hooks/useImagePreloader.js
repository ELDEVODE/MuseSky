import { useState, useEffect } from 'react';

const useImagePreloader = (imageUrls) => {
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const preloadImages = async () => {
      const promises = imageUrls.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(promises);
        if (isMounted) {
          setImagesPreloaded(true);
        }
      } catch (error) {
        console.error('Error preloading images:', error);
      }
    };

    preloadImages();

    return () => {
      isMounted = false;
    };
  }, [imageUrls]);

  return imagesPreloaded;
};

export default useImagePreloader;
