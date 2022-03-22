function Button({children, version, type, is_disabled }) {
  return (
    <button type = {type} disabled = {is_disabled} className = {`btn ${version}`}>
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