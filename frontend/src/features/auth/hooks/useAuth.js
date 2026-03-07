import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () =>{
    const context = useContext(AuthContext)
    const {user, setUser, loading, setLoading, error, setError} = context

    const handleRegister = async ({ username, email, password }) => {
        try{
            setLoading(true)
            const data = await register({ username, email, password})
            setUser(data.user)
            return true
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }

    const handleLogin = async ({ email, password }) => {
        try{
            setLoading(true)
            const data = await login({ email, password})
            setUser(data.user)
            return true
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        try{
            setLoading(true)
            const data = await logout()
            setUser(null)
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        const getAndSetUser = async () => {
            try{
            const data = await getMe()
            setUser(data.user)
            }catch(err){
                console.log(err)
            }finally{
                setLoading(false)
            }
        }
        getAndSetUser()
    }, [])
     

    return { user, loading, error, handleRegister, handleLogin, handleLogout }
}