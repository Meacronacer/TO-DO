import './spinner.css'

const Spinner = () => {
    return (
        <div className='d-flex mt-5 justify-content-center'>
        <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Spinner