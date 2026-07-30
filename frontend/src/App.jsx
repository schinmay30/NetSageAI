import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Upload from "./components/Upload";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [analysisData, setAnalysisData] = useState(null);

  return (
    <div className="app">
      <Navbar />

      <section id="home">
        <Hero />
      </section>

      <section id="upload">
        <Upload setAnalysisData={setAnalysisData} />
      </section>

      {analysisData && (
        <section id="dashboard">
          <Dashboard data={analysisData} />
        </section>
      )}

      <section id="about">
        <Footer />
      </section>
    </div>
  );
}

export default App;