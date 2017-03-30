
import React, { Component } from 'react';

export default class Application extends Component {
    
    state = {
        isLoading: true
    }
    
    componentDidMount() {
        
        const { API_ENDPOINT: greeting } = config;
        
        new Promise(resolve => {
            
            setTimeout(resolve, 1000);
            
        }).then(data => {
            this.setState({ isLoading: false, message: greeting });
        });
        
    }
    
    render() {
        
        const { isLoading, message } = this.state;
        
        return (
            <div>
                <div>{isLoading ? 'Loading' : message }</div>
                <div>Running "{APP_ENV}" config in "{NODE_ENV}" environment</div>
            </div>
        );
        
    }
    
};
