# Todo App Bugs Documentation

This document lists all the intentional bugs added to the todo application for debugging evaluation. Each bug is described with its location, the issue, the impact on functionality, and the fix required.

## Bug 1: ID Mismatch in index.html
- **File**: `index.html`
- **Issue**: Changed `<ul id="todo-list">` to `<ul id="todoList">`
- **Impact**: `loadTodos()` function uses `getElementById('todo-list')` which will return null, preventing todos from displaying on the home page.
- **Fix**: Change `id="todoList"` back to `id="todo-list"` in the `<ul>` element.

## Bug 2: ID Mismatch in add.html
- **File**: `add.html`
- **Issue**: Changed input `id="title"` to `id="titles"`
- **Impact**: Add form script uses `getElementById('title')` which will be null, causing title value to be undefined when adding todos.
- **Fix**: Change `id="titles"` back to `id="title"` in the input element.

## Bug 3: ID Mismatch in edit.html
- **File**: `edit.html`
- **Issue**: Changed checkbox `id="completed"` to `id="complete"`
- **Impact**: Edit form script uses `getElementById('completed')` for both getting and setting the checkbox value, leading to undefined values.
- **Fix**: Change `id="complete"` back to `id="completed"` in the checkbox input.

## Bug 4: ID Mismatch in view.html
- **File**: `view.html`
- **Issue**: Changed button `id="toggle-complete-btn"` to `id="toggleBtn"`
- **Impact**: View page script uses `getElementById('toggle-complete-btn')` which will be null, preventing the toggle complete button from working.
- **Fix**: Change `id="toggleBtn"` back to `id="toggle-complete-btn"` in the button element.

## Bug 5: ID Mismatch in delete.html
- **File**: `delete.html`
- **Issue**: Changed button `id="confirm-delete"` to `id="deleteBtn"`
- **Impact**: Delete confirmation script uses `getElementById('confirm-delete')` which will be null, disabling the delete functionality.
- **Fix**: Change `id="deleteBtn"` back to `id="confirm-delete"` in the button element.

## Bug 6: Inconsistent localStorage Key
- **File**: `script.js` (getTodos function)
- **Issue**: Changed `localStorage.getItem('todos')` to `localStorage.getItem('todo')`
- **Impact**: Data is saved with key 'todos' but retrieved with 'todo', causing todos to not persist across sessions.
- **Fix**: Change `localStorage.getItem('todo')` back to `localStorage.getItem('todos')` in the getTodos function.

## Bug 7: Property Name Inconsistency
- **File**: `script.js` (addTodo function)
- **Issue**: Changed `completed: false` to `complete: false`
- **Impact**: New todos have 'complete' property instead of 'completed', causing inconsistencies in property access throughout the app.
- **Fix**: Change `complete: false` back to `completed: false` in the newTodo object.

## Bug 8: Inefficient Array Method
- **File**: `script.js` (getTodoById function)
- **Issue**: Changed `todos.find(todo => todo.id === id)` to `todos.filter(todo => todo.id === id)[0]`
- **Impact**: Works functionally but is less efficient and less idiomatic, potentially confusing developers.
- **Fix**: Change `todos.filter(todo => todo.id === id)[0]` back to `todos.find(todo => todo.id === id)`.

## Bug 9: Redundant Object Property
- **File**: `script.js` (updateTodo function)
- **Issue**: Changed `{ id, title, description, completed }` to `{ id, title, description, completed: completed }`
- **Impact**: Creates redundant property assignment, which is syntactically correct but confusing and unnecessary.
- **Fix**: Change `{ id, title, description, completed: completed }` back to `{ id, title, description, completed }`.

## Bug 10: Incorrect Filter Logic
- **File**: `script.js` (deleteTodo function)
- **Issue**: Changed `todo.id !== id` to `todo.id == id`
- **Impact**: Instead of removing the todo, it keeps only that todo and removes all others, breaking delete functionality.
- **Fix**: Change `todo.id == id` back to `todo.id !== id` in the filter condition.

