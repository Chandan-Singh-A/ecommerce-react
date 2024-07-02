import { useEffect, useState } from "react"
import { useStore } from "../src/stores/authStore"

const useGet = (endPoint,dependency=[])=>{
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState("")
    const [data, setData] = useState([])
    const store = useStore()

    const fetchData = async()=>{
        try {
            setIsLoading(true)
            setIsError(false)
            setError("")
            const res = await fetch(import.meta.env.VITE_SERVER_API+"/"+endPoint,{
                method:"GET",
                credentials:"include"
            })
            const json = await res.json()
            if(res.status==200){
                console.log("data setted");
                setData(p=>[...json.data])
            } else if(res.status==401){
                store.isLoggedIn = false
            } else {
                setIsError(true)
                setError(json.error)
            }
        } catch (error) {
            setIsError(true)
            setError(error)
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        fetchData()
    },[...dependency])

    return [isLoading, isError, data, setData, error]
}

export default useGet