<<<<<<< HEAD
function Card({children, input}) {
    //this is a style component, can be used anywhere in src
    //children is a default prop, undefined if not explicit
  let input_text = ""
  if (input) {
    input_text = " input"
  }
  return (
    <div className= {"card" + input_text}>{children}</div>
  )
}

=======
function Card({children, input}) {
    //this is a style component, can be used anywhere in src
    //children is a default prop, undefined if not explicit
  let input_text = ""
  if (input) {
    input_text = " input"
  }
  return (
    <div className= {"card" + input_text}>{children}</div>
  )
}

>>>>>>> acad32be1002b2b872ffdccd649db4c868b50623
export default Card