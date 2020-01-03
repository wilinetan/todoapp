import React, { Component } from 'react';
// import TodoItem from './TodoItem';
import TodoCategory from './TodoCategory';
import PropTypes from 'prop-types';

/* 
create the "unique" method that will take "array" as an argument, 
remove duplicate values from an array, and return a new array 
*/
const unique = array => {
  return array.filter((item, index) => {
    return array.indexOf(item) === index
  })
}

class Todos extends Component {

  render() {
    // apply the "unique" function for the categories array
    const categories = unique(this.props.todos.map(todo => todo.tag))

    return (
      <div className="todolist-container">
        {categories.map(category => 
          <TodoCategory key={category} category={category} markCompleted={this.props.markCompleted}
          delTodo={this.props.delTodo}

          // filter array of todos that will manage by a tag to a category
          todos = {this.props.todos.filter(todo => todo.tag === category)}
          /> 
        )}
      </div>
    )
    }
  }

//   PropTypes
  Todos.propTypes = {
      todos: PropTypes.array.isRequired,
      markCompleted: PropTypes.func.isRequired,
      delTodo: PropTypes.func.isRequired
  }

export default Todos;