import React, { Component } from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

export class TodoCategory extends Component {

  render() {
    return (
      <div>
        <h2>{this.props.category}</h2>
        {this.props.todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} markCompleted={this.props.markCompleted} 
          delTodo={this.props.delTodo}/> 
        ))}
      </div>
    )
  }
}

//   PropTypes
TodoCategory.propTypes = {
    category: PropTypes.string,
    todos: PropTypes.array.isRequired,
    markCompleted: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}

export default TodoCategory