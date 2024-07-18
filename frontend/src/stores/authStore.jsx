import { action, makeObservable, observable, observe, runInAction } from 'mobx'
import { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const serverUrl = import.meta.env.VITE_SERVER_API
const AuthContext = createContext()

class AuthStore {
    user = {};
    isStarted=false;
    isLoggedIn = false;
    role = ''
    isLoading = false;
    isError = false;
    error = ""
    constructor() {
        makeObservable(this, {
            user: observable,
            isLoggedIn: observable,
            role: observable,
            isLoading: observable,
            isError: observable,
            error: observable,
            isStarted:observable,
            login:action,
            logout:action,
        })
    }
    async start(){
        try {
            console.log("Inside start");
            const res = await fetch(serverUrl+"/auth",{credentials:"include"})
            const json = await res.json()
            if (res.status == 200) {
                runInAction(() => {
                    this.user = json.data
                    this.isLoggedIn = true
                })
            } else if (res.status == 401) {
                runInAction(() => {
                    this.isError = true
                    this.error = "Session Expired"
                })
            } else {
                runInAction(() => {
                    this.isError = true
                    this.error = json.error
                })
            }
        } catch (error) {
            runInAction(() => {
                this.isError = true
                this.error = error
            })
        } finally {
            runInAction(() => {
                this.isStarted = true
                this.isLoading = false
            })
        }
    }
    async login({ username, pass },url) {
        try {
            this.isLoading = true
            this.isError = false
            this.error = ""
            const res = await fetch(serverUrl+url, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username, pass })
            })
            const json = await res.json()
            console.log(json)
            if (res.status == 200) {
                console.log("role",json.data.role)
                console.log("json",json)
                runInAction(() => {
                    this.user = json.data.username;
                    this.isLoggedIn = true;
                    this.role=json.data.role;
                })
            } else if (res.status == 404) {
                runInAction(() => {
                    this.isError = true
                    this.error = "User not found"
                })
            } else if (res.status == 401) {
                runInAction(() => {
                    this.isError = true
                    this.error = "Wrong Password"
                })
            } else if (res.status == 500) {
                runInAction(() => {
                    this.isError = true
                    this.error = json.error
                })
            }
        } catch (error) {
            runInAction(() => {
                this.isError = true
                this.error = error
            })
        } finally {
            runInAction(() => {
                this.isStarted=true
                this.isLoading = false
            })
        }
    }

    async logout() {
        try {
            this.isLoading = true
            this.isError = false
            this.error = ""
            const res = await fetch(serverUrl + "/logout", { credentials: 'include' })
            const json = await res.json()
            if (res.status == 200) {
                runInAction(() => {
                    this.isLoggedIn = false
                })
            } else {
                runInAction(() => {
                    this.isError = true
                    this.error = json.error
                })
            }
        } catch (error) {
            runInAction(() => {
                this.isError = true
                this.error = error
            })
        } finally {
            runInAction(()=>{
                this.isStarted=true
                this.isLoading = false
            })
        }
    }
}

export const AuthProvider = ({ children }) => {
    const store = new AuthStore()
    useEffect(()=>{
        console.log("Inside provider");
        if(!store.isStarted){
            store.start()
        }
    },[store])
    return <AuthContext.Provider value={store} >{children}</AuthContext.Provider>
}

export const useStore = () => useContext(AuthContext)