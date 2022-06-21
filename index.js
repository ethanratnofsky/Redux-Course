/*
Characteristics of a Pure Function
1) They always return the same result if the same arguments are passed in.
2) They depend only on the arguments passed into them.
3) Never produce any side effects.
*/

// Todos reducer function
function todos(state = [], action) {
    switch(action.type) {
        case 'ADD_TODO' :
          return state.concat([action.todo])
        case 'REMOVE_TODO' :
          return state.filter((todo) => todo.id !== action.id)
        case 'TOGGLE_TODO' :
          return state.map((todo) => todo.id !== action.id ? todo :
            Object.assign({}, todo, {complete: !todo.complete})
          )
        default :
          return state
    }
}

// Goals reducer function
function goals(state = [], action) {
    switch(action.type) {
        case 'ADD_GOAL' :
            return state.concat([action.goal])
        case 'REMOVE_GOAL' :
            return state.filter((goal) => goal.id !== action.id)
        default :
            return state
    }
}

function app(state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
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

const store = createStore(app)

store.subscribe(() => {
    console.log('The new state is: ', store.getState())
})

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Walk the dog',
        complete: false,
    }
})

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 1,
        name: 'Wash the car',
        complete: false,
    }
})

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 2,
        name: 'Go to the gym',
        complete: true,
    }
})

store.dispatch({
    type: 'REMOVE_TODO',
    id: 1
})

store.dispatch({
    type: 'TOGGLE_TODO',
    id: 0
})

store.dispatch({
    type: 'ADD_GOAL',
    goal: {
        id: 0,
        name: 'Learn Redux'
    }
})

store.dispatch({
    type: 'ADD_GOAL',
    goal: {
        id: 1,
        name: 'Lose 20 pounds'
    }
})

store.dispatch({
    type: 'REMOVE_GOAL',
    id: 0
}) 