
//-----------Stars Frame------------------------------------
var StarsFrame = React.createClass ({
  render: function (){
    var numberOfStars = this.props.numberOfStars;
    var stars = [];
    
    for (var i=0; i<numberOfStars; i++){
      stars.push(
        <span className="glyphicon glyphicon-star"></span>
        );
    }
    
    return (
        <div id="stars-frame">
          <div className="well">
            {stars}
          </div>
        </div>
    )
  }
});



//-----------Button Frame------------------------------------
var ButtonFrame = React.createClass ({
  render: function (){
    var button, disabled,
        correct = this.props.correct,
        tryes = this.props.numberOfTryes;
        
    switch (correct){
      case true:
        button = (
          <button className="btn btn-success btn-lg"
                  onClick={this.props.acceptAnswer}>
            <span className="glyphicon glyphicon-ok"></span>
          </button>);
      break;
        
      case false:
        button = (
          <button className="btn btn-danger btn-lg">
            <span className="glyphicon glyphicon-remove"></span>
          </button>);
      break;
      
      default :
        disabled = (this.props.selectedNumbers.length ===0);
        button = (
          <button className="btn btn-primary btn-lg" 
                  disabled={disabled}
                  onClick={this.props.checkAnswer}>
            =
          </button>);
    }    
        
    return (
        <div id="button-frame">
          {button}
          <br/><br/>
          <button className="btn btn-warning btn-xs" onClick={this.props.redraw}>
            <span className="glyphicon glyphicon-refresh"></span>
            <br/>{tryes}
          </button>
        </div>
    )
  }
});



//-----------Answers Frame------------------------------------
var AnswerFrame = React.createClass ({
  
  render: function (){
    var props = this.props,
        selectedNumbers = props.selectedNumbers.map(function(number){
          return (
            <span onClick={props.unSelectNumber.bind(null,number)}>
              {number}
            </span>
          )
        });
    
    return (
        <div id="answer-frame">
          <div className="well">
            {selectedNumbers}
          </div>
        </div>
    )
  }
});


//-----------Numbers Frame------------------------------------
var NumbersFrame = React.createClass ({
  
  render: function (){
    var totalNumbers = 9,
        numbersArray = [],
        className,
        clave="hola",
        selectNumber = this.props.selectNumber,
        f, selectedNumbers= this.props.selectedNumbers,
        usedNumbers= this.props.usedNumbers;
    
    for (f=1; f<=totalNumbers; f++){
      className = "number selected-" + (selectedNumbers.indexOf(f)>=0);
      className += " used-" + (usedNumbers.indexOf(f)>=0);
      numbersArray.push(
          <div className={className}
               onClick={selectNumber.bind(null,f)}>
            {f}
          </div>
        );
    }
    
    return (
        <div id="numbers-frame">
          <div className="well">
            {numbersArray}
          </div>
        </div>
    )
  }
});


//-----------Main------------------------------------
var Game = React.createClass ({
  getInitialState: function (){
    return {
      correct: null,
      selectedNumbers: [],
      usedNumbers: [],
      numberOfStars : Math.floor(Math.random()*9)+1,
      numberOfTryes : 5
    };
  },
  
  selectNumber: function (clickedNumber){
    if (this.state.selectedNumbers.indexOf(clickedNumber)<0){
      this.setState(
          {selectedNumbers: this.state.selectedNumbers.concat(clickedNumber),
           correct: null  
          }
        );
    }
  },
  
   unSelectNumber: function (clickedNumber){
    var selectedNumbers = this.state.selectedNumbers,
        index = selectedNumbers.indexOf(clickedNumber);
    if (index>=0){
      selectedNumbers.splice(index,1);
      this.setState(
          {selectedNumbers: selectedNumbers,
           correct: null
          }
        );
    }
  },
  
  sumOfSelectedNumbers: function(){
    return this.state.selectedNumbers.reduce(function(p,n){
      return p+n;
    },0)
  },
  
  
  checkAnswer: function (){
    var correct = (this.state.numberOfStars === this.sumOfSelectedNumbers());
    this.setState ({correct: correct});
  },
  
  acceptAnswer: function (){
    var usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
    this.setState({
      usedNumbers: usedNumbers,
      selectedNumbers: [],
      correct: null,
      numberOfStars : Math.floor(Math.random()*9)+1
    });
  },
  
  redraw: function () {
    var numberOfTryes = this.state.numberOfTryes-1;
    this.setState({
      correct: null,
      numberOfStars : Math.floor(Math.random()*9)+1,
      numberOfTryes : numberOfTryes
    });
    if (numberOfTryes===0){
      this.setState({
        selectedNumbers: [],
        usedNumbers: [],
        numberOfTryes : 5
      });
    }
    
  },
  
  render: function (){
    var selectedNumbers = this.state.selectedNumbers,
        usedNumbers = this.state.usedNumbers,
        checkAnswer = this.state.checkAnswer,
        numberOfStars = this.state.numberOfStars,
        correct = this.state.correct,
        numberOfTryes = this.state.numberOfTryes;
      
    return (
        <div id="game">
          <h2>Play nine</h2>
          <hr />
          <div className="clearfix">
            <StarsFrame numberOfStars={numberOfStars}/>
            
            <ButtonFrame selectedNumbers={selectedNumbers}
                         correct={correct}
                         numberOfTryes={numberOfTryes}
                         checkAnswer={this.checkAnswer}
                         acceptAnswer={this.acceptAnswer}
                         redraw={this.redraw}/>
                         
            <AnswerFrame selectedNumbers={selectedNumbers}
                         unSelectNumber={this.unSelectNumber}/>
          </div>
          <div>
            <NumbersFrame selectedNumbers={selectedNumbers}
                          usedNumbers={usedNumbers}
                          selectNumber={this.selectNumber}/>
          </div>
        </div>
    )
  }
});

React.render(
  <Game />,
  document.getElementById('container')
);
