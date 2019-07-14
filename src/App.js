import React from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      data: [],
      profilePic: '',
      followers: '',
      following: '',
      bio: '',
      postsCount: '',
      isPrivate: '',
      postsNode: '',
    }
  }

  componentDidMount(){

  }

  getDataFromApi = () => {
    return fetch("https://www.instagram.com/"+this.state.username+"/?__a=1")
      .then(response => response.json())
      .then((jsonData) => {
        this.state.data = []
        this.setState({data: this.state.data.concat(jsonData)})
        var objArr = this.state.data[0];
        var picUrl = objArr.graphql.user.profile_pic_url_hd;
        var followerCount = objArr.graphql.user.edge_followed_by.count;
        var followingCount = objArr.graphql.user.edge_follow.count;
        var bio = objArr.graphql.user.biography;
        var postsCount = objArr.graphql.user.edge_owner_to_timeline_media.count;
        var isPrivate = objArr.graphql.user.is_private;
        var postsNode = objArr.graphql.user.edge_owner_to_timeline_media.edges;
        

        this.setState({profilePic: picUrl, followers: followerCount, following: followingCount, bio: bio, postsCount: postsCount, isPrivate: isPrivate, postsNode: postsNode})


        console.log(this.state)

      })
      .catch((error) => {
        console.error(error)
      })
  };


  render(){

    if(this.state.data.length===0){
      return(
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
              <Button variant="contained" color="primary" style={{background: '#000'}} onClick={()=>{
                this.getDataFromApi()
              }}>
                Search
              </Button>
            </div>
          </header>
        </div>
      );
    }
    else{
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
              <Button variant="contained" color="primary" style={{background: '#000'}} onClick={()=>{
                this.getDataFromApi()
              }}>
                Search
              </Button>
            </div>
            
            <div style={{width: '100%', marginTop: 30, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div style={{width: 250, height: 250}}>
                <img src={this.state.profilePic} style={{width:'100%', height:'100%', borderRadius: '5%'}} />
              </div>
              <div style={{width: '100%', marginTop: 20}}>
                <Button variant="contained" color="primary" style={{background: '#000'}} onClick={()=>{
                  window.open(this.state.profilePic, "_blank");
                }}>
                  Download Image
                </Button>
              </div>
              <div style={{width: '100%', marginTop: 15}}>
                <a style={{fontSize: 18, color:'#000', fontFamily: 'Roboto Condensed'}}>Posts: {this.state.postsCount}</a>
              </div>
              <div style={{width: '100%', marginTop: 2}}>
                <a style={{fontSize: 18, color:'#000', fontFamily: 'Roboto Condensed'}}>Followers: {this.state.followers}</a>
                <a style={{fontSize: 18, color:'#000', fontFamily: 'Roboto Condensed', marginLeft: 10}}>Following: {this.state.following}</a>
              </div>
              <div style={{width: '100%', marginTop: 2}}>
                <a style={{fontSize: 18, color:'#000', fontFamily: 'Roboto Condensed'}}>{this.state.bio}</a>
              </div>

              
              <div style={{height: 60}}></div>

            </div>

          </header>
        </div>
      );
    }

  }

}