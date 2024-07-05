import data from '../data/etsy.json';

const Listing = () => {
  const items = data.filter(item => item.state !== 'removed');

  items.forEach(item => {
    if (item.currency_code === 'USD') {
      item.totalPrice = `$${item.price}`;
    } else if (item.currency_code === 'EUR') {
      item.totalPrice = `€${item.price}`;
    } else {
      item.totalPrice = `${item.price} ${item.currency_code}`;
    }

    if (item.quantity <= 10) {
      item.quantityClass = 'level-low';
    } else if (item.quantity <= 20) {
      item.quantityClass = 'level-medium';
    } else {
      item.quantityClass = 'level-high';
    }
  });

  const trimTitle = title => {
    return title.length > 50 ? title.substring(0, 50) + '...' : title;
  };

  return (
    <div className="item-list">
      { items.map(item => (
        <div className="item" key={item.listing_id}>
          <div className="item-image">
            <a href={item.url}>
              <img src={item.MainImage.url_570xN} />
            </a>
          </div>
          <div className="item-details">
            <p className="item-title">{trimTitle(item.title)}</p>
            <p className="item-price">{item.totalPrice}</p>
            <p className={`item-quantity ${item.quantityClass}`}>{item.quantity} left</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Listing;