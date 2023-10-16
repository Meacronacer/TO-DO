import TodoItem from '../to-do-item/to-do-item';
import Spinner from '../spinner/spinner';
import {useSelector, shallowEqual, useDispatch } from 'react-redux'
import { useGetTasksQuery } from '../../api/apiSlice';
import { incompleteTasks } from '../store/actions';
import { useEffect } from 'react';

const TodoList = () => {

    const {data: tasks = [], isLoading} = useGetTasksQuery()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(incompleteTasks(tasks.filter(item => !item.complete).length))
        // eslint-disable-next-line
    }, [tasks])
    
    const [activeFilter, search] = useSelector((state) => [
        state.reducer.activeFilter,
        state.reducer.search,
      ], shallowEqual);

    if (isLoading) {
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


    const filteredData = searchFilter(filterData(tasks, activeFilter), search)

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