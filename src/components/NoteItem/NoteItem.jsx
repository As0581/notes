import styles from "./NoteItem.module.css"

const NoteItem = (props) => {
    const { title, id, deleteNote, handleRedirect } = props
    return (
        <li id={id}>
            <span className={styles.title}>{title}</span>
            <div className={styles.buttons}>
                <button
                    className={styles.button}
                    onClick={() => handleRedirect(id)}
                >
                    ✎
                </button>
                <button
                    onClick={() => deleteNote(id)}
                    className={styles.button}
                >
                    &times;
                </button>
            </div>
        </li>
    )
}

export default NoteItem
