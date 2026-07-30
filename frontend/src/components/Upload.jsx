import { useState } from "react";
import "./Upload.css";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { uploadConfig } from "../services/api";

function Upload({ setAnalysisData }) {

    const [file,setFile]=useState(null);

    const [loading,setLoading]=useState(false);

    const [error,setError]=useState("");

    const handleAnalyze=async()=>{

        if(!file){

            alert("Select a Cisco Configuration File");

            return;

        }

        try{

            setLoading(true);

            setError("");

            const data=await uploadConfig(file);
            toast.success("Configuration uploaded successfully!");
            setAnalysisData(data);

        }

        catch(err){

            setError(err.message);
            toast.error("Upload Failed");

        }

        finally{

            setLoading(false);

        }

    }

 return(

   <motion.section
      className="upload-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
   >

            <div className="upload-card">

                <h2>Upload Cisco Configuration</h2>

                <p>

                    Upload your router or switch configuration file.

                </p>

                <input

                    type="file"

                    onChange={(e)=>setFile(e.target.files[0])}

                />

                {file &&

                    <div className="selected-file">

                        📄 {file.name}

                    </div>

                }

                <button

                    onClick={handleAnalyze}

                    disabled={loading}

                >

                    {loading ? "Analyzing..." : "Analyze Configuration"}

                </button>

                {error &&

                    <p

                        style={{

                            color:"red",

                            marginTop:"15px"

                        }}

                    >

                        {error}

                    </p>

                }

            </div>

        </motion.section>

    )

}

export default Upload;