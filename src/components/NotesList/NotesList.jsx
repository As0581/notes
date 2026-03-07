import NoteItem from "../NoteItem/NoteItem"

const NotesList = (props) => {
    const { notes, deleteNote, handleRedirect } = props
    return (
        <ul>
            {notes.map((note) => {
                return (
                    <NoteItem
                        handleRedirect={handleRedirect}
                        deleteNote={deleteNote}
                        key={note.id}
                        id={note.id}
                        title={note.title}
                    />
                )
            })}
        </ul>
    )
}

export default NotesList
