import React from 'react';
import  ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import './index.css'
import Loading from './Loading';





class App extends React.Component {
  
     state = {
          lat: null,
          long: null,
          errorMessage: '',
          date: ''
    }

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                })
            },
            (err) => {
                this.setState({
                    errorMessage: err.message
                })
            }
        )

    }



    render() {
       if (this.state.errorMessage && (!this.state.lat || !this.state.long)) {
        return <div>Error: {this.state.errorMessage}</div>
       }
       if ((this.state.lat || this.state.long) && !this.state.errorMessage) {
        return(
              <div>
                <SeasonDisplay lat={this.state.lat} />
              </div>
        )
        
       }
       return <div><Loading /></div>
    } 
}


ReactDOM.render(<App />,document.querySelector("#root"));