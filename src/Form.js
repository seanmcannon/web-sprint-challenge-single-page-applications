import React from 'react'

export default function Form(props){

    const {
        values,
        onInputChange,
        onSubmit,
        disabled,
        errors,
        onCheckboxChange,
    } = props

    return(
        <div>
            <form onSubmit={onSubmit}>
                <div>
                     <h2>Order Pizza!</h2>
                </div>
                <div>
                    <h4>Create Your Pizza</h4>
                     <label>Name&nbsp; 
                        <input 
                            type='text'
                            name = 'username'
                            placeholder = 'Your name'
                            maxLength = '20'
                            value = {values.username}
                            onChange = {onInputChange}
                            /><br></br>
                            <br></br>
                    </label>
                    <label>Choose Size&nbsp;

                        <select 
                            name='size' 
                            value={values.size}
                            onChange = {onInputChange}>
                            <option value=''>Select a Size</option>    
                            <option value ='Small'>Small</option>
                            <option value='Medium'>Medium</option>
                            <option value='Large'>Large</option>
                        </select>
                    </label>
                    <h4>Choose Toppings</h4>
                     <label>Pepperoni:&nbsp;
                        <input 
                            type='checkbox'
                            name='pepperoni'
                            checked={values.toppings.pepperoni}
                            onChange = {onCheckboxChange}
                        />&nbsp;
                    </label>
                    <label>Sausage:&nbsp;
                        <input 
                            type='checkbox'
                            name='sausage'
                            checked={values.toppings.sausage}
                            onChange = {onCheckboxChange}
                        />&nbsp;
                    </label>
                    <label>Peppers:&nbsp;
                        <input 
                            type='checkbox'
                            name='peppers'
                            checked={values.toppings.peppers}
                            onChange = {onCheckboxChange}
                        />&nbsp;
                    </label>
                     <label>Onion:&nbsp;
                        <input 
                            type='checkbox'
                            name='onion'
                            checked={values.toppings.onion}
                            onChange = {onCheckboxChange}
                        />&nbsp;
                    </label>
                    <h4>Special Instructions</h4>
                    <label>
                        <input 
                            type='text'
                            name = 'instructions'
                            placeholder = 'Special Instructions'
                            maxLength = '120'
                            value = {values.instructions}
                            onChange = {onInputChange}
                            />
                    </label>               
                </div>
                <button disabled={disabled}>Add to Order</button>
                 <div>
                    {
                    Object.values(errors).map((error, idx) => (
                    <div key={idx}>{error}</div>
                    ))}
                </div>
            </form>
        </div>
    )
}


