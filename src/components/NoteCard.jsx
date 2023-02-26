import { Link } from "react-router-dom";
import supabase from '../config/supabaseClient';

const NoteCard = ({ note, index, limit, onDelete }) => {
    const toShow = note.body?.substring(0, limit) + ' ...';

    const DisplayBody = () => {
        if (note.body?.length < limit){
            return (
                <p>{ note.body }</p>
            );
        }
        else{
            return (
                <p>{ toShow }</p>
            )
        }
    }

    const handleDelete = async () => {
        const { data, error } = await supabase
            .from("Notes")
            .delete()
            .eq('id', note.id)
            .select();

        if (error){
            console.log(error);
        }
        if (data){
            console.log(data);
            onDelete(note.id);
        }
    }

    return (
        <div 
            className="note-card" 
        >
            <h3>{ note.title }</h3>
            <DisplayBody />
            <div className="buttons">
                <Link to={`/details/${note.id}`}>
                    <i className="material-symbols-outlined">expand_content</i>                    
                </Link>
                <Link to={`/${note.id}`}>
                    <i className="material-icons">edit</i>
                </Link>
                    <i onClick={ handleDelete } className="material-icons">delete</i>
            </div>
        </div>
     );
}
 
export default NoteCard;
