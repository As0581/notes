import { useEffect, useState, useRef } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import styles from "./NotePage.module.css"

const NotePage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [currentNote, setCurrentNote] = useState(null)
    const [isSaved, setIsSaved] = useState(false)

    const titleRef = useRef(null)
    const contentRef = useRef(null)

    useEffect(() => {
        const notes = JSON.parse(localStorage.getItem("notes") || "[]")
        const note = notes.find((note) => note.id === id)
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentNote(note)
    }, [id])

    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.style.height = "auto"
            titleRef.current.style.height = titleRef.current.scrollHeight + "px"
        }
        if (contentRef.current) {
            contentRef.current.style.height = "auto"
            contentRef.current.style.height =
                contentRef.current.scrollHeight + "px"
        }
    }, [currentNote?.title, currentNote?.content])

    const linkSave = (e) => {
        if (!currentNote) return

        const notes = JSON.parse(localStorage.getItem("notes") || "[]")
        const updatedNotes = notes.map((note) =>
            note.id === currentNote.id ? currentNote : note,
        )

        if (currentNote.title.trim() === "") {
            e.preventDefault()

            const isAgree = confirm("Удалить заметку??? (пустой заголовок)")

            if (isAgree) {
                const filteredNotes = updatedNotes.filter(
                    (note) => note.id !== currentNote.id,
                )
                localStorage.setItem("notes", JSON.stringify(filteredNotes))
                alert("Заметка удалена")

                navigate("/")
            }
        } else {
            localStorage.setItem("notes", JSON.stringify(updatedNotes))
        }
    }

    const save = () => {
        if (!currentNote) return

        const notes = JSON.parse(localStorage.getItem("notes") || "[]")
        const updatedNotes = notes.map((note) =>
            note.id === currentNote.id ? currentNote : note,
        )
        localStorage.setItem("notes", JSON.stringify(updatedNotes))
        setIsSaved(true)

        setTimeout(() => {
            setIsSaved(false)
        }, 2000)
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
                <div className={isSaved ? styles.modalActive : styles.modal}>
                    Успешно сохранено
                </div>
                <div className={styles.top}>
                    <Link
                        onClick={linkSave}
                        className={styles.homeLink}
                        to={"/"}
                    >
                        Назад
                    </Link>

                    <button className={styles.save} onClick={save}>
                        Сохранить
                    </button>
                </div>

                <textarea
                    ref={titleRef}
                    onChange={(e) =>
                        setCurrentNote({
                            ...currentNote,
                            title: e.target.value,
                        })
                    }
                    value={currentNote.title}
                    placeholder="Заголовок (если пустой, то не сохраню)"
                    type="text"
                    className={styles.titleInput}
                ></textarea>
                <textarea
                    ref={contentRef}
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
