import React, { useState, useReducer, useMemo } from "react"; // Importer nødvendige hooks fra React
import { v4 as uuidv4 } from "uuid"; // Importer uuid til at generere unikke ID'er
import NoteEditor from "./NoteEditor";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react"; // Importer Dialog-komponenter fra Headless UI

// Initialiserer en liste over noter med nogle eksempler
export let initialNotes = [
  {
    title: "Bentræningsprogram", // Titel på noten
    content:
      "Let jogging eller cykling - Dynamiske strækøvelser for benene (f.eks. ben sving, lunges) Hovedtræning 1. Squats - 3 sæt af 10-15 reps - Hold ryggen lige og sænk dig, som om du sætter dig på en stol. 2. Lunges - 3 sæt af 10-12 reps pr. ben",
    id: uuidv4(), // Generer et unikt ID for noten
    category: "Fitness", // Kategori for noten
  },
  {
    title: "Indkøbsliste",
    content:
      "1. Mælk 2. Æg 3. Brød 4. Pasta 5. Grøntsager (tomater, gulerødder, agurker) 6. Frugt (bananer, æbler) 7. Kød (kylling, oksekød) 8. Rengøringsmidler",
    id: uuidv4(),
    category: "Indkøb",
  },
  {
    title: "Projektplan for skoleopgave",
    content:
      "1. Research - Find relevante kilder og materialer 2. Struktur - Lav en disposition for opgaven 3. Udkast - Skriv første udkast 4. Gennemlæsning - Ret og finjuster teksten 5. Endelig version - Formater og aflever",
    id: uuidv4(),
    category: "Skole",
  },
  {
    title: "Sommerferieplaner",
    content:
      "1. Rejse til Italien - Besøg Rom, Firenze og Venedig 2. Hotelbooking - Find steder tæt på byens centrum 3. Udflugter - Bestil guidede ture til seværdigheder som Colosseum og Uffizi-galleriet 4. Pak liste: Pas, tøj til varmt vejr, solcreme, kamera",
    id: uuidv4(),
    category: "Rejse",
  },
  {
    title: "Mødeforberedelse til arbejde",
    content:
      "1. Gennemgå dagsordenen 2. Lav præsentationen 3. Forbered spørgsmål til diskussion 4. Send e-mails for at bekræfte deltagelse 5. Medbring laptop og noter",
    id: uuidv4(),
    category: "Arbejde",
  },
];

// Definerer de forskellige handlinger, der kan udføres på noter
const ACTIONS = {
  ADD_NOTE: "add_note", // Handling til at tilføje en note
  DELETE_NOTE: "delete_note",
  EDIT_NOTE: "edit-note",
};

// Reducer-funktion, der håndterer opdateringer af noter
function reducer(notes, action) {
  switch (action.type) {
    case ACTIONS.ADD_NOTE: {
      // Opret en ny note ved at kalde newNote-funktionen med de angivne værdier
      const note = newNote(
        action.payload.title,
        action.payload.content,
        action.payload.category,
        action.payload.id
      );

      // Tjek om newNote returnerer en gyldig note (ikke null)
      if (note) {
        // Tilføj den nye note til listen og returner den opdaterede liste
        return [note, ...notes];
      } else {
        // Hvis note er null, returneres den eksisterende notes-array uden ændringer
        return notes;
      }
    }

    case ACTIONS.DELETE_NOTE: {
      return notes.filter((note) => note.id !== action.payload.id);
    }

    case ACTIONS.EDIT_NOTE: {
      // Finder og opdatere den specifikke note
      return notes.map(note => 
        note.id === action.payload.id ? {...note, ...action.payload } : note
      )
    }

    // Standard case: hvis ingen handlinger matcher, returneres den eksisterende notes-liste
    default:
      return notes;
  }
}

// Funktion til at oprette en ny note
function newNote(title, content, category, id) {
  // Tjekker om titlen, indholdet og kategorien ikke er tomme
  if (title.trim() !== "" && category.trim() !== "" && content.trim() !== "") {
    // Returner et objekt, der repræsenterer den nye note
    return { title: title, category: category, content: content, id: id };
  } else {
    // Hvis en af værdierne er tom, returner null
    return null;
  }
}

