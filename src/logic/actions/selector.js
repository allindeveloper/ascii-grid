import { createSelector } from 'reselect'
import { helpers } from '../../../CommonFunctions'
import { configuration } from '../../../configuration'

const returnProducts = state => state.products


export const getFormatProducts = createSelector(
    [returnProducts],
    products => {
        const now = new Date()
        return products.data.map(p => {
            let clone = { ...p }
            const date = new Date(clone.date)
            const diff = helpers.diffDays(date, now)

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
            if (diff > configuration.DATE_LIMIT) clone.date = date.toLocaleDateString()

            clone.price = `$${clone.price}`

            return clone
        })
    }
)