import { Routes, Route } from "react-router-dom"
import "./App.css"
import MainPage from "./pages/MainPage/MainPage"
import NotePage from "./pages/NotePage/NotePage"

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/note/:id" element={<NotePage />} />
            <Route path="*" element={<MainPage />} />
        </Routes>
    )
}

export default App
