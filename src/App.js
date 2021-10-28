import './App.css';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import Subject from './components/Subject.js';
import Control from './components/Control.js';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import React, {Component} from 'react';




class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: "welcome",
      selected_content_id: 2,
      subject:{title:'WEB', sub:'world wide web'},
      welcome:{title:"welcome", desc:"hello react!"},
      contents: [
        {id:1, title:'HTML', desc:'HTML is Hiper Text Markup Language'},
        {id:2, title:'CSS', desc:'CSS is ..'},
        {id:3, title:'JAVASCRIPT', desc:'javascript is ..'}
      ]
    }
  }
  getReadContent() {
    for (var i = 0; i < this.state.contents.length; i++) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
        break;
      }
    }
  }
  getContent(){
    var _title, _desc, _article, _content = null;
    if(this.state.mode ==="welcome"){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === "read"){
      _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if(this.state.mode === "create"){
      _article = <CreateContent onSubmit={
        function(_title,_desc){
        this.max_content_id++;
        var _contents = Array.from(this.state.contents);
        _contents.push({id:this.max_content_id, title:_title, desc:_desc});
        this.setState({
          contents: _contents,
          mode: "read",
          selected_content_id: this.max_content_id
        });
      }.bind(this)}></CreateContent>
    } else if(this.state.mode === "update") {
      _content = this.getReadContent();
      _article = <UpdateContent data = {_content} onSubmit={
        function(_id, _title, _desc){
          var _contents = Array.from(this.state.contents);
          _contents.forEach(function(part, index, array){
            if(part.id=== _id){
              array[index] = {id: _id, title: _title, desc: _desc};
              return;
            }
          });
          this.setState({
            contents: _contents,
            mode: "read"
          });
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }
  render() {
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage = { function(){
            this.setState({
              mode: "welcome"
            })
          }.bind(this)}
          >         
        </Subject>
        <TOC 
        onChangePage={function(id){
          this.setState({
            mode: "read",
            selected_content_id: id
        });
        }.bind(this)} data={this.state.contents}>
        </TOC>
        <Control onChangeMode={function(_mode){
          if(_mode === "delete"){
            if(window.confirm("really?")){
              var _contents = Array.from(this.state.contents);
              _contents.forEach(function(part, index){
                if(part.id === this.state.selected_content_id){
                  _contents.splice(index,1);
                  return;
                }
              }.bind(this));
              this.setState({
                mode:"welcome",
                contents: _contents
              })
              alert("deleted!");
            }
          } else {
            this.setState({
              mode: _mode
            })
          }
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
