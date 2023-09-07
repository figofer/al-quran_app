import { useState } from 'react'
import QuranSurahList from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SurahPage from './pages/DetailSurah';


function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route  path="/" element={<QuranSurahList />} />
          <Route  path="surah//" element={<QuranSurahList />} />
          <Route  path="/surah/:surahNumber" element={<SurahPage />} />
        </Routes>
      </Router>
     

    </>
  )
}

export default App
