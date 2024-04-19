import axios from 'axios';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
const initialUserValue = {}
export const UserContext = createContext(initialUserValue);


export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setIsLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const token = localStorage.getItem('token') || null
    useEffect(() => {
        let func = async () => {

            try {
                setIsLoading(true)
                // if (isLoggedIn) {
                    if (token) {
                        const resp = await axios.get('http://localhost:4000/api/user/profile', {

                            // params: { userId },
                            headers: {
                                'Authorization': 'Bearer ' + token
                            }
                        })
                        // if (resp.status !== 200) {
                        //     toast(resp.message)
                        //     return
                        // }
                        // setIsLoading(x => false)
                        setUser((x) => resp.data.data)
                        setIsLoading(false)
                    }
                // }

            } catch (e) {
                console.log(e)
                toast(e.message)
            }
        }
        func()

        // return setUser(null)
    }, [token, isLoggedIn])

    return (
        <UserContext.Provider value={{ user, loading, setUser, setIsLoggedIn }}>
            {children}
        </UserContext.Provider>
    )
}