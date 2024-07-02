import { observer } from "mobx-react-lite"
import { useStore } from "../stores/authStore"
import { Navigate, useLocation } from "react-router-dom"

const AuthGuard=({children})=>{
    const store = useStore()
    const {pathname} = useLocation()
    const allowedRoutes = [
        '/'
    ]
    if(store.isLoggedIn||allowedRoutes.includes(pathname)){
        return children
    } else {
        return <Navigate to={"/login"} />
    }
}

export default observer(AuthGuard)