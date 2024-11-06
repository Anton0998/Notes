import { useReducer, useState } from 'react';
import './App.css';
import Categories from './components/Categories';
import Notes from './components/Notes'

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null)

  return (
    <div className='max-w-screen-lg mx-auto h-screen flex flex-col'>
      <h1 className='text-center py-10 text-4xl font-extrabold'>Notes</h1>
      <main className='grid grid-cols-3 grid-rows-8 grow overflow-auto border rounded-lg'>
        {/* <div className='bg-slate-300 col-span-3'>
          <Toolbar /> 
        </div> */}
        <nav className='row-span-7 border-solid border-r'>
          <Categories setSelectedCategory={setSelectedCategory} /> 
        </nav>
        <div className=' row-span-7 col-span-2'>
          <Notes selectedCategory={selectedCategory} />
        </div>
      </main>
    </div>
  );
}

export default App;
