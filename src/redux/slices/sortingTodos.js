const sortTodosByTime = (todos) => {
  return todos.sort((a, b) => new Date(b.time) - new Date(a.time));
};

export default sortTodosByTime;