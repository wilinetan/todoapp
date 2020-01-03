import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import axios from 'axios';

import './App.css';

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('/api/v1/todos')
    .then(res => {
      this.setState({todos: res.data})
    })
    .catch(error => console.log(error))
  }

  // Mark Complete
  markComplete = (id, completed) => {
    axios.put(`/api/v1/todos/${id}`, {completed: !completed})
      .then(res => this.setState({ todos: this.state.todos.map(todo => {
        if(todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      })}))
      .catch(error => console.log(error)) 
  }

  // Delete Todo
  delTodo = (id) => {
    axios.delete(`/api/v1/todos/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter
        (todo => todo.id !== id)] }))
      .catch(error => console.log(error));
  }

  // Add Todo
  addTodo = (title) => {
    const titleParts = title.split('#');
    const todotitle = titleParts[0].trim();
    const category = titleParts[1];
    axios.post('/api/v1/todos', {
      title: todotitle,
      completed: false,
      tag: category
    })
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markCompleted={this.markComplete} delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path="/about" component={About} /> 
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
