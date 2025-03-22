const Gallery = ({ images }) => {
    return (
      <div>
        <h2>Your Screenshot Gallery! 🖼</h2>
        <div className="gallery-container">
          {images && images.length > 0 ? (
            images.map((pic, index) => (
              <img
                className="gallery-screenshot"
                key={index}
                src={pic}
                alt="Screenshot from query"
                width="300"
              />
            ))
          ) : (
            <h3>You haven't made a screenshot yet!</h3>
          )}
        </div>
      </div>
    );
  };
  
  export default Gallery;
  