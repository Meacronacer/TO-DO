


const BtnsFilter = (props) => {
    
    const btns = ['all', 'complete', 'incomplete'].map((item, index) => {
        return <button type="button"
         key={index}
         className={'btn ' + (props.activeFilter === item ? 'btn-light': 'btn-outline-light')}
         onClick={() => props.setActiveFilter(item)}
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