var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Clock = function (_React$Component) {
  _inherits(Clock, _React$Component);

  function Clock(props) {
    _classCallCheck(this, Clock);

    var _this = _possibleConstructorReturn(this, (Clock.__proto__ || Object.getPrototypeOf(Clock)).call(this, props));

    _this.state = {
      date: new Date(),
      location: 'Quiogue'
    };
    return _this;
  }

  _createClass(Clock, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.timer = setInterval(function () {
        return _this2.updateTime();
      }, 1000);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.timer);
    }
  }, {
    key: "updateTime",
    value: function updateTime() {
      this.setState({
        date: new Date()
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          { className: "text-center py-4" },
          "~ The ",
          this.state.location,
          " Hour ~"
        ),
        React.createElement("br", null),
        React.createElement(
          "h2",
          { className: "text-center pb-4" },
          this.state.date.toLocaleTimeString()
        )
      );
    }
  }]);

  return Clock;
}(React.Component);

/*

class StopWatch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        timePassedInMilliSeconds: 0
      }
  
      this.timer = null;
  
      this.start = this.start.bind(this);
      this.stop = this.stop.bind(this);
      this.reset = this.reset.bind(this);
    }
  
    start() {
      if (!this.timer) {
        let startTime = Date.now();
        this.timer = setInterval(() => {
          const stopTime = Date.now();
          const timePassedInMilliSeconds = stopTime - startTime + this.state.timePassedInMilliSeconds;
  
          this.setState({
            timePassedInMilliSeconds,
          });
          
          startTime = stopTime;
        }, 250);
      }
    }
  
    stop() {
      window.clearInterval(this.timer);
      this.timer = null;
    }
  
    reset() {
      this.stop();
      this.setState({
        timePassedInMilliSeconds: 0
      })
    }
  
    render() {
      return (
        <div className="border px-3 py-4 rounded my-3 mx-auto text-center" style={{maxWidth: "375px"}}>
          <h2>
            Tryna time?
          </h2>
          <h2 className="border px-3 py-4 rounded my-3 mx-auto text-center" style={{maxWidth: "200px"}}>
            {Math.floor(this.state.timePassedInMilliSeconds / 1000)} s
          </h2>
          <div className="d-flex justify-content-center">
            <button className="btn btn-outline-primary mr-2" onClick={this.start}>
              start
            </button>
            <button className="btn btn-outline-danger mr-2" onClick={this.stop}>
              stop
            </button>
            <button className="btn btn-outline-warning" onClick={this.reset}>
              reset
            </button>
          </div>
        </div>
      )
    }
  }
*/


var checkStatus = function checkStatus(response) {
  if (response.ok) {
    return response;
  }
  throw new Error('Request was either a 404 or 500');
};

var json = function json(response) {
  return response.json();
};

var Task = function (_React$Component2) {
  _inherits(Task, _React$Component2);

  function Task() {
    _classCallCheck(this, Task);

    return _possibleConstructorReturn(this, (Task.__proto__ || Object.getPrototypeOf(Task)).apply(this, arguments));
  }

  _createClass(Task, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          task = _props.task,
          onDelete = _props.onDelete,
          onComplete = _props.onComplete;
      var id = task.id,
          content = task.content,
          completed = task.completed;

      return React.createElement(
        "div",
        { className: "row mb-1" },
        React.createElement(
          "p",
          { className: "col" },
          content
        ),
        React.createElement(
          "button",
          {
            className: "btn-danger small rounded",
            onClick: function onClick() {
              return onDelete(id);
            }
          },
          "delete"
        ),
        React.createElement("input", {
          className: "d-inline-block",
          type: "checkbox",
          onChange: function onChange() {
            return onComplete(id, completed);
          },
          checked: completed
        })
      );
    }
  }]);

  return Task;
}(React.Component);

