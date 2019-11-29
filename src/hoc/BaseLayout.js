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
    componentDidMount() {
        this.onGetProducts(this.state.page)
        const {data} = this.props;
       
    }


    onGetProducts = (page, sort) => {
        this.props.dispatch(actions.getProducts(sort || this.props.sort, page))
    }

    render() {
        console.log("waiting",this.props)
        const {loading} = this.props;
        console.log("loading", loading)
        return (
              <div>
                {loading && <Loader/>}
                {!loading && (
                   
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
        ...state.products
    }
};

const mapDispatchToProps = dispatch => {
    return { 
        dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout);

