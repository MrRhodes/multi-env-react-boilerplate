
import React, { Component } from 'react';


export default class Application extends Component {
    
    state = {
        isLoading: true
    }
    
    componentDidMount() {
        
        new Promise(resolve => {
            
            setTimeout(resolve, 1000);
            
        }).then(data => {
            this.setState({ isLoading: false });
        });
        
    }
    
    render() {
        
        const { isLoading } = this.state;
        
        return <div>{isLoading ? 'Loading' : 'Hello World 🌎'}</div>;
        
    }
    
};