## Bug 11: Property Name Mismatch in loadTodos
- **File**: `script.js` (loadTodos function)
- **Issue**: Changed `todo.completed` to `todo.complete`
- **Impact**: Completed status check fails for todos created after the property name change, causing incorrect styling.
- **Fix**: Change `todo.complete` back to `todo.completed` in the className assignment.

## Bug 12: Missing UI Update
- **File**: `script.js` (toggleComplete function)
- **Issue**: Removed `loadTodos();` call after toggling completion
- **Impact**: UI doesn't update after toggling, showing stale data until page refresh.
- **Fix**: Add `loadTodos();` after `saveTodos(todos);` in the toggleComplete function.

## Bug 13: Template Literal in HTML
- **File**: `view.html`
- **Issue**: Used `${id}` in HTML href attributes
- **Impact**: Template literals don't evaluate in static HTML, causing broken links like `edit.html?id=${id}` instead of actual IDs.
- **Fix**: Move the link generation to JavaScript or use proper string concatenation. Since the links are in the HTML, they need to be generated dynamically in the script.

## Bug 14: Incorrect Page Refresh
- **File**: `view.html`
- **Issue**: Changed `window.location.reload()` to `window.location.href = 'index.html'`
- **Impact**: Instead of refreshing the current page, it navigates to index.html, losing the current view context.
- **Fix**: Change `window.location.href = 'index.html'` back to `window.location.reload()`.

## Bug 15: Missing CSS Style
- **File**: `style.css`
- **Issue**: Removed the `.todo-item.completed h3` rule for strikethrough text
- **Impact**: Completed todos don't show visual strikethrough indication.
- **Fix**: Add back the CSS rule: `.todo-item.completed h3 { text-decoration: line-through; color: #7f8c8d; }`

## Bug 16: Misrouting in index.html
- **File**: `index.html`
- **Issue**: Changed add button href from `"add.html"` to `"edit.html"`
- **Impact**: Clicking "Add New Todo" navigates to edit page instead of add page.
- **Fix**: Change `href="edit.html"` back to `href="add.html"` in the add button link.

## Bug 17: Misrouting in loadTodos
- **File**: `script.js` (loadTodos function)
- **Issue**: Changed delete link href from `"delete.html?id=${todo.id}"` to `"add.html?id=${todo.id}"`
- **Impact**: Delete buttons navigate to add page instead of delete confirmation.
- **Fix**: Change `href="add.html?id=${todo.id}"` back to `href="delete.html?id=${todo.id}"` in the delete link.

## Bug 18: ID Mismatch in edit.html Script (Get)
- **File**: `edit.html`
- **Issue**: Script uses `getElementById('complete')` instead of `('completed')` for checkbox
- **Impact**: Fails to set the checkbox value when loading edit form.
- **Fix**: Change `getElementById('complete')` to `getElementById('completed')` in the line setting the checkbox checked property.

## Bug 19: ID Mismatch in edit.html Script (Set)
- **File**: `edit.html`
- **Issue**: Script uses `getElementById('complete')` instead of `('completed')` for getting checkbox value
- **Impact**: Fails to read the checkbox value when updating todo.
- **Fix**: Change `getElementById('complete')` to `getElementById('completed')` in the line getting the checkbox checked value.

## Bug 20: ID Mismatch in delete.html Script
- **File**: `delete.html`
- **Issue**: Script uses `getElementById('deleteBtn')` instead of `('confirm-delete')`
- **Impact**: Event listener not attached to the delete button.
- **Fix**: Change `getElementById('deleteBtn')` to `getElementById('confirm-delete')` in the addEventListener call.

## Bug 21: ID Mismatch in view.html Script
- **File**: `view.html`
- **Issue**: Script uses `getElementById('toggleBtn')` instead of `('toggle-complete-btn')`
- **Impact**: Fails to attach event listener to the toggle button.
- **Fix**: Change `getElementById('toggleBtn')` to `getElementById('toggle-complete-btn')` in the script.

## Summary
These 21 bugs create a complex debugging scenario where the application appears functional but has multiple subtle failures. They test skills in:
- DOM manipulation and element selection
- Data persistence and consistency
- Property naming conventions
- Event handling
- Navigation and routing
- UI state management
- CSS styling application

Each bug requires careful code review and testing to identify and fix.