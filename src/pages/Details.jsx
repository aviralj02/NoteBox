import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [record, setRecord] = useState({});

    useEffect(() => {
        const fetchRecord = async () => {
            const { data, error} = await supabase
                .from("Notes")
                .select()
                .eq('id', id)
                .single();
            
                if (error){
                    console.log(error);
                    setRecord(null);
                }
                if (data){
                    setRecord(data);
                }
        }

        fetchRecord();
    }, [id]);

    return ( 
        <div className="details">
            <h1>{ record.title }</h1>
            <p>{ record.body }</p>
            <button onClick={() => navigate("/")}>
                <i className="material-symbols-outlined">arrow_back</i> Back
            </button>
        </div>
     );
}
 
export default Details;