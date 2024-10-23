import './App.css';
import Categories from './components/Categories';
import Notes from './components/Notes'

function App() {


  return (
    <div className='bg-slate-200 max-w-screen-lg mx-auto h-screen flex flex-col'>
      <h1 className='text-center py-10 text-4xl font-extrabold'>Notes</h1>
      <main className='grid grid-cols-3 grid-rows-8 grow'>
        <div className='bg-slate-300 items-center flex'>
          Filtermuligheder her
        </div>
        <div className='bg-slate-400 col-span-2 flex items-center justify-end'>
          Toolbar her
        </div>
        <nav className='bg-slate-500 row-span-7'>
          <Categories /> 
        </nav>
        <div className='bg-slate-100 row-span-7 col-span-2'>
          <Notes />
        </div>
      </main>
    </div>
  );
}

export default App;
