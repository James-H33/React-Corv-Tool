import { Outlet } from "react-router-dom";
import './App.scss';

function App() {
  return (
    <>
      <header>
        <h2>Corv Tool</h2>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
