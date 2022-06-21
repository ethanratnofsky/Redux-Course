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

function createStore() {
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

    return {
        getState,
        subscribe,
    }
}