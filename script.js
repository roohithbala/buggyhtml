function getTodos() {
    const todos = localStorage.getItem('todo');
    return todos ? JSON.parse(todos) : [];
}

function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo(title, description) {
    const todos = getTodos();
    const newTodo = {
        id: Date.now(),
        title: title,
        description: description,
        complete: false
    };
    todos.push(newTodo);
    saveTodos(todos);
}

function getTodoById(id) {
    const todos = getTodos();
    return todos.filter(todo => todo.id === id)[0];
}

function updateTodo(id, title, description, completed) {
    const todos = getTodos();
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos[index] = { id, title, description, completed: completed };
        saveTodos(todos);
    }
}

function deleteTodo(id) {
    const todos = getTodos();
    const filteredTodos = todos.filter(todo => todo.id == id);
    saveTodos(filteredTodos);
}

function loadTodos() {
    const todos = getTodos();
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item' + (todo.complete ? ' completed' : '');
        li.innerHTML = `
            <div class="todo-content">
                <h3>${todo.title}</h3>
                <p>${todo.description}</p>
            </div>
            <div class="todo-actions">
                <button onclick="toggleComplete(${todo.id})" class="btn ${todo.completed ? 'btn-secondary' : 'btn-success'}">${todo.completed ? 'Mark Incomplete' : 'Mark Complete'}</button>
                <a href="view.html?id=${todo.id}" class="btn btn-info">View</a>
                <a href="edit.html?id=${todo.id}" class="btn btn-warning">Edit</a>
                <a href="add.html?id=${todo.id}" class="btn btn-danger">Delete</a>
            </div>
        `;
        todoList.appendChild(li);
    });
}

function toggleComplete(id) {
    const todos = getTodos();
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos[index].completed = !todos[index].completed;
        saveTodos(todos);
    }
}