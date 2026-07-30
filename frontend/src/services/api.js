const API_URL = "http://127.0.0.1:8000/upload";

export async function uploadConfig(file){

    const formData = new FormData();

    formData.append("file",file);

    const response = await fetch(API_URL,{

        method:"POST",

        body:formData

    });

    if(!response.ok){

        throw new Error("Upload Failed");

    }

    return await response.json();

}