class Clock extends React.Component {
    constructor (props) {
      super(props);
      this.state = { 
          date: new Date(),
          location: 'Quiogue', 
        };
    }
  
    componentDidMount () {
      this.timer = setInterval(
        () => this.updateTime(),
        1000
      );
    }
  
    componentWillUnmount () {
      clearInterval(this.timer);
    }
  
    updateTime () {
      this.setState({
        date: new Date()
      });
    }
  
    render () {
      return (
        <div>
            <h1 className = "text-center py-4">~ The {this.state.location} Hour ~</h1>
            <br/>
            <h2 className = "text-center pb-4">{this.state.date.toLocaleTimeString()}</h2>
        </div>
      )
    }
}

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
const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error('Request was either a 404 or 500');
}

const json = (response) => response.json()

class Task extends React.Component {
  render () {
    const { task, onDelete, onComplete } = this.props;
    const { id, content, completed } = task;
    return (
      <div className="row mb-1">
        <p className="col">{content}</p>
        <button
          className="btn-danger small rounded"
          onClick={() => onDelete(id)}
        >delete</button>
        <input
          className="d-inline-block"
          type="checkbox"
          onChange={() => onComplete(id, completed)}
          checked={completed}
        />
      </div>
    )
  }
}

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      new_task: '',
      tasks: [],
      filter: 'all'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchTasks = this.fetchTasks.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    fetch("https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=31")
      .then(checkStatus)
      .then(json)
      .then((response) => {
        console.log(response);
        this.setState({tasks: response.tasks});
      })
      .catch(error => {
        console.error(error.message);
      })
  }

  handleChange(event) {
    this.setState({ new_task: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let { new_task } = this.state;
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
      }),
    }).then(checkStatus)
      .then(json)
      .then((data) => {
        this.setState({new_task: ''});
        this.fetchTasks();
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      })
  }

  deleteTask(id) {
    if (!id) {
      return;
    }
    fetch(`https://altcademy-to-do-list-api.herokuapp.com/tasks/${id}?api_key=31`, {
      method: "DELETE",
      mode: "cors",
    }).then(checkStatus)
      .then(json)
      .then((data) => {
        this.fetchTasks();
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      })
  }

  toggleComplete(id, completed) {
    if (!id) {
      return;
    }
    const newState = completed ? 'active' : 'complete';

    fetch(`https://altcademy-to-do-list-api.herokuapp.com/tasks/${id}/mark_${newState}?api_key=31`, {
      method: "PUT",
      mode: "cors",
    }).then(checkStatus)
      .then(json)
      .then((data) => {
        this.fetchTasks();
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      })
  }

  toggleFilter(e) {
    console.log(e.target.name)
    this.setState({
      filter: e.target.name
    })
  }

  render() {
    const { new_task, tasks, filter } = this.state;

    return (
      <div className="container" id="todolist">
        <div className="row">
          <div className="col-12 border border-color-violet">
            <h2 className="mb-3 text-center mt-4">To Do List</h2>
            {tasks.length > 0 ? tasks.filter(task => {
              if (filter === 'all') {
                return true;
              } else if (filter === 'active') {
                return !task.completed;
              } else {
                return task.completed;
              }
            }).map((task) => {
              return (
                <Task
                  key={task.id}
                  task={task}
                  onDelete={this.deleteTask}
                  onComplete={this.toggleComplete}
                />
              );
            }) : <p>no tasks here</p>}
            <div className="mt-3 text-center">
              <label>
                <input type="checkbox" name="all" checked={filter === "all"} onChange={this.toggleFilter} /> All
              </label>
              <label>
                <input type="checkbox" name="active" checked={filter === "active"} onChange={this.toggleFilter} /> Active
              </label>
              <label>
                <input type="checkbox" name="completed" checked={filter === "completed"} onChange={this.toggleFilter} /> Completed
              </label>
            </div>
              <div className="align-center">
                  <form onSubmit={this.handleSubmit} className="form-inline my-4">
                    <input
                    id="main-input"
                      type="text"
                      className="form-control mr-sm-2 mb-2 ml-5"
                      placeholder="new task"
                      value={new_task}
                      onChange={this.handleChange}
                    />
                    <button type="submit" className="btn btn-primary mb-2 ml-5">Submit</button>
                  </form>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <ToDoList />,
  document.getElementById('root1')
);


const Gitlink = () => {
    const handleClick = (e) => {
        e.preventDefault();
    }
    return (
        <div className = "text-center">
            <a href="https://github.com/jmferg11" onClick={handleClick}>
                Need to clean this bad lad up...
            </a>
        </div>
    )
}

class ScrollLogger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: 0
        };
        this.updateScrollY = this.updateScrollY.bind(this);
    };
    updateScrollY(e) {
        this.setState({ scrollY: Math.round(window.scrollY) });
    }
    componentDidMount() {
        window.addEventListener('scroll', this.updateScrollY);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.updateScrollY);
    }
    render () {
        return (
            <div className="position-fixed bg-white p-3" style={{right: 0, top: 0}}>
                scrolled: {this.state.scrollY}px
            </div>
        )
    }
}

const App = () => {
    return (
        <React.Fragment>
            <Clock />
            <br/>
            <Gitlink />
            <br/>
            <br/>
            <ScrollLogger />
        </React.Fragment>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

const posts = [
    {
      id: '1',
      body: 'Love For All, Hatred For None.',
      user: 'Khalifatul Masih III'
    },{
      id: '3',
      body: 'Every moment is a fresh beginning.',
      user: 'T.S Eliot'
    },{
      id: '4',
      body: 'Never regret anything that made you smile.',
      user: 'Mark Twain'
    },
  ]
  const Feed = (props) => {
    const posts = props.posts.map(post => <p key={post.id}>{post.body} - {post.user}</p>);
    return (
      <div className="text-center pt-4">{posts}</div>
    )
  }
  
  ReactDOM.render(
    <Feed posts={posts} />,
    document.getElementById('root2')
  )