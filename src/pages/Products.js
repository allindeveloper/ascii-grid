import React from 'react';
import { connect } from 'react-redux'
import { getFormatProducts } from '../logic/actions/selector'

class Products extends React.Component {

    constructor(props) {
        super(props);
    }

    
    render() {
const { loading, data, more, sort } = this.props;
        console.log("props-products",this.props)

        return (
            <div>
            Products
            </div>

        );
    }

}

const mapStateToProps = state => ({
    ...state.products,
    data: getFormatProducts(state)
})

export default connect(mapStateToProps)(Products)
