import TodoItem from '../to-do-item/to-do-item';
import Spinner from '../spinner/spinner';
import { useHttp } from '../axios/axios';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { tasksDataFetched, tasksDataFetching, tasksDataFetchingError} from '../store/actions';
import { useEffect } from 'react';

const TodoList = () => {

    const {request} = useHttp()
    const dispatch = useDispatch()
    const [tasksData, activeFilter, search, dataLoading] = useSelector((state) => [
        state.tasksData,
        state.activeFilter,
        state.search,
        state.dataLoading
      ], shallowEqual);
    
    useEffect(() => {
        dispatch(tasksDataFetching());
        request('get', '/api/tasks/')
            .then(res => dispatch(tasksDataFetched(res.data)))
            .catch(() => dispatch(tasksDataFetchingError()))
        // eslint-disable-next-line
    }, [tasksData.length])


    if (dataLoading === 'loading') {
        return <Spinner/>
    }

    const filterData = (data, filter) => {
        switch (filter) {
            case 'all':
                return data
            case 'complete':
                return data.filter(item => item.complete)
            case 'incomplete':
                return data.filter(item => !item.complete)
            default:
                return data
        }   

    }

    const searchFilter = (data, name) => {
        return data.filter(item =>
            item.title.toLowerCase().indexOf(name) > -1)
    }


    const filteredData = searchFilter(filterData(tasksData, activeFilter), search)

    const listOfItems = filteredData.map((item, index) => {
        return <TodoItem key={index} item={item} />
    })



    return (
        <div style={{paddingBottom: '15px'}}>
            {listOfItems}
        </div>
    )
}

export default TodoList;