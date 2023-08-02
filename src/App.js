
import './App.css'

import React,{useState} from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes, // instead of Switches
  Route

} from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'
import NewsTotal from './components/NewsTotal'
function App() {
  const [mode,setMode]=useState('light');// Whether dark mode is enabled or not
  const [textMode,setTextMode]=useState('dark');
  let toggleMode=()=>{
    if(mode==='light'){
      setMode('dark');
      document.body.style.backgroundColor='#042743';
    }
    else{
      setMode('light');
      document.body.style.backgroundColor='white';
    }
    if(textMode==='dark'){
      setTextMode('light');
    }
    else{
      setTextMode('dark');
    }
  }
  const pageSize=12;
  const apiKey=process.env.REACT_APP_NEWS_API
  const [progress,setProgress]=useState(0);
    return (
      <div>
        <Router>
        <Navbar mode={mode} toggleMode={toggleMode} textMode={textMode}/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
      />
        
        <Routes>
        <Route exact path="/" element={<News mode={mode} apiKey={apiKey} setProgress={setProgress} key="general" pageSize={pageSize} country="in" category="general"/>}></Route>
        <Route exact path="/search" element={<NewsTotal mode={mode} categorySearch={localStorage.getItem('word')} apiKey={apiKey} setProgress={setProgress} key="main" pageSize={pageSize} country="in"  />}></Route>
          <Route exact path="/business" element={<News mode={mode} apiKey={apiKey} setProgress={setProgress} key="business" pageSize={pageSize} country="in" category="business"/>}></Route>
          <Route exact path="/entertainment" element={<News mode={mode} apiKey={apiKey} setProgress={setProgress} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>}></Route>
          <Route exact path="/general" element={<News mode={mode} apiKey={apiKey} setProgress={setProgress} key="general" pageSize={pageSize} country="in" category="general"/>}></Route>
          <Route exact path="/health" element={<News mode={mode} apiKey={apiKey} setProgress={setProgress} key="health" pageSize={pageSize} country="in" category="health"/>}></Route>
          <Route exact path="/science" element={<News mode={mode} apiKey={apiKey} setProgress={setProgress} key="science" pageSize={pageSize} country="in" category="science"/>}></Route>
          <Route exact path="/sports" element={<News mode={mode} apiKey={apiKey} setProgress={setProgress} key="sports" pageSize={pageSize} country="in" category="sports"/>}></Route>
          <Route exact path="/technology" element={<News mode={mode} apiKey={apiKey} setProgress={setProgress} key="technology" pageSize={pageSize} country="in" category="technology"/>}></Route>
        </Routes>
        </Router>
      </div>
    )
  
}
export default App;