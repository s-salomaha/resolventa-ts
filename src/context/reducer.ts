import {IContext, Actions} from '../dataStructure';

export const init = (initialState: IContext) => {
  const searchParams: {[key: string]: string} = {};

  document.location.search
    .substring(1).split('&').forEach(pair => {
      if (pair.indexOf('=') !== -1) {
        const [key, value] = pair.split('=');
        searchParams[key] = value;
      }
  });

  return {
    filterFields: {
      name: {
        key: 'name',
        type: 'input',
        fieldName: 'Name',
        values: [''],
        curValue: !!searchParams.name ? searchParams.name : ''
      },
      gender: {
        key: 'gender',
        type: 'select',
        fieldName: 'Gender',
        values: ['Unknown', 'Female', 'Male', 'Genderless'],
        curValue: searchParams.gender ? searchParams.gender : ''
      },
      status: {
        key: 'status',
        type: 'select',
        fieldName: 'Status',
        values: ['Unknown', 'Alive', 'Dead'],
        curValue: searchParams.status ? searchParams.status : ''
      }
    },
    curPage: searchParams.page ? +searchParams.page : 1,
    resources: [],
    pagination: {},
    wishlist: [],
    loading: false,
    pushToHistory: false
  };
}

export const reducer = (state: IContext, action: Actions) => {
  switch (action.type) {
    case 'SHOW_LOADER':
      return {...state, loading: true};
    case 'HIDE_LOADER':
      return {...state, loading: false};
    case 'ADD_TO_WISHLIST':
      return {...state, wishlist: state.wishlist.concat(action.payload)};
    case 'REMOVE_FROM_WISHLIST':
      return {...state, wishlist: state.wishlist.filter(resource => resource.id !== action.payload)};
    case 'FETCH_RESOURCES':
      return {
        ...state,
        resources: action.payload.results,
        pagination: action.payload.info,
        loading: false
      };
    case 'SET_CUR_PAGE':
      return {...state, curPage: action.payload};
    case 'SET_FIELD_VALUE':
      return {
        ...state, filterFields: {
          ...state.filterFields,
          [ action.payload.fieldKey ]: {
            ...state.filterFields[ action.payload.fieldKey ],
            curValue: action.payload.fieldValue
          }
        }
      };
    case 'APP_REINIT':
      return init(action.payload);
    case 'PUSH_TO_HISTORY_TRUE':
      return {...state, pushToHistory: true};
    default:
      return state;
  }
};
