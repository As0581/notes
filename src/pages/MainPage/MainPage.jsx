import { useEffect, useId, useMemo, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import NotesList from "../../components/NotesList/NotesList"
import pic from "../../assets/search.svg"
import styles from "./MainPage.module.css"

const MainPage = () => {
    const [isOpenSearch, setIsOpenSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem("notes")
        return savedNotes
            ? JSON.parse(savedNotes)
            : [
                  {
                      id: crypto.randomUUID(),
                      title: "Новая заметка",
                      content: "",
                  },
              ]
    })

    const inputRef = useRef(null)

    const navigate = useNavigate()
    const handleRedirect = (id) => {
        navigate(`/note/${id}`)
    }

    const toggleOpenSearch = () => {
        setIsOpenSearch(!isOpenSearch)

        if (!isOpenSearch) {
            inputRef.current.focus()
        }

        console.log(isOpenSearch)
        if (isOpenSearch) {
            setSearchQuery("")
        }
    }

    const deleteNote = (noteId) => {
        setNotes(notes.filter((note) => note.id !== noteId))
    }

    const addNote = () => {
        const newNote = {
            id: crypto.randomUUID(),
            title: "",
            content: "",
        }

        const updatedNotes = [...notes, newNote]
        setNotes(updatedNotes)

        setTimeout(() => {
            navigate(`/note/${newNote.id}`)
        }, 0)
    }

    const filteredNotes = useMemo(() => {
        const clearedQuery = searchQuery.trim().toLowerCase()

        if (clearedQuery.length === 0) {
            return notes
        }

        return notes.filter((note) =>
            note.title.toLowerCase().includes(clearedQuery),
        )
    }, [searchQuery, notes])

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    return (
        <main className={styles.container}>
            <div
                className={`${styles.searchBox} ${isOpenSearch ? `${styles.active}` : ""}`}
            >
                <h1
                    className={`${styles.title} ${isOpenSearch ? `${styles.hidden}` : ""}`}
                >
                    Заметки
                </h1>
                <button className={styles.searchBtn} onClick={toggleOpenSearch}>
                    <img src={pic} alt="" />
                </button>
                <form onSubmit={(event) => event.preventDefault()} action="">
                    <input
                        ref={inputRef}
                        className={styles.searchInput}
                        placeholder="найти заметку"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>
            </div>
            {filteredNotes.length > 0 ? (
                <NotesList
                    handleRedirect={handleRedirect}
                    deleteNote={deleteNote}
                    notes={filteredNotes}
                />
            ) : (
                <p>Ничего не найдено</p>
            )}

            <button onClick={addNote} className={styles.add}>
                +
            </button>
        </main>
    )
}

export default MainPage
