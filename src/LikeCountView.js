import React, { Component } from 'react'
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";

export default class LikeCountView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            likes: null,
            postURL: '',
            data: [],
            displayurl: ''
        }
    }

    getLikesCount = () => {

        var {postURL} = this.state
        var url = postURL.split('?')[0]
        
        return fetch(url+"?__a=1")
        .then(response => response.json())
        .then((jsonData) => {
            this.state.data = []
            this.setState({data: this.state.data.concat(jsonData.graphql.shortcode_media)})
            var likes = this.state.data[0].edge_media_preview_like.count;
            var displayurl = this.state.data[0].display_url;
            this.setState({likes ,displayurl})
            console.log(this.state.likes)
        })
        .catch((error) => {
          console.error(error)
        })
    }

    render() {
        if(this.state.likes===null) {
            return (
                <div className="App">
                    <header className="App-header">
                    <div style={{marginTop: 20}}>
                    <a style={{fontSize: 60, fontWeight: 'bold', fontFamily: 'Montserrat'}}>InsView</a>
                    </div>
    
                    <div style={{width: '100%'}}>
                    <nav class="navbar navbar-expand-mg navbar-dark" style={{backgroundColor: '#333'}}>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent" >
                        <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <NavLink style={{ textDecoration: "none", color: "#fff", fontWeight: 'bold', padding: 10}} to="/">DP-Download</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink style={{ textDecoration: "none", color: "#fff", fontWeight: "bold", padding: 10}} to="/check-likes">Check Like Count</NavLink>
                        </li>
                        </ul>
                        </div>
                    </nav>
                </div> 

                <div style={{marginTop: 10}} >
                        <small>Note: This will work for only public profiles.</small>
                    </div>
    
                <div style={{width: '80%',}}>
                  <TextField
                    id="outlined-email-input"
                    style={{width: '100%',}}
                    label="Post URL"
                    type="text"
                    name="username"
                    margin="normal"
                    variant="outlined"
                    onChange={value=>{this.setState({postURL: value.target.value})}}
                  />
                  <Button variant="contained" color="primary" style={{background: '#000'}} onClick={()=>{
                      this.getLikesCount()
                    }}>
                    Check
                  </Button>
                </div>
              </header>
            </div>
            )
        } else {
            return (
            <div className="App">
                <header className="App-header">
                    <div style={{marginTop: 20}}>
                    <a style={{fontSize: 60, fontWeight: 'bold', fontFamily: 'Montserrat'}}>InsView</a>
                    </div>
    
                    <div style={{width: '100%'}}>
                    <nav class="navbar navbar-expand-mg navbar-dark" style={{backgroundColor: '#333'}}>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent" >
                        <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <NavLink style={{ textDecoration: "none", color: "#fff", fontWeight: 'bold', padding: 10}} to="/">DP-Download</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink style={{ textDecoration: "none", color: "#fff", fontWeight: "bold", padding: 10}} to="/check-likes">Check Like Count</NavLink>
                        </li>
                        </ul>
                        </div>
                    </nav>
                </div> 
    
                    <div style={{marginTop: 10}} >
                        <small>Note: This will work for only public profiles.</small>
                    </div>

                    <div style={{width: '80%',}}>
                  <TextField
                    id="outlined-email-input"
                    style={{width: '100%',}}
                    label="Post URL"
                    type="text"
                    name="username"
                    margin="normal"
                    variant="outlined"
                    onChange={value=>{this.setState({postURL: value.target.value})}}
                  />
                  <Button variant="contained" color="primary" style={{background: '#000'}} onClick={()=>{
                      this.getLikesCount()
                    }}>
                    Check
                  </Button>
                </div>
                
                    <div style={{width: '100%', marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <div style={{width: 250, height: 250}}>
                            <img src={this.state.displayurl} style={{width:'100%', height:'100%', borderRadius: '5%'}} />
                        </div>    
                        <h3 style={{marginTop: 14, marginBottom: 50}}>Likes: {this.state.likes}</h3>
                    </div>
                
                </header>
            </div>
            )
        }
    }
}
