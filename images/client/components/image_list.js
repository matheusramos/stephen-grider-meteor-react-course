// create image list coponent
// import react
import React from 'react';
import ImageDetail from './image_detail'

// create component
const ImageList = (props) => {
  const validImages = props.images.filter(image => !image.is_album);
  const RenderedImages = validImages.map(image =>
    <ImageDetail key={image.title} image={image} />
  );

  // curly braces is the jsx way to reference a js variable
  return (
    <ul className="media-list list-group">
      {RenderedImages}
    </ul>
  );
}

// export component
export default ImageList;
