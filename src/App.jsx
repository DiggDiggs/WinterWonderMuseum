import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <main className="bg-slate-300/20">
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={'Home'} />
                <Route path="/chris" element={'Chris'} />
                <Route path="/alex" element={'Alex'} />
                <Route path="/dom" element={'Dom'} />
            </Routes>
        </Router>

    </main>
  )
}

export default App