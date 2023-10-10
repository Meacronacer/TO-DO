import './modal.css'


const Modal = (props) => {

    if (!props) {
        return null
    }


    return (
        <div className="modal">
        <div onClick={() => props.modalTonggle('none')} className="overlay"></div>
        <div className="modal-content">
        <button onClick={() => props.modalTonggle('none')} className="close-modal">✖</button>
                <h4>{props.crud} task for user: {props?.updateItem?.user}</h4>

                <hr/>
                <form method='PUT' onSubmit={(e) => props.submitUpdate(e, props.crud)}>
                    <div className="form-group" style={{marginTop: '10px'}}>
                        <h4>Title</h4>
                        <input name='title'
                         value={props.updateItem.title}
                         onChange={(e) => props.setUpdateItem({...props.updateItem, [e.target.name]: e.target.value})} 
                        className="form-control" placeholder="Title"/>
                    </div>
                    <div className="form-check" style={{marginTop: '10px'}}>
                        <input name='complete'
                         value={props.updateItem.complete}
                         checked={props.updateItem.complete}
                         onChange={(e) => props.setUpdateItem({...props.updateItem, [e.target.name]: !JSON.parse(e.target.value)})}
                         type="checkbox" className="form-check-input"
                         id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Complete</label>
                    </div>
                    <button type="submit" style={{marginTop: '10px'}}
                     className="button-5 btn-update">{props.crud}</button>
                </form>
        </div>
        <div className="scrollbar-width"></div>
      </div>
    )

}



export default Modal;