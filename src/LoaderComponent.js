/**
 * Created by Sadam Hussain on 12/15/2017.
 */
import React, { Component } from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const style = {
    refresh: {
        position: 'relative'
    },
};

const dimDiv = {
    background: 'rgba(0,0,0,.5)',
    width: "100%",
    height: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 999,
}

class LoaderComponent extends Component {
    constructor(props) {
        super(props);
        console.log("26", this.props);
        this.state = {
            loadingStatus: "loading",
        };

        //this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    }

    // componentDidMount(){
    //     console.log("37 ",this.props);
    //     this.setState({
    //        loadingStatus: this.props.status
    //     });
    // }

    render() {
        if(this.state.loadingStatus){
            return(
                <div style={dimDiv}>
                    <RefreshIndicator
                        size={50}
                        left={750}
                        top={300}
                        loadingColor="#FF9800"
                        status={this.state.loadingStatus}
                        style={style.refresh}
                    />
                </div>
            );
        }else{
            return <div>
                <RefreshIndicator
                    size={50}
                    left={750}
                    top={300}
                    loadingColor="#FF9800"
                    status={this.state.loadingStatus}
                    style={style.refresh}
                />
            </div>;
        }

    }
}

export default LoaderComponent;