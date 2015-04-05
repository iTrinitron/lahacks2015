// tutorial1.js
var Id = React.createClass({
  render: function() {
    return (
      <div className="id">
        Creator_Id: {this.props.creator} | Receiver_Id: {this.props.receiver}
      </div>
    );
  }
});

var Image = React.createClass({
  render: function() {
   var filename = this.props.url;
    var url = "uploads/";
    var url = url.concat(filename); 
    
    return (
      <div className="image">
        <img src={url}/>
      </div>
    );
  }
});


var Coordinates = React.createClass({
  render: function() {
    return (
      <div className="coordinates">
      {this.props.lat} | {this.props.long}
      </div>
    );
  }
});

var PhotoList = React.createClass({
  render: function() {
    var photoNodes = this.props.data.map(function (photo) {
      return (
        <div className="photo">
        <Coordinates lat={photo.lat} long={photo.long}/>
        <Id creator={photo.creator_id} receiver={photo.receiver_id}/>
        <Image url={photo.file}/>
      </div>
      );
    });
    return (
      <div className="PhotoList">
        {photoNodes}
      </div>
    );
  }
});

var PhotoBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <PhotoList data={this.state.data}/>
    );
  }
});


React.render(
  <PhotoBox url="/photos/getAll" pollInterval={2000}/>,
  document.getElementById('content')
); 