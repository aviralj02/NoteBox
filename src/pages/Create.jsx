import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Create = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [formError, setFormError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !body){
            setFormError("Please fill in all the fields correctly");
            return;
        }
        
        const { data, error } = await supabase
        .from("Notes")
        .insert([{title, body}]);

        if(error){
            console.log(error);
            setFormError("Please fill in all the fields correctly");
        }
        if(data){
            setFormError(null);
        }
        navigate('/');
    }

    return ( 
        <div className="page create">
            <form onSubmit={handleSubmit}>
                <label>Title: </label>
                <input 
                    type='text'
                    id='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Content: </label>
                <textarea
                    id='body'
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <button>Save</button>

                {formError && (<p className="error">{formError}</p>)}
            </form>
        </div>
     );
}
 
export default Create;