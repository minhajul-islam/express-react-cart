import { change, initialize } from 'redux-form';
import { del, get, patch, post } from '../../utils/httpRequest/httpMethods';
import history from './../../../history';

export function productCreate(formData) {
  return () =>
    post(
      '/product',
      formData,
      'multipart/form-data',
    )
      .then((res) => {
        history.push(`/product/${res.data.payload.productId}`);
      });
}

export function productUpdate(productId, data) {
  return () =>
    patch(
      `/product/${productId}`,
      data,
      'multipart/form-data',
    );
}

export function productDeleteById(productId) {
  return dispatch =>
    del(`/product/${productId}`)
      .then(() => {
        dispatch(productGetAll()); // Reload list
      });
}

export function productGetAll() {
  return dispatch =>
    get('/product')
      .then((res) => {
        dispatch({
          type: 'PRODUCT_LOAD_ALL',
          payload: res.data,
        });
      });
}

export function productGetById(productId) {
  return dispatch =>
    get(`/product/${productId}`)
      .then((res) => {
        dispatch(initialize('product', { ...res.data })); // Fill form
        dispatch({
          type: 'PRODUCT_INFO',
          payload: res.data,
        });
      });
}

// Filter from redux store
export function productFilterByCategoryId(categoryId) {
  return dispatch =>
    dispatch({
      type: 'PRODUCT_FILTER_BY_CATEGORY_ID',
      payload: categoryId,
    });
}

export function rerangeImages(images) {
  return dispatch => dispatch(change('product', 'image', images));
}
