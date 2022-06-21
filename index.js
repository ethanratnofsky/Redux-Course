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