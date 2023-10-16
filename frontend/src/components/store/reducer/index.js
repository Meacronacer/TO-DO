const initialState = {
    incomplete: 0,
    activeFilter: 'all',
    activeModalMethod: '',
    search: '',
    userData: {username: '', password: ''},
    activeModal: false,
    modalData: {complete: false, title: ''},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TASKS_INCOMPLETE':
            return {
                ...state,
                incomplete: action.payload
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