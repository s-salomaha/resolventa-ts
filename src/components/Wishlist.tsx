import React, {useContext} from 'react';
import {Context} from '../context/context';

export const Wishlist: React.FC = () => {
  const {
    removeFromWishlist,
    wishlist
  } = useContext(Context);

  const handleClick = (id: number) => {
    removeFromWishlist(id);
  };

  return (
    <>
      {!!wishlist.length && <div className="wishlist ml-2">
        <div className="wishlist__icon">{wishlist.length}</div>
        <ul className="wishlist__list list-unstyled px-3 pt-3 pb-2">
          {wishlist.map(resource => (
            <li className="wishlist-item mb-2" key={resource.id}>
              <div className="row ">
                <div className="col-auto">
                  <img
                    className="wishlist-item__img"
                    src={resource.image}
                    alt={resource.name}
                  />
                </div>
                <div className="col d-flex align-items-center">
                  <div className="wishlist-item__name py-2">{resource.name}</div>
                </div>
                <div className="col-auto d-flex align-items-center pr-4">
                  <button
                    type="button"
                    className="wishlist-item__close btn btn-light"
                    onClick={() => handleClick(resource.id)}
                  >
                    &times;
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>}
    </>
  );
}
