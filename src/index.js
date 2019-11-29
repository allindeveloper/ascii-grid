import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import BaseLayout from './hoc/BaseLayout'
import store from './logic/store';

//console.log("storesate", store.getState())

render(
    <Provider store={store}>
        <BaseLayout />
    </Provider>,
    document.getElementById('app')
)