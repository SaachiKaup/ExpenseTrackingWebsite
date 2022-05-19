
function Button({children, version, type, is_disabled, onClick }) {
  return (
    <button onClick = {onClick} type = {type} disabled = {is_disabled} className = {`btn ${version} block`}>
        {children}
    </button>
  )
}

Button.defaultProps = {
    version: 'primary',
    type: 'button',
    is_disabled: true
}

export default Button