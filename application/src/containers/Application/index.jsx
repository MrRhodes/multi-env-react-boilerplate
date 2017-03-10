
import React, { Component } from 'react';

export default class Application extends Component {
    
    state = {
        isLoading: true
    }
    
    componentDidMount() {
        
        const { greeting } = config;
        
        new Promise(resolve => {
            
            setTimeout(resolve, 1000);
            
        }).then(data => {
            this.setState({ isLoading: false, message: greeting });
        });
        
    }
    
    render() {
        
        const { isLoading, message } = this.state;
        
        return <div>{isLoading ? 'Loading' : message }</div>;
        
    }
    
};
