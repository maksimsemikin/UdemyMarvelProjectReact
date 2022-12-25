import img from './error404.gif'

const ErrorMessage = () => {
    return (
        <img style={{display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto'}} src={img} alt="ERROR404" />
    )
}

export default ErrorMessage;