import React, { Component } from "react";
import { connect } from 'react-redux'
import {actions} from '../logic/actions/actions'
import Loader from "../components/Loader/Loader";
import Product from "../pages/Products"
class BaseLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            waiting: true,
            page:1
        }
    }
    componentWillMount() {
        this.onGetProducts(this.state.page)
    }


    onGetProducts = (page, sort) => {
        this.props.dispatch(actions.getProducts(sort || this.props.sort, page))
    }

    render() {
        console.log("props", this.props)
        return (
              <div>
                {this.state.waiting && <Loader/>}
                {!this.state.waiting && (
                   
                    <Product
                        {...this.props}
                        {...this.state}
                    />
                    
                )}
            </div>
            
        );
    }
};
const mapStateToProps = state => {
    return {
        products: state.products
    }
};

const mapDispatchToProps = dispatch => {
    return { 

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout);

