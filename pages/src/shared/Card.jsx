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

export default Card