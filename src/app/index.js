var React = require('react');
var ReactDOM = require('react-dom');
var ReactRedux = require('react-redux);
var Redux = require('redux');

const NEWQ = 'NEWQ';

const submitRequest = (quoteIndex, colorIndex) => {
  return {
    type: NEWQ,
    quoteIndex,
    colorIndex
  }
}

const defaultState = {
  quoteIndex: Math.floor(Math.random() * 16),
  colorIndex: Math.floor(Math.random() * 6)
};

const quoteReducer = (state = defaultState, action) => {
  switch(action.type) {
    case NEWQ:
      let obj1 = {quoteIndex: action.quoteIndex};
      let obj2 = {colorIndex: action.colorIndex};
      return Object.assign(obj1, obj2);
    default:
      return state;
  }
}

const store = Redux.createStore(quoteReducer);

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  };
  handleClick() {
    this.props.newQuoteRequest(Math.floor(Math.random() * 16), Math.floor(Math.random() * 6));
  }
  render() {
    const quotesArr = [
      {
        text: 'No guts, no story.',
        author: 'Chris Brady'
      },
      {
        text: 'Screw it, let’s do it.',
        author: 'Richard Branson'
      },
      {
        text: 'Boldness be my friend.',
        author: 'William Shakespeare'
      },
      {
        text: 'Whatever you are, be a good one.',
        author: 'Abraham Lincoln'
      },
      {
        text: 'Impossible is for the unwilling.',
        author: 'John Keats'
      },
      {
        text: 'The wisest mind has something yet to learn.',
        author: 'George Santanaya'
      },
      {
        text: 'If it matters to you, you’ll find a way.',
        author: 'Charlie Gilkey'
      },
      {
        text: 'If you’re going through hell, keep going.',
        author: 'Winston Churchill'
      },
      {
        text: 'Persistence guarantees that results are inevitable.',
        author: 'Paramahansa Yogananda'
      },
      {
        text: 'I would rather die on my feet than live on my knees.',
        author: 'Euripides'
      },
      {
        text: 'The true success is the person who invented himself.',
        author: 'Al Goldstein'
      },
      {
        text: 'Let him that would move the world first move himself.',
        author: 'Socrates'
      },
      {
        text: 'We can do anything we want to if we stick to it long enough.',
        author: 'Helen Keller'
      },
      {
        text: 'Fall seven times, stand up eight.',
        author: 'Japanese Proverb'
      },
      {
        text: 'Each day provides its own gifts.',
        author: 'Marcus Aurelius'
      },
      {
        text: 'Believe you can and you’re halfway there.',
        author: 'Theodore Roosevelt'
      },
    ];
    
    const colors = ['#C88866', '#C8B966', '#A6C866', '#75C866', '#66C888', '#66C8B9'];
    
    const color = colors[this.props.newColor];
    const text = quotesArr[this.props.newQuote].text;
    const author = quotesArr[this.props.newQuote].author;
    const tweetLink = 'twitter.com/intent/tweet?hashtags=quotes&text=' + text + ' ' + author + '.';
    return (
      <div id="background" style={{backgroundColor: color}}>
        <div id="center-box" style={{backgroundColor: "#fff"}}>
          <div>
          <h1 id="text" style={{color: color}}><i className="fa fa-quote-left"></i> {text}</h1>
          <p id="author" style={{color: color}}>- {author}</p>
          <div id="flex-box">
            <a href={tweetLink}  id="tweet-quote" aria-label="Tweet this quote" title="Tweet this quote" style={{color: color}}><i className="fa fa-twitter" style={{backgroundColor: color}}></i></a>
            <button id="new-quote" onClick={this.handleClick} style={{backgroundColor: color}}>New Quote</button>
          </div>
        </div>
        <footer>Copyright 2019, Jamie Ev.</footer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    newQuote: state.quoteIndex,
    newColor: state.colorIndex
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newQuoteRequest: (quoteIndex, colorIndex) => {
      dispatch(submitRequest(quoteIndex, colorIndex))
    }
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container/>
      </Provider>
    )
  }
}

ReactDOM.render(<AppWrapper />, document.getElementById('quote-box'));