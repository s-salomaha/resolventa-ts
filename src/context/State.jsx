import React, {useReducer, useEffect} from 'react';
import axios from 'axios';
import {Context} from './context';
import {reducer, init} from './reducer';
import history from "../history";
import {Wishlist} from '../dataStructure';

export const State: React.FC = ({children, initialState}) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  const showLoader = (): void => dispatch({type: 'SHOW_LOADER'});

  const hideLoader = (): void => dispatch({type: 'HIDE_LOADER'});

  const addToWishlist = (resources: Wishlist[]): void => dispatch({type: 'ADD_TO_WISHLIST', payload: resources});

  const removeFromWishlist = (resourceId: number): void => dispatch({type: 'REMOVE_FROM_WISHLIST', payload: resourceId});

  const fetchResources = async (): Promise<any> => {
    showLoader();

    const fetchUrl = 'https://rickandmortyapi.com/api/character/';

    let searchString = Object.keys(state.filterFields)
      .filter(key => state.filterFields[key].curValue)
      .map(key => `${key}=${state.filterFields[key].curValue}`)
      .join('&');

    searchString += state.curPage > 1
      ? searchString
        ? '&page='+state.curPage
        : 'page='+state.curPage
      : '';

    const url = `${fetchUrl}${searchString ? '?'+searchString : ''}`;

    try {
      const res = await axios.get(url);
      const payload = res.data;
      dispatch({type: 'FETCH_RESOURCES', payload});
    } catch(e) {
      if (e.response.status === 404) {
        hideLoader();
      }
    }

    if (state.pushToHistory) {
      history.push(searchString ? `/?${searchString}` : '/');
    } else {
      dispatch({type: 'PUSH_TO_HISTORY_TRUE'});
    }
  };

  const setCurPage = (curPage: number): void => {
    if (curPage === state.curPage) {
      fetchResources();
    } else {
      dispatch({type: 'SET_CUR_PAGE', payload: curPage});
    }
  }

  const setFieldValue = (fieldData: setFieldValue): void => dispatch({type: 'SET_FIELD_VALUE', payload: fieldData});

  const appReinit = (): void => dispatch({type: 'APP_REINIT', payload: initialState});

  useEffect(() => {
    fetchResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.curPage]);

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === 'POP') {
        appReinit();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[history]);

  useEffect(() => {
    const wishlist = JSON.parse( localStorage.getItem('wishlist') );
    if (wishlist && wishlist.length) {
      addToWishlist(wishlist);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  return (
    <Context.Provider value={{
      filterFields: state.filterFields,
      curPage: state.curPage,
      resources: state.resources,
      pagination: state.pagination,
      wishlist: state.wishlist,
      loading: state.loading,
      fetchResources,
      showLoader,
      setCurPage,
      setFieldValue,
      addToWishlist,
      removeFromWishlist
    }}>
      {children}
    </Context.Provider>
  );
}
