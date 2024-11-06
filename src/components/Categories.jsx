import React, { useReducer, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { initialNotes } from './Notes';
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
  } from "@headlessui/react"; 

const initialCategories = [...new Set(initialNotes.map(note => note.category))]

export default function Categories({ setSelectedCategory }) {
    const [categories, setCategories] = useState(initialCategories)
    const [newCategory, setNewCategory] = useState('')
    const [open, setOpen] = useState(false)

    const handleSubmitCategory = (e) => {
        e.preventDefault()

        if (newCategory && !categories.some(category => category.toLowerCase() === newCategory.toLowerCase())) {
            setCategories([ ...categories, newCategory])
            setNewCategory('')
            setOpen(false)
        } else {
            window.alert('Denne kategori findes allerede')
        }
    }


    return (
    <>
        <div className="flex py-4 px-2 border-b border-solid ">
            <button
            className="px-3 py-1 rounded outline-1 outline text-slate-600 rounded outline-slate-200 transition hover:bg-slate-200 "
            onClick={() => setOpen(true)}
            >
                Add category
            </button>
        </div>
        <ul className='flex flex-col p-2'>
            <button className='w-full p-3 text-start bg-transparent hover:bg-transparent/10 transition-all w-full p-3 text-start bg-transparent hover:bg-slate-100 transition-all rounded-md outline-none hover:outline-2 hover:outline-slate-200 outline-offset-0' onClick={() => setSelectedCategory(null)}>Show all</button>
            {categories.map(category => 
                <li key={uuidv4()} >
                    <button className='w-full p-3 text-start bg-transparent hover:bg-slate-100 transition-all rounded-md outline-none hover:outline-2 hover:outline-slate-200 outline-offset-0 capitalize' onClick={() => setSelectedCategory(category)} >
                        {category}
                    </button>
                </li>
            )}
        </ul>
        <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    {/* Titel for dialogen */}
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Add category
                    </DialogTitle>
                    {/* Body her */}
                    <form className='flex flex-col my-6 gap-1 w-full '>
                        <label className='text-sm'>Enter name</label>
                        <input className='p-2 border-solid border rounded drop-shadow-sm'
                            type='text'
                            placeholder='Gaming'
                            onChange={e => setNewCategory(e.target.value)}
                            value={newCategory}
                        />
                    </form>
                  </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                {/* Knap til at tilføje kategorien */}
                <button
                  type="submit"
                  onClick={handleSubmitCategory} // Kald handleSubmitCategory ved klik
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  Add
                </button>
                {/* Knap til at annullere */}
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)} // Luk dialogen ved klik
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
