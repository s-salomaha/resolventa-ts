export interface IResource {
  id: number;
  name: string;
  gender: string;
  status: string;
  image: string;
  inWishlist: boolean;
  handleClick: (
    id: number,
    name: string,
    img: string,
    inWishlist: boolean
  ) => void;
};

export type ResourceFunc = {
  id: number,
  name: string,
  img: string,
  inWishlist: boolean
};

interface FilterField {
  key: string;
  type: string;
  fieldName: string;
  values: string[];
  curValue: string;
};

type FieldValue = {
  fieldKey: string,
  fieldValue: string
};

export interface Wishlist {
  id: number;
  name: string;
  image: string;
};

type UrlValue = string | null;

interface Pagination {
  count: number;
  pages: number;
  next: UrlValue;
  prev: UrlValue;
};

export interface IContext {
  filterFields: {
    [key: string]: FilterField
  };
  curPage: number;
  resources: IResource[],
  pagination: {
    count: number,
    pages: number,
    next: UrlValue,
    prev: UrlValue
  };
  wishlist: Wishlist[];
  loading: boolean;
  pushToHistory: boolean;
  fetchResources: () => Promise<any>;
  showLoader: () => void;
  setCurPage: (curPage: number) => void;
  setFieldValue: (fieldData: FieldValue) => void;
  addToWishlist: (resources: Wishlist[]) => void;
  removeFromWishlist: (resourceId: number) => void;
};

interface IActionShowLoader {
  type: 'SHOW_LOADER';
};

interface IActionHideLoader {
  type: 'HIDE_LOADER';
};

interface IActionAddToWishlist {
  type: 'ADD_TO_WISHLIST';
  payload: Wishlist[];
};

interface IActionRemoveFromWishlist {
  type: 'REMOVE_FROM_WISHLIST';
  payload: nimber;
};

interface IActionFetchResources {
  type: 'FETCH_RESOURCES';
  payload: {
    info: Pagination,
    results: any
  };
};

interface IActionSetCurPage {
  type: 'SET_CUR_PAGE';
  payload: number;
};

interface IActionSetFieldValue {
  type: 'SET_FIELD_VALUE';
  payload: FieldValue;
};

interface IActionAppReinit {
  type: 'APP_REINIT';
  payload: IContext;
};

interface IActionPushToHistoryTrue {
  type: 'PUSH_TO_HISTORY_TRUE';
};

export type Actions = IActionShowLoader | IActionHideLoader | IActionAddToWishlist | IActionRemoveFromWishlist | IActionFetchResources | IActionSetCurPage | IActionSetFieldValue | IActionAppReinit | IActionPushToHistoryTrue;

export type FormFieldEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputSelect>;

export type PaginationItemProps = {
  pageNum: number,
  pageText?: any,
  pageHref: string,
  active?: boolean,
  handleClick: (event: React.MouseEvent<HTMLElement>, page: number, href: string) => void
};

export type StateProps = {
  children?: ReactNode;
  initialState: IContext;
};
