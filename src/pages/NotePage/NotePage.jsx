import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import styles from "./NotePage.module.css"

const NotePage = () => {
    const { id } = useParams()
    const [currentNote, setCurrentNote] = useState(null)

    useEffect(() => {
        const notes = JSON.parse(localStorage.getItem("notes") || "[]")
        const note = notes.find((note) => note.id === id)
        setCurrentNote(note)
    }, [id])

    const save = () => {
        if (!currentNote) return

        const notes = JSON.parse(localStorage.getItem("notes") || "[]")
        const updatedNotes = notes.map((note) =>
            note.id === currentNote.id ? currentNote : note,
        )

        if (currentNote.title.trim() === "") {
            const isAgree = confirm(
                "Удалить заметку (вы оставили пустой заголовок)",
            )

            if (isAgree) {
                alert("Заметка удалена")
            }

            const filteredNotes = updatedNotes.filter((note) => note.id !== id)
            localStorage.setItem("notes", JSON.stringify(filteredNotes))
        } else {
            localStorage.setItem("notes", JSON.stringify(updatedNotes))
            // alert("Сохранено успешно!")
        }
    }

    if (!currentNote) {
        return (
            <div>
                <Link to={"/"}>Home</Link>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Link onClick={save} className={styles.homeLink} to={"/"}>
                    Назад
                </Link>
                <textarea
                    onChange={(e) =>
                        setCurrentNote({
                            ...currentNote,
                            title: e.target.value,
                        })
                    }
                    value={currentNote.title}
                    placeholder="Заголовок"
                    type="text"
                    className={styles.titleInput}
                ></textarea>
                <textarea
                    onChange={(e) =>
                        setCurrentNote({
                            ...currentNote,
                            content: e.target.value,
                        })
                    }
                    value={currentNote.content}
                    placeholder="напишите что-то"
                    name=""
                    id=""
                    className={styles.textarea}
                ></textarea>
                {/* <button className={styles.save} onClick={save}>
                Сохранить
            </button> */}
            </main>
        </div>
    )
}

export default NotePage
