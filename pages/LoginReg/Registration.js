import React, {useState, useEffect, useRef} from 'react'
import { useForm } from 'react-hook-form'
import Card from '../src/shared/Card'
import Button from '../src/shared/Button'
import { CreateUserInBackendFromAPI } from '../../api_call/CreateUserInBackendFromAPI'

function Registration() {
  const { register, handleSubmit} = useForm();

  return (
    <Card>
      <form onSubmit={handleSubmit((formData) => {
        console.log("FormData: ", formData)
        CreateUserInBackendFromAPI(formData)
      })}>
      <div>
        <label htmlFor="name">  Name  </label>
        <input  {...register("name", { required: true})}/>
      </div>
      <div>
        <label htmlFor="email">  Email  </label>
        <input  {...register("email", { required: true})}/>
      </div>
      <div>
        <label htmlFor="mobile_number">  Mobile Number </label>
        <input  {...register("mobile_number", 
          { required: true, 
            pattern: /^[0-9]{10}$/,
            minLength: 10
          })}/>
      </div>
      <div>
        <button type = "submit" >Register</button>
      </div>
    </form>
    </Card>
  )
}

export default Registration

/* <div>
        <label htmlFor="name">Name</label>
        <input type = "text" name="name" id = "name" ref={register} />
      </div> 
      {console.log("Reg: ", register)} */