import { request } from '../../services'
import { types } from './constants'
import { Config } from '../../../configuration'

const get = () => ({
    type: types.PRODUCTS_REQUEST
})

const success = (data, sort) => ({
    type: types.PRODUCTS_SUCCESS,
    data,
    sort
})

const failure = error => ({
    type: types.PRODUCTS_FAILURE,
    error
})

const preload = data => ({
    type: types.PRODUCTS_PRELOAD,
    data
})

const loadmore = () => ({
    type: types.PRODUCTS_LOADMORE
})

const getProducts = (sort = '', page = 1, limit = Config.PRODUCT_LIMIT) => dispatch => {
    dispatch(get())

    request(`products?_page=${page}&_limit=${limit}${sort ? '&_sort=' + sort : ''}`, {}, 'get')
        .then(res => {
            dispatch(success(res, sort))

            // preload data
            request(`products?_page=${page + 1}&_limit=${limit}${sort ? '&_sort=' + sort : ''}`, {}, 'get')
                .then(res => dispatch(preload(res)))
        })
        .catch(err => dispatch(failure(err)))
}

const loadMoreProducts = (sort, page, limit = Config.PRODUCT_LIMIT) => dispatch => {
    dispatch(get())

    dispatch(loadmore())

    // preload data
    request(`products?_page=${page + 1}&_limit=${limit}${sort ? '&_sort=' + sort : ''}`, {}, 'get')
        .then(res => dispatch(preload(res)))
}

export const actions = {
    getProducts,
    loadMoreProducts
}
