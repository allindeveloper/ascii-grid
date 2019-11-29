import React from 'react';
import { connect } from 'react-redux'
import { helpers } from '../../CommonFunctions'

import { getFormatProducts } from '../logic/actions/selector'
import { configuration } from '../../configuration';
import  "./style.css"
class Products extends React.Component {

    adsKey = {}
    prevKey = 0
    constructor(props) {
        super(props);
    }

    renderGrid = (products) => {
        let nodeElems = [];

        for (let p in products) {
            console.log("id",p)
            let id = products[p].id;
            let size = products[p].size;
            let face = products[p].face;
            let price = products[p].price;
            let date = products[p].date;
            nodeElems.push(
                <React.Fragment key={id}>
                                <tr>
                                    <td>{id}</td>
                                    <td>{size}</td>
                                    <td style={{ fontSize: size }}>{face}</td>
                                    <td>{price}</td>
                                    <td>{date}</td>
                                </tr>
                                {p && p === configuration.ADS_PER_ROW ? this.renderAds(id) : null}
                </React.Fragment>
            )
        }

        return nodeElems;
    }

    renderAds = key => {
        let rdKey = this.adsKey[key]
        if (!rdKey) {
            rdKey = helpers.randomAdsKey(this.prevKey)

            this.prevKey = rdKey
            this.adsKey[key] = rdKey
        }
        return (
            <tr>
                <td colSpan={5}>
                    <img src={"/ads/?r=" + rdKey} />
                </td>
            </tr>
        )
    }


    render() {
        const { loading, data, extra, sort } = this.props;
        console.log("props-products", this.props)

        return (
            <div>
                Products
            <table id="aa_htmlTable">
                    <thead>
                        <tr>
                            <th scope="col"><a onClick={() => this.onSortChange('id')} className={sort === 'id' ? 'sorted' : ''}>Id</a></th>
                            <th scope="col"><a onClick={() => this.onSortChange('size')} className={sort === 'size' ? 'sorted' : ''}>Size</a></th>
                            <th scope="col">Face</th>
                            <th scope="col"><a onClick={() => this.onSortChange('price')} className={sort === 'price' ? 'sorted' : ''}>Price</a></th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>

                    {/* <tbody>
                        {
                            this.renderGrid(data)
                        }
                    </tbody> */}
                    {
                        data.map((p, index) => (
                            <tbody key={p.id}>
                                {index && index % configuration.ADS_PER_ROW === 0 ? this.renderAds(p.id) : null}
                                <tr>
                                    <td>{p.id}</td>
                                    <td>{p.size}</td>
                                    <td style={{ fontSize: p.size }}>{p.face}</td>
                                    <td>{p.price}</td>
                                    <td>{p.date}</td>
                                </tr>
                            </tbody>
                        ))
                    }

                    {
                        !extra &&
                        <tbody>
                            <tr>
                                <td colSpan={5}>
                                    ~ end of catalogue ~
                                </td>
                            </tr>
                        </tbody>
                    }
                </table>
            </div>

        );
    }

}

const mapStateToProps = state => ({
    ...state.products,
    data: getFormatProducts(state)
})

export default connect(mapStateToProps)(Products)
