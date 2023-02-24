import PropTypes from 'prop-types'

const LogoutButton = ( {onClick} ) => (
    <button onClick={onClick}> Logout </button>
)

export default LogoutButton

LogoutButton.propTypes = {
    onClick: PropTypes.func.isRequired
}