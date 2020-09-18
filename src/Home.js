import React from 'react'


export default function Home(props) {
    const {details} = props

    if(!details){
        return <h2>Click above to order</h2>
    }

    return (
        <div>
            <h2>{details.username}'s Order</h2>
            <p>{` Size: ${details.size}`}</p>
            <p>{`Toppings: ${details.toppings}`}</p>
            <p>{`Special instruction: "${details.instructions}"`}</p>

        </div>
    )
}
