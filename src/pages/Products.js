import React from 'react';
import { connect } from 'react-redux'
import { helpers } from '../../CommonFunctions'
import {actions} from '../logic/actions/actions'
import { getFormatProducts } from '../logic/actions/selector'
import { configuration } from '../../configuration';
import "./style.css"
import SortIcon from '../components/SortIcon';
class Products extends React.Component {

    adsKey = {}
    prevKey = 0
    constructor(props) {
        super(props);
        this.state={
            page:1
        }
    }

    componentDidMount(){
         window.addEventListener('scroll', this.onScroll, false)
    }

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () => {
        const { loading, extra } = this.props
        let elem = document.getElementById("prod");
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - configuration.OFFSET_HEIGHT && !loading && extra) {
            this.setState(prevState => ({ page: prevState.page + 1 }), () => this.onLoadMoreProducts(this.state.page))
        }
    }

    
    onGetProducts = (page, sort) => {
        this.props.dispatch(actions.getProducts(sort || this.props.sort, page))
    }


    onLoadMoreProducts = (page, sort) => {
        this.props.dispatch(actions.loadMoreProducts(sort || this.props.sort, page))
    }

    renderGrid = (products) => {
        let nodeElems = [];

        for (let p in products) {
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

    onSortChange = val => {
        const { sort, loading } = this.props
        if (sort !== val && !loading) {
            this.setState({ page: 1 })
            this.adsKey = {}
            this.prevKey = 0
            this.onGetProducts(1, val)
        }
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
                    <center><img src={"/ads/?r=" + rdKey} /></center>
                </td>
            </tr>
        )
    }


    render() {
        const { loading, data, extra, sort } = this.props;
        return (
            <div>
                <h2>Products</h2>
                <div className="box" id="prod">
                <div className="tbl-header">
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <thead>
                        <tr>
                            <th scope="col"><a onClick={() => this.onSortChange('id')} className={sort === 'id' ? 'sorted' : ''}>Id <SortIcon/></a></th>
                            <th scope="col"><a onClick={() => this.onSortChange('size')} className={sort === 'size' ? 'sorted' : ''}>Size <SortIcon/></a></th>
                            <th scope="col">Face</th>
                            <th scope="col"><a onClick={() => this.onSortChange('price')} className={sort === 'price' ? 'sorted' : ''}>Price <SortIcon/></a></th>
                            <th scope="col">Date</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div className="tbl-content">
                    <table cellPadding="0" cellSpacing="0" border="0">
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
                                  <center>  <p>~ end of catalogue ~</p></center>
                                </td>
                                
                            </tr>
                        </tbody>
                    }
                    </table>
                </div>
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => ({
    ...state.products,
    data: getFormatProducts(state)
})

export default connect(mapStateToProps)(Products)
