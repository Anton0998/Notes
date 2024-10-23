import React, { useReducer, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

let initialCategories = [
    { name: 'Arbejde', id: uuidv4(), },
    { name: 'Skole', id: uuidv4(), },
    { name: 'Skole', id: uuidv4(), },
    { name: 'Indkøb', id: uuidv4(), },
    { name: 'Rejse', id: uuidv4(), },
];

// function reducer(categories, action) {

// }

export default function Categories() {
    // const [state, dispatch] = useReducer(reducer, initialCategories)
    const [category, setCategory] = useState(initialCategories)

    const toggleCategory = (name) => {

    }

    return (
        <ul className='flex flex-col'>
            {category.map(item => 
                <li key={item.id} >
                    <button className='w-full p-3 text-start bg-transparent hover:bg-transparent/10 transition-all' onClick={toggleCategory(item.name)} >
                        {item.name}
                    </button>
                </li>
            )}
        </ul>
  )
}
