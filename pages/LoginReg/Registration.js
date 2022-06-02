import React, {useState, useEffect, useRef} from 'react'
import { useForm } from 'react-hook-form'

function Registration() {
  const { register } = useForm();
  return (
    <form>
      <div>
        <p>Form Testing</p>
        <label htmlFor="name">Name</label>
        <input  {...register("name", { required: true})}/>
      </div>
    </form>
  )
}

export default Registration

/* <div>
        <label htmlFor="name">Name</label>
        <input type = "text" name="name" id = "name" ref={register} />
      </div> 
      {console.log("Reg: ", register)} */