import axios from "axios";

export async function fetchUsers({
    sort,
    order,
    limit,
    search,
    page
}) {
    try {
        const token = localStorage.getItem("token");
        debugger
        const userData = await axios.get(
            'http://localhost:4000/api/user',
            {
                params: {
                    sort,
                    order,
                    limit,
                    search,
                    page,
                },
                headers: { Authorization: 'Bearer ' + token }
            })
        if (userData.status !== 200) {
            throw new Error("Failed to fetch")
        }
        return userData

    }
    catch (e) {
        throw e
    }
}