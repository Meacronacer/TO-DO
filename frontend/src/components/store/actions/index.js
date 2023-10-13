export const tasksDataFetching = () => {
    return {
        type: 'TASKS_DATA_FETCHING'
    }
}

export const tasksDataFetched = (tasks) => {
    return {
        type: 'TASKS_DATA_FETCHED',
        payload: tasks
    }
}

export const tasksDataFetchingError = () => {
    return {
        type: 'TASKS_DATA_FETCHING_ERROR'
    }
}

export const tasksDataFilter = (filter) => {
    return {
        type: 'TASKS_DATA_FILTER',
        payload: filter
    }
}

export const tasksDataSearch = (name) => {
    return {
        type: 'TASKS_DATA_SEARCH',
        payload: name
    }
}

export const taskDeleted = (id) => {
    return {
        type: 'TASK_DELETED',
        payload: id
    }
}

export const taskCreate = (item) => {
    return {
        type: 'TASK_CREATED',
        payload: item
    }
}

export const taskUpdate = (id, item) => {
    return {
        type: 'TASK_UPDATED',
        payload: {id, item}
    }
}


export const activeModal = (active, method='', item = {user: localStorage.getItem('user'),complete: false, title: ''}) => {
    return {
        type: 'ACTIVE_MODAL',
        payload: {active, item, method}
    }
}

export const modalDataChange = (item) => {
    return {
        type: 'MODAL_DATA_CHANGE',
        payload: item
    }
}

export const userDataChange = (value) => {
    return {
        type: 'USER_DATA_CHANGE',
        payload: value 
    }
}