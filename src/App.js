import React from 'react';
import './App.css';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: ''
    }
  }

  componentDidMount(){

  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <div style={{marginTop: 20}}>
            <a style={{fontSize: 60, fontWeight: 'bold', fontFamily: 'Montserrat'}}>InstaView</a>
          </div>
          <div style={{width: '80%',}}>
            <TextField
              id="outlined-email-input"
              style={{width: '100%',}}
              label="Username"
              type="text"
              name="username"
              margin="normal"
              variant="outlined"
              onChange={value=>{this.setState({username: value.target.value})}}
            />
            <Button variant="contained" color="primary" style={{background: '#3C40C6'}} onClick={()=>{console.log(this.state.username)}}>
              get results
            </Button>
          </div>
        </header>
      </div>
    );
  }

}
