import axios from '../../axios/index'

export const useAuth = () => {
    const _signUp = (data) => {
        return new Promise((resolve, reject) => {
            axios.post('api/auth/sign-up', data).then((response) => {
                resolve(response)
            }).catch(reject)
        })
    }
    const signUp = async (data) => {
        return await axios.post('api/auth/sign-up', data).then((response) => {
            return response.data
        })
    }

    const signIn = async (data) => {
        return await axios.post('api/auth/sign-in', data).then((response) => {
            console.log(response);
            return response.data
        })
    }
    return {
        signUp,
        signIn,
        _signUp
    }
}