const baseUrl = 'http://localhost:3003'

export default {
    post: async (route, data) => {
        const options = {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const res = await fetch(baseUrl+route, options)
        return await res.json()
    },
    get: async (route) => {
        const res = await fetch(baseUrl+route)
        return await res.json()
    }
}