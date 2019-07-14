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
      posts: {
        post1: '',
        post2: '',
        post3: '',
        post4: '',
        post5: '',
        post6: '',
        post7: '',
        post8: '',
        post9: '',
        post10: ''
      }
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


        //Posts Data
        if(postsNode.length!==0){
          var postUrl1 = postsNode[0].node.display_url;
          var postUrl2 = postsNode[1].node.display_url;
          var postUrl3 = postsNode[2].node.display_url;
          var postUrl4 = postsNode[3].node.display_url;
          var postUrl5 = postsNode[4].node.display_url;
          var postUrl6 = postsNode[5].node.display_url;
          var postUrl7 = postsNode[6].node.display_url;
          var postUrl8 = postsNode[7].node.display_url;
          var postUrl9 = postsNode[8].node.display_url;
          var postUrl10 = postsNode[9].node.display_url;
  
          this.setState({
            posts: {
              post1: postUrl1,
              post2: postUrl2,
              post3: postUrl3,
              post4: postUrl4,
              post5: postUrl5,
              post6: postUrl6,
              post7: postUrl7,
              post8: postUrl8,
              post9: postUrl9,
              post10: postUrl10,
            }
          })
        }

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

              {/* Recent Posts */}

              <div style={{width: '100%', marginTop: 20, display: 'flex', flexDirection: 'column'}}>
                <a style={{fontFamily: 'Montserrat'}}>Recent Posts</a>
               
                {(() => {
                  switch (this.state.isPrivate) {
                    case true:
                      return (
                        <div style={{marginTop: 10,}}>
                          <center><a style={{fontFamily: 'Roboto Condensed'}}>Cannot access posts since it is a private profile.</a></center>
                        </div>
                      );
                      case false:

                      
                      default:      
                        return(
                          <div>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                              <div>
                                <div className="postDiv">
                                  <img src={this.state.posts.post1} style={{width: '100%', height: '100%'}} />
                                </div>
                                <a style={{fontFamily: 'Roboto Condensed', textDecoration: 'none', color: '#000'}} href={this.state.posts.post1} target="blank">Download</a>
                                <div className="postDiv">
                                  <img src={this.state.posts.post2} style={{width: '100%', height: '100%'}} />
                                </div>
                                <a style={{fontFamily: 'Roboto Condensed', textDecoration: 'none', color: '#000'}} href={this.state.posts.post2} target="blank">Download</a>
                                <div className="postDiv">
                                  <img src={this.state.posts.post3} style={{width: '100%', height: '100%'}} />
                                </div>
                                <a style={{fontFamily: 'Roboto Condensed', textDecoration: 'none', color: '#000'}} href={this.state.posts.post3} target="blank">Download</a>
                                <div className="postDiv">
                                  <img src={this.state.posts.post4} style={{width: '100%', height: '100%'}} />
                                </div>
                                <a style={{fontFamily: 'Roboto Condensed', textDecoration: 'none', color: '#000'}} href={this.state.posts.post4} target="blank">Download</a>
                                <div className="postDiv">
                                  <img src={this.state.posts.post5} style={{width: '100%', height: '100%'}} />
                                </div>
                                <a style={{fontFamily: 'Roboto Condensed', textDecoration: 'none', color: '#000'}} href={this.state.posts.post5} target="blank">Download</a>
                                <div className="postDiv">
                                  <img src={this.state.posts.post6} style={{width: '100%', height: '100%'}} />
                                </div>
                                <a style={{fontFamily: 'Roboto Condensed', textDecoration: 'none', color: '#000'}} href={this.state.posts.post6} target="blank">Download</a>
                                <div className="postDiv">
                                  <img src={this.state.posts.post7} style={{width: '100%', height: '100%'}} />
                                </div>
                                <a style={{fontFamily: 'Roboto Condensed', textDecoration: 'none', color: '#000'}} href={this.state.posts.post7} target="blank">Download</a>
                                <div className="postDiv">
                                  <img src={this.state.posts.post8} style={{width: '100%', height: '100%'}} />
                                </div>
                                <a style={{fontFamily: 'Roboto Condensed', textDecoration: 'none', color: '#000'}} href={this.state.posts.post8} target="blank">Download</a>
                                <div className="postDiv">
                                  <img src={this.state.posts.post9} style={{width: '100%', height: '100%'}} />
                                </div>
                                <a style={{fontFamily: 'Roboto Condensed', textDecoration: 'none', color: '#000'}} href={this.state.posts.post9} target="blank">Download</a>
                                <div className="postDiv">
                                  <img src={this.state.posts.post10} style={{width: '100%', height: '100%'}} />
                                </div>
                                <a style={{fontFamily: 'Roboto Condensed', textDecoration: 'none', color: '#000'}} href={this.state.posts.post10} target="blank">Download</a>
                              </div>
                            </div>
                          </div>
                        );
                  }
                })()}

              </div>

              <div style={{height: 60}}></div>

            </div>

          </header>
        </div>
      );
    }

  }

}