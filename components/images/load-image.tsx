type onComplete = (image: HTMLImageElement | null | undefined, error: string) => void;

const loadImage = (src: string, complete: onComplete) => {
  const image = new Image();
  const handleError = () => {
    if (complete){
      complete(null, 'Error loading the image.');
    }
  };
  const handleLoad = () => {
    if (complete){
      complete(image, null);
    }
  };
  image.onerror = handleError;
  image.onload = handleLoad;
  image.src = src;
}
export default loadImage;