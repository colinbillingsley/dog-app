import { createBrowserRouter, RouterProvider} from 'react-router-dom'

import AllDogs from './Pages/AllDogs';
import ErrorPage from './Pages/ErrorPage';
import BreedPage from './Pages/BreedPage';
import SubBreedPage from './Pages/SubBreedPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AllDogs />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dogs/breed/:breed-name",
    element: <BreedPage />,
  },
  {
    path: "/dogs/breed/:breed-name/sub-breed/:sub-breed-name",
    element: <SubBreedPage />,
  },
]);

function App() {
  return (
      <div className="App">
        <RouterProvider router={router} />
      </div>
  );
}

export default App;
