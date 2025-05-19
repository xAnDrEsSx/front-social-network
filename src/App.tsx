import { BrowserRouter, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { renderRoutes, routes } from "./infrastructure/routes";
import { OverflowProvider } from './utils/overflowContext';
import { useDialogStore } from './infrastructure/store/sDialog';


function App() {
  const { showDialog } = useDialogStore(store => store);
  document.body.style.overflowY = showDialog ? 'hidden' : 'initial';   
  
  return (
    <div className='w-full h-full min-h-full bg-white dark:bg-gray-950'>
      <OverflowProvider>
        <BrowserRouter>
          <Toaster
            richColors
            position='top-right'
            expand={false}
            closeButton
            duration={8000}
            toastOptions={{
              classNames: {
                closeButton: '!size-6 !text-5xl !font-black',
              }
            }}
          />
          <Routes>
            {renderRoutes(routes)}
          </Routes>
        </BrowserRouter>
      </OverflowProvider>

    </div>
  )
}

export default App