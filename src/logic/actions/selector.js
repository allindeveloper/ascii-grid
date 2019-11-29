import { createSelector } from 'reselect'

import { Helpers } from '../../utils/helpers'
import { Config } from '../../utils/config'

const getProducts = state => state.products

export const getFormatProducts = createSelector(
    [getProducts],
    products => {
        const now = new Date()
        return products.data.map(p => {
            let clone = { ...p }
            const date = new Date(clone.date)
            const diff = Helpers.diffDays(date, now)

            switch (diff) {
                case 0:
                    clone.date = 'today'
                    break
                case 1:
                    clone.date = 'yesterday'
                    break
                default:
                    clone.date = `${diff} days ago`
                    break;
            }
            if (diff > Config.DATE_LIMIT) clone.date = date.toLocaleDateString()

            clone.price = `$${clone.price}`

            return clone
        })
    }
)