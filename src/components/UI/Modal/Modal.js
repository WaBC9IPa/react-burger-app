import React from "react";

import Aux from "../../../hoc/Aux";
import Backdrop from "../../UI/Backdrop/Backdrop";
import classes from "./Modal.css"

class Modal extends React.Component {

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render(){
        return (
            <Aux>
                <Backdrop clicked={this.props.modalClosed} show={this.props.show} />
                <div 
                className={classes.Modal}
                style={{transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
                        opacity: this.props.show ? "1" : "0"}}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;