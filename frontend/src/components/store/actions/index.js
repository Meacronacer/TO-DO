export const tasksDataFilter = (filter) => {
    return {
        type: 'TASKS_DATA_FILTER',
        payload: filter
    }
}

export const incompleteTasks = (count) => {
    return {
        type: 'TASKS_INCOMPLETE',
        payload: count
    }
}

export const tasksDataSearch = (name) => {
    return {
        type: 'TASKS_DATA_SEARCH',
        payload: name
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