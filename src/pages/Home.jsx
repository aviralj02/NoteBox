import useFetch from '../config/useFetch';
import NoteCard from '../components/NoteCard';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Home = () => {
    const { notes, setNotes, fetchError } = useFetch();

    const onDelete = (id) => {
        setNotes(prevNotes => {
            return prevNotes.filter(n => n.id !== id);
        })
    }

    const handleOnDragEnd = (result) => {
        if(!result.destination){
            return
        }

        const items = Array.from(notes);
        const [reorderedNotes] = items.splice(result.source?.index, 1);   //getting the dragged item into reorderedNotes from source index
        items.splice(result.destination?.index, 0, reorderedNotes);  //dropping the dragged item into destination index

        setNotes(items);   //updating the state
    }

    return (
        <div className='page'>
            {fetchError && (<h2>{fetchError}</h2>)}
            {notes && (
                <div className='notes'>
                    <DragDropContext onDragEnd={ handleOnDragEnd }>
                        <Droppable droppableId='notes'>
                            {(provided) => (
                                <div className='notes-grid' {...provided.droppableProps} ref={provided.innerRef}>
                                    { notes.length === 0 ? (
                                        <div className='empty'>
                                            <h1>No Notes Yet</h1>
                                        </div>
                                    )
                                    :
                                    notes.map((note, index) => (
                                        <Draggable key={note.id} draggableId={note.id?.toString()} index={index}>
                                            {(provided) => (
                                                <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                                    <NoteCard note={ note } index={index} onDelete={ onDelete } limit={100} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}

                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            )}
        </div>
     );
}
 
export default Home;