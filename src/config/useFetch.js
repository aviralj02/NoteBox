import { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';

const useFetch = () => {
    const [fetchError, setFetchError] = useState(null);
    const[notes, setNotes] = useState(null);

    useEffect(() => {
      const fetchNotes = async () => {
        const { data, error } = await supabase
            .from('Notes')
            .select()

            if (error){
                setFetchError("Notes Fetch Failed");
                setNotes(null);
                console.log("Fetch Failed");
            }

            if (data){
                setNotes(data);
                setFetchError(null);
            }
      }
      
      fetchNotes();
    }, []);

    return { notes, setNotes, fetchError };
}

export default useFetch;