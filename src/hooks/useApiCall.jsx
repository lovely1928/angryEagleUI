import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify'
export const UseCallApi = ({
    url,
    method,
    options,
    body,
    query,
}) => {
    const token = localStorage.getItem('token')
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [message, setMessage] = useState('')

    useEffect(() => {
        let func = async () => {

            try {
                setLoading(true)    
                const resp = await axios.request(
                    {
                        method: method,
                        url: url,
                        data: body,
                        params: query,
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    }
                )
                // console.log(resp)
                if (resp.status === 200) {
                    if (resp.data.data) setData(resp.data)
                    setLoading(false)
                } else {
                    setError(resp.message || 'Something went wrong')
                }

                if (resp.data.message) {
                    setMessage(resp.data.message)
                    toast(resp.data.message)
                }
            } catch (e) {
                setError(e.message)
                toast(e.message)
            }
        }
        func()

    }, [url,body, method,query])
    // console.log('resp',{ message, data, error, loading })
    return { message, data, error, loading }
}