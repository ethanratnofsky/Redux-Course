const addTodoAction = {
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Learn Redux',
        complete: false,
    }
}

const removeTodoAction = {
    type: 'REMOVE_TODO',
    id: 0,
}

const toggleTodoAction = {
    type: 'TOGGLE_TODO',
    id: 0,
}

const addGoalAction = {
    type: 'ADD_GOAL',
    goal: {
        id: 0,
        name: 'Run a Marathon'
    }
}

const removeGoalAction = {
    type: 'REMOVE_GOAL',
    id: 0
}

/*
Characteristics of a Pure Function
1) They always return the same result if the same arguments are passed in.
2) They depend only on the arguments passed into them.
3) Never produce any side effects.
*/

// Reducer function
function todos(state = [], action) {
    if (action.type === 'ADD_TODO') {
      return state.concat([action.todo])
    }
  
    return state
}

function createStore(reducer) {
    // The store should have four parts

    // 1. The state
    let state
    let listeners = []

    // 2. Get the state
    const getState = () => state

    // 3. Listen to changes on the state
    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    // 4. Update the state
    const dispatch = (action) => {
        state = reducer(state, action) // Update state
        listeners.forEach((listener) => listener()) // Inform listeners of updated state
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}

const store = createStore(todos)