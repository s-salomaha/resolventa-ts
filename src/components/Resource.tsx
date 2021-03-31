import React from 'react';
import {IResource} from '../dataStructure';

export const Resource: React.FC<IResource> = ({id, name, gender, status, image, inWishlist, handleClick}) => (
  <article className="resource card h-100">
    <img
      className="card-img-top"
      src={image}
      alt={name}
    />
    <div className="resource__body card-body">
      <h2 className="resource__name card-title">{name}</h2>
      <div className="mb-2">
        <span className="text-muted">Gender: </span>{gender}
      </div>
      <div>
        <span className="text-muted">Status: </span>{status}
      </div>
    </div>
    <div
      className={inWishlist ? 'resource__wishlist in-wishlist' : 'resource__wishlist'}
      onClick={(event) => handleClick(id, name, image, inWishlist)}
    >
      <div className="resource__wishlist-icon"></div>
    </div>
  </article>
);
