import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
    }
  }

  textChange(event) {
    this.setState({
      name: event.target.value,
    })
  }

  enterPressed(event) {

    var name = this.state.name;

    var url = 'http://localhost:7000/' + name;

    var code = event.keyCode || event.which;

    if (code === 13) {

      console.log(name);
      fetch(url, {
          mode: 'no-cors',
           // regular fetch option
           method: 'GET',
        
           // add reply for this fetch
           replyWith: {
               status: 200,
               body: 'Dictionary app',
               headers: {
                   'Content-Type': 'text/json'
               }
           }})
      .then(function(res){
          console.log(res.text());

          return res.text;
       })
      .catch(( error) => { console.log('error')});

      // const coinUrl = `${url}${name}/`;
      // const resp = await axios.get(coinUrl);
      // const coin = resp.data[0];

      // axios.get(`https://od-api.oxforddictionaries.com/api/v1/entries/en/stubborn`, 
      // { 
      //   headers: {
      //     'Access-Control-Allow-Origin': '*',
      //     'Access-Control-Allow-Credentials': true,
      //     // 'Accept' : 'application/json',
      //     'Content-Type' : 'application/json',
      //     'app_id': '3d2db6c7',
      //     'app_key': 'e0853a2930fcab285ccb1c45dba4548f'
      //   }, 
      //   withCredentials: true,
      //   credentials: 'same-origin'
      // })
      // .then(function (response) {
      //   console.log(response);
      //   //return response
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });

      var response = [
        {"Word" : "chair", "Definition" : "A thing you sit on", "WordType": "Noun"},
        {"Word" : "courage", "Definition" : "Not fearing anything", "WordType" : "Noun"},
        {"Word" : "walk", "Definition" : "A moving activity", "WordType" : "Verb"}
      ];

      for(var i = 0; i < response.length; i++){
        if (response[i]['Word'] === name) {
          document.getElementById("content1").innerHTML = response[i]['Definition'];
          document.getElementById("content2").innerHTML = response[i]['WordType'];
          document.getElementById("content3").innerHTML = '';
          
          break;
        }

        if (i === response.length - 1){
          document.getElementById("content1").innerHTML = '';
          document.getElementById("content2").innerHTML = '';
          document.getElementById("content3").innerHTML = 'No such word exists';
        }
      }
            
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Dictionary</h1>
        </header>
        <p className="App-intro">
          Search for a word in English.
        </p>
        <br/>
        <input 
              placeholder='Enter the word' 
              onChange={this.textChange.bind(this)} 
              value={this.state.name} 
              type="text" 
              name="input_keyword"
              onKeyPress={this.enterPressed.bind(this)} 
        />
        <div>
          <br/><br/>
            Meaning: <div id="content1"></div>
          <br/><br/>
            Type: <div id="content2"></div>
          <br/><br/>
            <div id="content3"></div>
        </div>
      </div>
      
    );
  }
}

export default App;
