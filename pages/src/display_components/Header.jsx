<<<<<<< HEAD

function Header({text}) {
  return (
    <header>
        <div className="container">
            <h2>{text}</h2>
        </div>
    </header>
  )
}
Header.defaultProps = {
  text: 'Default Props'
}
=======

function Header({text}) {
  return (
    <header>
        <div className="container">
            <h1>{text}</h1>
        </div>
    </header>
  )
}
Header.defaultProps = {
  text: 'Default Props'
}
>>>>>>> acad32be1002b2b872ffdccd649db4c868b50623
export default Header