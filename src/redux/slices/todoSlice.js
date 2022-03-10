import { createSlice } from '@reduxjs/toolkit';

const getInitialTodo = () => {
  const localTodoList = localStorage.getItem('todoList');

  if (localTodoList) {
    return JSON.parse(localTodoList);
  } else {
    localStorage.setItem('todoList', JSON.stringify([]));

    return [];
  }
};

const sortTodosByTime = (todos) => {
  return todos.sort((a, b) => new Date(b.time) - new Date(a.time));
};

const initialState = {
  filterStatus: 'all',
  todoList: getInitialTodo()
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todos = JSON.parse(localStorage.getItem('todoList'));
      const newTodo = { ...action.payload };

      if (todos.length) {
        localStorage.setItem('todoList', JSON.stringify([...todos, newTodo]));
      } else {
        localStorage.setItem('todoList', JSON.stringify([newTodo]));
      }

      state.todoList.push(newTodo);
      state.todoList = [...sortTodosByTime(state.todoList)];
    },
    deleteTodo: (state, action) => {
      const todos = JSON.parse(localStorage.getItem('todoList'));
      const newTodos = todos.filter(todo => todo.id !== action.payload);

      state.todoList = [...newTodos];
      localStorage.setItem('todoList', JSON.stringify(newTodos));
    },
    updateTodo: (state, action) => {
      let todos = JSON.parse(localStorage.getItem('todoList'));
      todos = sortTodosByTime(todos);

      const updatedTodos = todos.map(todo => {
        if (todo.id === action.payload.id) {
          todo.title = action.payload.title;
          todo.status = action.payload.status;
        }

        return todo;
      });

      state.todoList = [...updatedTodos];
      localStorage.setItem('todoList', JSON.stringify(updatedTodos));
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    filterTodos: (state, action) => {
      let todos = JSON.parse(localStorage.getItem('todoList'));
      todos = sortTodosByTime(todos);

      if (action.payload === 'all') {
        state.todoList = [...todos];
      } else {
        state.todoList = [...todos.filter((todo) => todo.status === action.payload)];
      }
    }
  }
});

export const { addTodo, deleteTodo, updateTodo, updateFilterStatus, filterTodos } = todoSlice.actions;

export default todoSlice.reducer;