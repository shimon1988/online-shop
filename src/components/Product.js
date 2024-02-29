import React from 'react';

const Product = (props) => {
  const {
    id,
    title,
    description,
    price,
    discountPercentage,
    thumbnail,
    onAddtoCart,
    onAddtoFavorites,
    inCart,
    inFavorites,
  } = props;

  const discountedPrice = Math.round(price * (100 - discountPercentage) / 100);

  return (
    <div className="product">
      <img src={thumbnail} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Price: ${price}</p>
      {discountPercentage > 0 && <p>Discounted Price: ${discountedPrice}</p>}
      <button onClick={() => onAddtoCart(id)} disabled={inCart}>
        {inCart ? 'In Cart' : 'Add to Cart'}
      </button>
      <button onClick={() => onAddtoFavorites(id)} disabled={inFavorites}>
        {inFavorites ? 'In Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default Product;
