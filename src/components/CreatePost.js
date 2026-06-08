import { useState } from "react"
import translations from "../translations"
import axios from "axios"
import { useEffect } from "react"
import "../styles/CreatePost.css"

function CreatePost({ fetchPosts }) {

    const [video, setVideo] = useState(null)
    const [image, setImage] = useState(null)
    const [caption, setCaption] = useState("")
    const [language, setLanguage] =
useState("English")

const t = {

    ...translations.English,

    ...(translations[language] || {})

}
    const token = localStorage.getItem("token")

    const formData = new FormData()
    formData.append(
        "caption",
        caption
    )
    if(image) {
    formData.append(
        "image",
        image
    )
}
    if(video) {
        formData.append(
            "video",
            video
        )
    }

    const handleCreatePost = async (e) => {

    e.preventDefault()

    try {

        const formData = new FormData()

        formData.append(

            "caption",

            caption

        )

        if(image) {

            formData.append(

                "image",

                image

            )

        }

        if(video) {

            formData.append(

                "video",

                video

            )

        }

        await axios.post(

            "http://localhost:3000/api/posts/create-post",

            formData,

            {

                headers: {

                    authorization: token

                }

            }

        )

        alert(t.postCreated)

        setCaption("")

        setImage(null)

        setVideo(null)

        if(fetchPosts) {

    fetchPosts()

}

    }

    catch(error) {

        console.log(error)

    }

}

useEffect(() => {

    const fetchLanguage = async () => {

        try {

            const token =
            localStorage.getItem("token")

            const response =
            await axios.get(

                "http://localhost:3000/api/users/profile",

                {

                    headers: {

                        authorization: token

                    }

                }

            )

            setLanguage(

                response.data.language ||

                "English"

            )

        }

        catch(error) {

            console.log(error)

        }

    }

    fetchLanguage()

}, [])

    return (

        <div className="create-post-container">

            <h2>{t.createPost}</h2>

            <form onSubmit={handleCreatePost}>

                <input
                    type="text"

                    placeholder={t.enterCaption}

                    value={caption}

                    onChange={(e) =>
                    setCaption(e.target.value)}
                />

                <div className="upload-section">

    <label
        className="upload-btn"
        htmlFor="image-upload"
    >
        {t.uploadImage}
    </label>

    <input
        id="image-upload"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) =>
            setImage(
                e.target.files[0]
            )
        }
    />

    <span>

        {

            image

            ?

            image.name

            :

            t.noImageSelected

        }

    </span>

</div>

<div className="upload-section">

    <label
        className="upload-btn"
        htmlFor="video-upload"
    >
        {t.uploadVideo}
    </label>

    <input
        id="video-upload"
        type="file"
        accept="video/*"
        style={{ display: "none" }}
        onChange={(e) =>
            setVideo(
                e.target.files[0]
            )
        }
    />

    <span>

        {

            video

            ?

            video.name

            :

            t.noVideoSelected

        }

    </span>

</div>

                <button
    type="submit"
    className="post-btn"
>

    {t.post}

</button>

            </form>

        </div>

    )

}

export default CreatePost