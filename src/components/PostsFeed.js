import { useEffect, useState } from "react"
import axios from "axios"
import "../styles/PostsFeed.css"
import translations from "../translations"

function PostsFeed() {

    const [posts, setPosts] = useState([])

    const [commentInputs, setCommentInputs] = useState({})

    const [shareInputs, setShareInputs] = useState({})

    const [language, setLanguage] =
useState("English")

const t = {

    ...translations.English,

    ...(translations[language] || {})

}

    const fetchPosts = async () => {

        try {

            const response = await axios.get(

                "http://localhost:3000/api/posts/all-posts"

            )

            setPosts(response.data)

        }

        catch(error) {

            console.log(error)

        }

    }

    const handleLike = async (postId) => {

    try {

        await axios.put(

            `http://localhost:3000/api/posts/like-post/${postId}`

        )

        fetchPosts()

    }

    catch(error) {

        console.log(error)

    }

    }

    const handleComment = async (postId) => {

    try {

        await axios.put(

            `http://localhost:3000/api/posts/comment-post/${postId}`,

            {

                comment: commentInputs[postId] || ""

            }

        )

        setCommentInputs({

            ...commentInputs,

            [postId]: ""

        })

        fetchPosts()

    }

    catch(error) {

        console.log(error)

    }

    }

    const handleShare = async (postId) => {

    try {

        const token =
        localStorage.getItem("token")

        const response =
        await axios.put(

            `http://localhost:3000/api/posts/share-post/${postId}`,

            {

                friendId: shareInputs[postId] || ""

            },

            {

                headers: {

                    authorization: token

                }

            }

        )

        alert(response.data.message)

        setShareInputs({

            ...shareInputs,

            [postId]: ""

        })

        fetchPosts()

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

    fetchPosts()

    fetchLanguage()

}, [])

    return (

        <div className="posts-container">

        <center>
            
            <h1>{t.postsFeed}</h1>

        </center>

        <div className="posts-grid">

            {

                posts.map((post) => (

                    <div
                        className="post-card"

                        key={post._id}
                    >

                        <h3>

                            {post.caption}

                        </h3>

                        {
    post.image && (

        <img

            src={post.image}

            alt="Post"

            className="post-image"

        />

    )

}

{
    post.video && (

        <video

            controls

            className="post-video"

        >

            <source

                src={post.video}

                type="video/mp4"

            />

        </video>

    )

}

                        <p>

                            {t.likes}: {post.likes}

                        </p>

                        <button onClick={() => handleLike(post._id)}> {t.likes} </button>

                        <p>{t.comments}:
                            {post.comments.length}
                        </p>

                        <input

                            type="text"

                            placeholder={t.writeComment}

                            value={commentInputs[post._id] || ""}

                            onChange={(e) =>

    setCommentInputs({

        ...commentInputs,

        [post._id]: e.target.value

    })

}

                        />

                        <button

                            onClick={() =>
                            handleComment(post._id)
                            }

                        >

                        {t.comment}

                        </button>

                        <p>

    {t.shares}: {post.sharedWith.length}

</p>

<input

    type="text"

    placeholder={t.enterFriendId}

    value={shareInputs[post._id] || ""}

    onChange={(e) =>

    setShareInputs({

        ...shareInputs,

        [post._id]: e.target.value

    })

}

/>

<button

    onClick={() =>
        handleShare(post._id)
    }

>

    {t.share}

</button>

                    </div>

                ))

            }

            </div>

        </div>

    )

}

export default PostsFeed