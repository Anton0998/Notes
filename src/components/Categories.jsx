import React, { useReducer, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { initialNotes } from './Notes';

export default function Categories({ setSelectedCategory }) {

    const categories = [...new Set(initialNotes.map(note => note.category))]

    return (
        <ul className='flex flex-col p-2'>
            <button className='w-full p-3 text-start bg-transparent hover:bg-transparent/10 transition-all w-full p-3 text-start bg-transparent hover:bg-slate-100 transition-all rounded-md outline-none hover:outline-2 hover:outline-slate-200 outline-offset-0' onClick={() => setSelectedCategory(null)}>Show all</button>
            {categories.map(category => 
                <li key={uuidv4()} >
                    <button className='w-full p-3 text-start bg-transparent hover:bg-slate-100 transition-all rounded-md outline-none hover:outline-2 hover:outline-slate-200 outline-offset-0' onClick={() => setSelectedCategory(category)} >
                        {category}
                    </button>
                </li>
            )}
        </ul>
  )
}
