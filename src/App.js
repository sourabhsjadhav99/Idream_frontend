import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DisplayPage from './components/DisplayPage'
import Form from './components/Form'
import ErrorPage from './components/ErrorPage'




function App() {
  return (

    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DisplayPage />} />
          <Route path="/form" element={<Form />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
