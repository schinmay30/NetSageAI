import "./Hero.css";
import { motion } from "framer-motion";

function Hero() {
  return (
    <motion.section
className="hero"
initial={{ opacity: 0, y: 60 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
>

      <div className="hero-left">

        <h1>
          AI Powered Cisco
          <br />
          Configuration Analyzer
        </h1>

        <p>
          Upload Cisco router or switch configuration files and
          instantly receive network health insights, issue detection,
          recommendations, and topology visualization.
        </p>

        <button>
          Get Started
        </button>

      </div>

      <div className="hero-right">

        <div className="hero-card">

          <h3>Network Health</h3>

          <h1>95%</h1>

          <p>Healthy Configuration</p>

        </div>

      </div>

    </motion.section>
  );
}

export default Hero;