import "./Issues.css";

function Issues({ issues }) {

    return(

        <div className="panel">

            <h2>Detected Issues</h2>

            <ul>

                {issues.map((issue,index)=>(

                    <li key={index}>
                        ⚠️ {issue}
                    </li>

                ))}

            </ul>

        </div>

    )

}

export default Issues;