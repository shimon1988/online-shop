import { useEffect, useState } from 'react';
import './App.css';
import Product from './components/Product';

function App() {
  const [appProducts, setAppProducts] = useState([]);
  const [itemsInCart, setItemsInCart] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [loadMoreClicked, setLoadMoreClicked] = useState(false);

  const onAddtoCartItemId = (id) => {
    const alreadyInCart = itemsInCart.some((item) => item.id === id);
    if (alreadyInCart) {
      alert('This product is already in the cart!');
    } else {
      setItemsInCart([...itemsInCart, { id, quantity: 1 }]);
    }
  };

  const onRemoveFromCart = (id) => {
    const updatedCart = itemsInCart.filter((item) => item.id !== id);
    setItemsInCart(updatedCart);
  };

  const onUpdateQuantity = (id, newQuantity) => {
    const updatedCart = itemsInCart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setItemsInCart(updatedCart);
  };

  const onAddtoFavorites = (id) => {
    const alreadyInFavorites = favoriteProducts.some((item) => item.id === id);
    if (!alreadyInFavorites) {
      setFavoriteProducts([...favoriteProducts, { id }]);
    }
  };

  const onRemoveFromFavorites = (id) => {
    const updatedFavorites = favoriteProducts.filter((item) => item.id !== id);
    setFavoriteProducts(updatedFavorites);
  };

  const onLoadMore = () => {
    const newVisibleProducts = visibleProducts + 12;
  
    if (newVisibleProducts > 112) {
      alert('No more items in the store!');
    } else {
      setVisibleProducts(newVisibleProducts);
      setLoadMoreClicked(true);
    }
  };

  useEffect(function () {
    fetch('https://dummyjson.com/products?limit=100')
      .then((response) => response.json())
      .then((json) => setAppProducts(json.products.slice(0, visibleProducts)));
  }, [visibleProducts, loadMoreClicked]);

  return (
    <div className="App">
      <div className="sidenav">
      <h2>Cart</h2>
      <div className="onAddtoCartContainer">
        {itemsInCart.map((item, index) => {
          const itemProd = appProducts.find((product) => product.id === item.id);
          const totalItemPrice = itemProd
            ? Math.round(itemProd.price * (100 - itemProd.discountPercentage) / 100) * item.quantity
            : 0;

          return (
            <div key={index} className="cart-item">
              {itemProd && (
                <>
                  <img src={itemProd.thumbnail} alt={itemProd.title} />
                  <div className="cart-item-details">
                    <h3>{itemProd.title}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Total Price: {totalItemPrice}$</p>
                    <button onClick={() => onRemoveFromCart(item.id)}>Remove</button>
                  </div>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => onUpdateQuantity(item.id, e.target.value)}
                    min="1"
                  />
                </>
              )}
            </div>
          );
        })}
        {itemsInCart.length > 0 && (
          <div className="total-price-container">
            <h2>Total-Price: {itemsInCart.reduce((total, item) => {
              const itemProd = appProducts.find((product) => product.id === item.id);
              const itemPrice = itemProd
                ? Math.round(itemProd.price * (100 - itemProd.discountPercentage) / 100) * item.quantity
                : 0;
              return total + itemPrice;
            }, 0)}$
            </h2>
          </div>
        )}
      </div>
    </div>
      <div className="main-content">
        {appProducts.map((product, index) => (
          <Product
            {...product}
            key={index}
            onAddtoCart={onAddtoCartItemId}
            onAddtoFavorites={onAddtoFavorites}
            inCart={itemsInCart.some((item) => item.id === product.id)}
            inFavorites={favoriteProducts.some((item) => item.id === product.id)}
          />
        ))}
        <button onClick={onLoadMore}>Load More</button>
      </div>

      <div className="favorites-sidenav">
        <h2>Favorites</h2>
        {favoriteProducts.map((item, index) => {
          const favoriteProd = appProducts.find((product) => product.id === item.id);
          return (
            <div key={index} className="favorites-item">
              {favoriteProd && (
                <>
                  <img src={favoriteProd.thumbnail} alt={favoriteProd.title} />
                  <div className="favorites-item-details">
                    <h3>{favoriteProd.title}</h3>
                    <button onClick={() => onRemoveFromFavorites(item.id)}>Remove from Favorites</button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;