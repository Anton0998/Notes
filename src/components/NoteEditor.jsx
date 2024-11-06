import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogBackdrop, DialogPanel } from "@headlessui/react";


export default function NoteEditor({ note, onClose, onSave, uniqueCategories }) {
    // const [open, setOpen] = useState(false);

    // State til at holde den aktuelle titel, indhold og kategori
    const [title, setTitle] = useState(note.title); // Til titel-input
    const [content, setContent] = useState(note.content); // Til indhold-input
    const [category, setCategory] = useState(note.category); // Til kategori-input

    // Når note ændres, opdater da inputfelterne
    useEffect(() => {
        if (note) {
            setTitle(note.title)
            setContent(note.content)
            setCategory(note.category)
        }
    }, [note])

    // Funktion til at gemme de redigerede data
    const handleSave = () => {
        onSave({
            ...note,    // Beholder den oprindelige note-id og andre data
            title,
            content,
            category
        })
        onClose()       // Lukker editoren efter gem
    }

    return (
        <>
        <Dialog open={true} onClose={onClose} className="relative z-10">
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
                    <div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        {/* Titel for dialogen */}
                        <DialogTitle
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                        >
                        Add note
                        </DialogTitle>
                        <div className="mt-2">
                        {/* Formular til at tilføje en note */}
                        <form className="flex flex-col mt-6 gap-4 w-full">
                            <div className="flex flex-col w-full">
                            <label className="text-sm">Enter note</label>
                            <input
                                className="p-2 border-solid border rounded drop-shadow-sm	"
                                type="text"
                                placeholder="Bedroom decor"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                            </div>
                            <div className="flex flex-col w-full">
                            <label className="text-sm">Enter content</label>
                            <textarea
                                className="p-2 border-solid border rounded drop-shadow-sm"
                                style={{height: 160}}
                                placeholder="I need a chair and a mirror to fulfill my decor"
                                onChange={(e) => setContent(e.target.value)}
                                value={content}
                            />
                            </div>
{/*                             <div className="flex flex-col w-full">
                                <label className="text-sm">Enter category</label>
                                <input
                                    className="p-2 border rounded"
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </div>  */}
                            <div className="flex flex-col">
                                <label className="text-sm">Enter category</label>
                                <select
                                    className="p-2 border-solid border rounded drop-shadow-sm"
                                    onChange={(e) => setCategory(e.target.value)}
                                    value={category}
                                >
                                    {uniqueCategories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                    ))}
                                </select>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    {/* Knap til at tilføje noten */}
                    <button
                        type="submit"
                        onClick={handleSave} // Kald handleSave ved klik
                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    >
                        save
                    </button>
                    {/* Knap til at annullere */}
                    <button
                        data-autofocus
                        onClick={onClose} // Luk dialogen ved klik
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
    );
}
