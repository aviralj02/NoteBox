import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Update = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [formError, setFormError] = useState(null);

    useEffect(() => {
        const fetchNote = async () => {
            const { data, error} = await supabase
                .from("Notes")
                .select()
                .eq('id', id)
                .single();

            if (error){
                navigate('/', { replace: true });
            }

            if(data){
                setTitle(data.title);
                setBody(data.body);
            }
        }

        fetchNote();
    }, [id, navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!title || !body){
            setFormError("Please fill in all the fields correctly");
            return;
        }
        
        const { data, error } = await supabase
        .from("Notes")
        .update({ title, body })
        .eq('id', id)
        .single();
        
        if (error){
            setFormError("Please fill in all the fields correctly");
        }
        if (data){
            setFormError(null);
        }
        navigate('/');
    }

    return ( 
        <div className="page update">
            <form onSubmit={handleUpdate}>
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
                <button>Update</button>

                {formError && (<p className="error">{formError}</p>)}
            </form>
        </div>
     );
}
 
export default Update;