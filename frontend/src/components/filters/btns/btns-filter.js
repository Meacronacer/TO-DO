import { useDispatch, useSelector } from "react-redux"
import { tasksDataFilter } from "../../store/actions"

const BtnsFilter = () => {
    
    const dispatch = useDispatch()
    const activeFilter = useSelector(state => state.reducer.activeFilter)


    const btns = ['all', 'complete', 'incomplete'].map((item, index) => {
        return <button type="button"
         key={index}
         className={'btn ' + (activeFilter === item ? 'btn-light': 'btn-outline-light')}
         onClick={() => dispatch(tasksDataFilter(item))}
         >{item} 
         </button>
    })

    return (
        <div style={{marginLeft: '10px'}} className="btn-group btns-filter" role="group" aria-label="Basic example">
            {btns}
        </div>
    )
}

export default BtnsFilter