// Hovedkomponenten til at vise og administrere noter
export default function Notes({ selectedCategory }) {
  // State til at styre dialogens åben/lukket tilstand
  const [open, setOpen] = useState(false);

  // Reducer til at håndtere noter og initialisere med initialNotes
  const [notes, dispatch] = useReducer(reducer, initialNotes);

  // State til formularfelter
  const [title, setTitle] = useState(""); // Til titel-input
  const [content, setContent] = useState(""); // Til indhold-input
  const [category, setCategory] = useState(""); // Til kategori-input

  // State til at redigere en note
  // const [editNote, setEditNote] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  // Generer unikke kategorier fra noter ved at mappe over kategorierne og fjerne dubletter
  const uniqueCategories = [...new Set(notes.map((note) => note.category))];

  // Filtrerer noter baseret på den valgte kategori (hvis der er en)
  const filteredNotes = selectedCategory
    ? notes.filter((note) => note.category === selectedCategory)
    : notes;

  // Funktion til at håndtere formularindsendelse
  function handleSubmit(e) {
    e.preventDefault(); // Forhindre standard formularindsendelse

    // Send en handling til reduceren for at tilføje en ny note
    dispatch({
      type: ACTIONS.ADD_NOTE, // Angiv handlingstypen
      payload: { title, category, content, id: uuidv4() }
    });

    setOpen(false);

    // Nulstil formularfelterne efter indsendelse
    setTitle("");
    setContent("");
    setCategory(uniqueCategories[0]); // Nulstil kategori til den første unikke kategori
    // console.log(notes) // Kan bruges til at debugge og vise noter i konsollen
  }

  function handleDelete(id) {
    dispatch({
      type: ACTIONS.DELETE_NOTE,
      payload: { id },
    });
  }

  const handleSaveNote = (updatedNote) => {
    dispatch({
      type: ACTIONS.EDIT_NOTE,
      payload: updatedNote, // Send den opdaterede note som payload
    });
    setSelectedNote(null); // Luk editoren efter gem
  };
  

  // Renderingsfunktion
  return (
    <>
      <div className="flex p-4 border-b border-solid ">
        {/* Knap til at åbne dialogen for at tilføje en note */}
        <button
          className="px-6 py-1 rounded bg-blue-600 hover:bg-blue-600/90 outline-1 text-white"
          onClick={() => setOpen(true)}
        >
          +
        </button>
      </div>
      <ul className="grid grid-cols-2 gap-2 p-2 overflow-y-auto bg-slate-100">
        {/* Mapper over de filtrerede noter og viser dem */}
        {filteredNotes.map((note) => (
          <li
            className="flex flex-col justify-between bg-white p-3 divide-y divide-solid rounded"
            key={note.id}
          >
            <div className="mb-6">
              <span className="text-black/60 text-sm">{note.category}</span>
              <h3 className="text-lg font-semibold text-black/80">
                {note.title}
              </h3>
              <p className="pt-4 text-black/60">{note.content}</p>
            </div>
            <div className="flex justify-end gap-2 py-4 ">
              <button
                className="border-solid border rounded border-slate-300  px-2 text-slate-600 hover:bg-slate-400 hover:border-slate-500 hover:text-white transition"
                onClick={() => setSelectedNote(note)} // Sætter den valgte note som selectedNote via useState
              >
                Edit
              </button>
              <button
                className="border-solid border rounded border-red-300  px-2 text-red-500 hover:bg-red-400 hover:border-red-500 hover:text-white transition"
                onClick={() => handleDelete(note.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Dialog til at tilføje noter */}
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
                        <div className="flex flex-col">
                          <label className="text-sm">Enter category</label>
                          <select
                            className="p-2 border-solid border rounded drop-shadow-sm"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                          >
                            {/* Mapper over unikke kategorier til dropdown */}
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
                  onClick={handleSubmit} // Kald handleSubmit ved klik
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  Add note
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

      {/* Betinget rendering af NoteEditor */}
      {selectedNote && (
        <NoteEditor
          note={selectedNote}                   // Sender den valgte note som prop til NoteEditor via vores useState
          onClose={() => setSelectedNote(null)} // Lukker Edit-dialogen
          onSave={handleSaveNote}               // Gemmer den redigeret note
          uniqueCategories={uniqueCategories}
        />
      )}
    </>
  );
}
