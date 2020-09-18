import React, {useState, useEffect} from "react";
import { Switch, Route, Link } from 'react-router-dom'
import Home from './Home'
import Form from './Form'
import * as yup from 'yup'
import formSchema from './validation/formSchema'
import axios from 'axios'



  const initialFormValues = {
    username:'',
    size:'',
    instructions:'',
    toppings: {
      pepperoni: false,
      sausage: false,
      peppers: false,
      onion: false,
    },
    
  }

  const initialFormErrors = {
    username:'',
    size:'',
  }

  const initialPizza = []
  const initialDisabled = true

export default function App(){
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)
  const [pizza, setPizza] = useState(initialPizza)

  const postNewPizza = newPizza => {
      axios
        .post('https://reqres.in/api/users',newPizza)
        .then(res => {
          setPizza([...pizza, res.data]);
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setFormValues(initialFormValues)
        })
  }

  const onInputChange = evt => {
    const name = evt.target.name
    const value = evt.target.value
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: ''
        });
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        });
      });
        setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const onCheckboxChange = evt => {
    const { name } = evt.target
    const { checked } = evt.target
    setFormValues({
      ...formValues,
      toppings: {
        ...formValues.toppings,
        [name]: checked,
      }
    })
  }

  const onSubmit = evt => {
    evt.preventDefault()

    const newPizza = {
      username: formValues.username.trim(),
      size: formValues.size,
      toppings: Object.keys(formValues.toppings)
        .filter(topping => formValues.toppings[topping] === true),
      instructions: formValues.instructions.trim()
    }
    postNewPizza(newPizza)
  }

  useEffect(() => {
    formSchema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid)
      })
  }, [formValues])

  return (
    <>
      <nav>
        <h1>The Pizza Place</h1>
          <div>
          <Link to ='/'>Home Page</Link><br></br><br></br>
          <Link to='/pizza'>Order Here</Link><br></br>
          {/* <img src='../Assets/Pizza.jpg' alt='pizza'/> */}
        </div>
      </nav>

      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route path='/pizza'>
          <Form
            values = {formValues} 
            onInputChange = {onInputChange} 
            onCheckboxChange={onCheckboxChange} 
            onSubmit = {onSubmit} 
            disabled={disabled} 
            errors={formErrors}
          />

          {pizza.map(pizza => {
            return (
              <Home key={pizza.id} details={pizza}/>
            )
          })
        }
        </Route>

      </Switch>
</>
   
  );
};