<<<<<<< HEAD

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

=======
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

>>>>>>> acad32be1002b2b872ffdccd649db4c868b50623
export default Button