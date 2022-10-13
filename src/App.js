import React from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route ,Redirect, Routes} from "react-router-dom";

const App=()=> {

  const [progress, setprogress] = useState(10)
 
  const pageSize=15
   const apiKey= process.env.REACT_APP_NEWS_API;
  // CREATING STATE AND PROGRESS OF TOP-LOADING-BAR
return (
      <div>
    
        <Router>
          <LoadingBar color="#f11946" progress={progress} />
          <Navbar />

          <Routes>
            {/* <Redirect exact from="/" to="/home" /> */}
            <Route
              path="/"
              element={
                <News
                  setProgress={setprogress}
                  apiKey={apiKey}
                  key="general"
                  pageSize={pageSize}
                  country="in"
                  category="general"
                />
              }
            />
            <Route
              path="/entertainment"
              element={
                <News
                  setProgress={setprogress}
                  apiKey={apiKey}
                  key="entertainment"
                  pageSize={pageSize}
                  country="in"
                  category="entertainment"
                />
              }
            />
            <Route
              path="/business"
              element={
                <News
                  setProgress={setprogress}
                  apiKey={apiKey}
                  key="business"
                  pageSize={pageSize}
                  country="in"
                  category="business"
                />
              }
            />
            <Route
              path="/health"
              element={
                <News
                  setProgress={setprogress}
                  apiKey={apiKey}
                  key="health"
                  pageSize={pageSize}
                  country="in"
                  category="health"
                />
              }
            />
            <Route
              path="/science"
              element={
                <News
                  setProgress={setprogress}
                  apiKey={apiKey}
                  key="science"
                  pageSize={pageSize}
                  country="in"
                  category="science"
                />
              }
            />
            <Route
              path="/sports"
              element={
                <News
                  setProgress={setprogress}
                  apiKey={apiKey}
                  key="sports"
                  pageSize={pageSize}
                  country="in"
                  category="sports"
                />
              }
            />
            <Route
              path="/technology"
              element={
                <News
                  setProgress={setprogress}
                  apiKey={apiKey}
                  key="technology"
                  pageSize={pageSize}
                  country="in"
                  category="technology"
                />
              }
            />
          </Routes>
        </Router>
      </div>
 
    );
  
}

export default App;
