const initialState = {
    tasksData: [],
    incomplete: 0,
    dataLoading: 'idle',
    activeFilter: 'all',
    activeModalMethod: '',
    search: '',
    userData: {username: '', password: ''},
    activeModal: false,
    modalData: {complete: false, title: ''},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TASKS_DATA_FETCHING':
            return {
                ...state,
                dataLoading: 'loading'
            }
        case 'TASKS_DATA_FETCHED':
            return {
                ...state,
                tasksData: action.payload,
                incomplete: action.payload.filter(item => !item.complete).length,
                dataLoading: 'idle'
            }
        case 'TASKS_DATA_FETCHING_ERROR':
            return {
                ...state,
                dataLoading: 'error'
            }
        case 'TASKS_DATA_FILTER':
            return {
                ...state,
                activeFilter: action.payload
            }
        case 'TASKS_DATA_SEARCH':
            return {
                ...state,
                search: action.payload
            }
        case 'TASK_DELETED':
            return {
                ...state,
                tasksData: state.tasksData.filter(item => item.id !== action.payload)
            }
        case 'TASK_CREATED':
            return {
                ...state,
                tasksData: [...state.tasksData, action.payload]
            }
        case 'TASK_UPDATED':
            return {
                ...state,
                tasksData: state.tasksData.map(item => {
                    if (item.id === action.payload.id) {
                        return action.payload.item
                    }
                    return item
                }),
                incomplete: action.payload.item.complete ? state.incomplete - 1: state.incomplete + 1
            }
        case 'ACTIVE_MODAL':
            return {
                ...state,
                activeModal: action.payload.active,
                modalData: action.payload.item,
                activeModalMethod: action.payload.method

            }
        case 'MODAL_DATA_CHANGE':
            const actionValue = action.payload.name === 'complete' ? !JSON.parse(action.payload.value) : action.payload.value
            return {
                ...state,
                modalData: {...state.modalData, [action.payload.name]:actionValue}
            }
        case 'USER_DATA_CHANGE':
            return {
                ...state,
                userData: {...state.userData, [action.payload.name]: action.payload.value}
            }

        
        default: return state
    }
}

export default reducer;