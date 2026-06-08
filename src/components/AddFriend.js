import { useState, useEffect } from "react"
import "../styles/AddFriend.css"
import axios from "axios"
import translations from "../translations"

function AddFriend() {

    const [friendId, setFriendId] =
    useState("")

    const [language, setLanguage] =
useState("English")

const t = {

    ...translations.English,

    ...(translations[language] || {})

}

useEffect(() => {

    const fetchLanguage = async () => {

        try {

            const token =
            localStorage.getItem("token")

            const response =
            await axios.get(

                "https://community-platform-backend-xdo1.onrender.com/api/users/profile",

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

    const handleAddFriend =
    async () => {

        try {

            const token =
            localStorage.getItem("token")

            const response =
            await axios.put(

                "https://community-platform-backend-xdo1.onrender.com/api/users/add-friend",

                {

                    friendId

                },

                {

                    headers: {

                        authorization: token

                    }

                }

            )

            alert(response.data.message)

            setFriendId("")

        }

        catch(error) {

            console.log(error)

        }

    }

    return (

        <div className="add-friend-container">

            <h2>{t.addFriend}</h2>

            <input

                type="text"

                placeholder={t.enterFriendUserId}

                value={friendId}

                onChange={(e) =>
                setFriendId(e.target.value)}
            />

            <button
                onClick={handleAddFriend}
            >

                {t.addFriend}

            </button>

        </div>

    )

}

export default AddFriend