var ToDoList = function (_React$Component3) {
  _inherits(ToDoList, _React$Component3);

  function ToDoList(props) {
    _classCallCheck(this, ToDoList);

    var _this4 = _possibleConstructorReturn(this, (ToDoList.__proto__ || Object.getPrototypeOf(ToDoList)).call(this, props));

    _this4.state = {
      new_task: '',
      tasks: [],
      filter: 'all'
    };

    _this4.handleChange = _this4.handleChange.bind(_this4);
    _this4.handleSubmit = _this4.handleSubmit.bind(_this4);
    _this4.fetchTasks = _this4.fetchTasks.bind(_this4);
    _this4.deleteTask = _this4.deleteTask.bind(_this4);
    _this4.toggleComplete = _this4.toggleComplete.bind(_this4);
    _this4.toggleFilter = _this4.toggleFilter.bind(_this4);
    return _this4;
  }

  _createClass(ToDoList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchTasks();
    }
  }, {
    key: "fetchTasks",
    value: function fetchTasks() {
      var _this5 = this;

      fetch("https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=31").then(checkStatus).then(json).then(function (response) {
        console.log(response);
        _this5.setState({ tasks: response.tasks });
      }).catch(function (error) {
        console.error(error.message);
      });
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      this.setState({ new_task: event.target.value });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      var _this6 = this;

      event.preventDefault();
      var new_task = this.state.new_task;

      new_task = new_task.trim();
      if (!new_task) {
        return;
      }

      fetch("https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=31", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: {
            content: new_task
          }
        })
      }).then(checkStatus).then(json).then(function (data) {
        _this6.setState({ new_task: '' });
        _this6.fetchTasks();
      }).catch(function (error) {
        _this6.setState({ error: error.message });
        console.log(error);
      });
    }
  }, {
    key: "deleteTask",
    value: function deleteTask(id) {
      var _this7 = this;

      if (!id) {
        return;
      }
      fetch("https://altcademy-to-do-list-api.herokuapp.com/tasks/" + id + "?api_key=31", {
        method: "DELETE",
        mode: "cors"
      }).then(checkStatus).then(json).then(function (data) {
        _this7.fetchTasks();
      }).catch(function (error) {
        _this7.setState({ error: error.message });
        console.log(error);
      });
    }
  }, {
    key: "toggleComplete",
    value: function toggleComplete(id, completed) {
      var _this8 = this;

      if (!id) {
        return;
      }
      var newState = completed ? 'active' : 'complete';

      fetch("https://altcademy-to-do-list-api.herokuapp.com/tasks/" + id + "/mark_" + newState + "?api_key=31", {
        method: "PUT",
        mode: "cors"
      }).then(checkStatus).then(json).then(function (data) {
        _this8.fetchTasks();
      }).catch(function (error) {
        _this8.setState({ error: error.message });
        console.log(error);
      });
    }
  }, {
    key: "toggleFilter",
    value: function toggleFilter(e) {
      console.log(e.target.name);
      this.setState({
        filter: e.target.name
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;

      var _state = this.state,
          new_task = _state.new_task,
          tasks = _state.tasks,
          filter = _state.filter;


      return React.createElement(
        "div",
        { className: "container", id: "todolist" },
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-12 border border-color-violet" },
            React.createElement(
              "h2",
              { className: "mb-3 text-center mt-4" },
              "To Do List"
            ),
            tasks.length > 0 ? tasks.filter(function (task) {
              if (filter === 'all') {
                return true;
              } else if (filter === 'active') {
                return !task.completed;
              } else {
                return task.completed;
              }
            }).map(function (task) {
              return React.createElement(Task, {
                key: task.id,
                task: task,
                onDelete: _this9.deleteTask,
                onComplete: _this9.toggleComplete
              });
            }) : React.createElement(
              "p",
              null,
              "no tasks here"
            ),
            React.createElement(
              "div",
              { className: "mt-3 text-center" },
              React.createElement(
                "label",
                null,
                React.createElement("input", { type: "checkbox", name: "all", checked: filter === "all", onChange: this.toggleFilter }),
                " All"
              ),
              React.createElement(
                "label",
                null,
                React.createElement("input", { type: "checkbox", name: "active", checked: filter === "active", onChange: this.toggleFilter }),
                " Active"
              ),
              React.createElement(
                "label",
                null,
                React.createElement("input", { type: "checkbox", name: "completed", checked: filter === "completed", onChange: this.toggleFilter }),
                " Completed"
              )
            ),
            React.createElement(
              "div",
              { className: "align-center" },
              React.createElement(
                "form",
                { onSubmit: this.handleSubmit, className: "form-inline my-4" },
                React.createElement("input", {
                  id: "main-input",
                  type: "text",
                  className: "form-control mr-sm-2 mb-2 ml-5",
                  placeholder: "new task",
                  value: new_task,
                  onChange: this.handleChange
                }),
                React.createElement(
                  "button",
                  { type: "submit", className: "btn btn-primary mb-2 ml-5" },
                  "Submit"
                )
              )
            )
          )
        )
      );
    }
  }]);

  return ToDoList;
}(React.Component);

ReactDOM.render(React.createElement(ToDoList, null), document.getElementById('root1'));

var Gitlink = function Gitlink() {
  var handleClick = function handleClick(e) {
    e.preventDefault();
  };
  return React.createElement(
    "div",
    { className: "text-center" },
    React.createElement(
      "a",
      { href: "https://github.com/jmferg11", onClick: handleClick },
      "Need to clean this bad lad up..."
    )
  );
};

var ScrollLogger = function (_React$Component4) {
  _inherits(ScrollLogger, _React$Component4);

  function ScrollLogger(props) {
    _classCallCheck(this, ScrollLogger);

    var _this10 = _possibleConstructorReturn(this, (ScrollLogger.__proto__ || Object.getPrototypeOf(ScrollLogger)).call(this, props));

    _this10.state = {
      scrollY: 0
    };
    _this10.updateScrollY = _this10.updateScrollY.bind(_this10);
    return _this10;
  }

  _createClass(ScrollLogger, [{
    key: "updateScrollY",
    value: function updateScrollY(e) {
      this.setState({ scrollY: Math.round(window.scrollY) });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('scroll', this.updateScrollY);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this.updateScrollY);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "position-fixed bg-white p-3", style: { right: 0, top: 0 } },
        "scrolled: ",
        this.state.scrollY,
        "px"
      );
    }
  }]);

  return ScrollLogger;
}(React.Component);

var App = function App() {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Clock, null),
    React.createElement("br", null),
    React.createElement(Gitlink, null),
    React.createElement("br", null),
    React.createElement("br", null),
    React.createElement(ScrollLogger, null)
  );
};

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));

var posts = [{
  id: '1',
  body: 'Love For All, Hatred For None.',
  user: 'Khalifatul Masih III'
}, {
  id: '3',
  body: 'Every moment is a fresh beginning.',
  user: 'T.S Eliot'
}, {
  id: '4',
  body: 'Never regret anything that made you smile.',
  user: 'Mark Twain'
}];
var Feed = function Feed(props) {
  var posts = props.posts.map(function (post) {
    return React.createElement(
      "p",
      { key: post.id },
      post.body,
      " - ",
      post.user
    );
  });
  return React.createElement(
    "div",
    { className: "text-center pt-4" },
    posts
  );
};

ReactDOM.render(React.createElement(Feed, { posts: posts }), document.getElementById('root2'));