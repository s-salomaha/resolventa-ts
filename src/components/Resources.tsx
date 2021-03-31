import React, {useContext} from 'react';
import {Context} from '../context/context';
import {Resource} from '../components/Resource';
import {Loader} from '../components/Loader';
import {Pagination} from '../components/Pagination';

export const Resources: React.FC = () => {
  const {
    loading,
    resources,
    addToWishlist,
    removeFromWishlist,
    wishlist
  } = useContext(Context);

  const handleClick = (
    id: number,
    name: string,
    image: string,
    inWishlist: boolean
  ): void => {
    if (inWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist([{
        id,
        name,
        image
      }]);
    }
  };

  const wishlistIds = Object.values(wishlist).map(resource => resource.id);

  return (
    <>
      {loading

        ? <Loader/>

        : resources.length

          ? <>
              <ul className="resources-list list-unstyled row mb-5">
                {resources.map(resource => (
                  <li className="col-md-3 mb-4" key={resource.id}>
                    <Resource
                      id={resource.id}
                      name={resource.name}
                      gender={resource.gender}
                      status={resource.status}
                      image={resource.image}
                      inWishlist={wishlistIds.includes(resource.id)}
                      handleClick={handleClick}
                    />
                  </li>
                ))}
              </ul>
              <Pagination/>
            </>

          : <div>No data found</div>
      }
    </>
  );
};
