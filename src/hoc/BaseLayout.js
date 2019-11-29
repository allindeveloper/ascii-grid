import React, { Component } from "react";
import Loader from "../components/Loader/Loader";
import Product from "../pages/Products"
class BaseLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            waiting: true,
            
        }
    }
    componentWillMount() {

    }

    render() {
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
/**/

export default BaseLayout;

/**/
