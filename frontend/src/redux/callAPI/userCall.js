
import {publicRequest} from '../requestMethods'
import { createAsyncThunk } from '@reduxjs/toolkit';

//Login
export const login = createAsyncThunk (
    "user/login",
    async (user)=> {
        // try{
            // const headers = new Headers()
            // headers.append("Content-Type" , "application/json" )

            const config = { headers: { "Content-Type": "application/json" }, }; 
            const {data} = await publicRequest.post(
                `/login`,
                user,
                config,
            )
            localStorage.setItem("token",data.token)
            return data.user
        // }catch(err){
        //     return err.response.data.message
        // }
    }
);


//Regiter
export const register = createAsyncThunk(
    "user/register",
    async (userData) => {
        const {data} = await publicRequest.post(
            `/register`, 
            userData
        )
        return data.user
    }    
);


//Load user
export const loadUser = createAsyncThunk(
    "user/loadUser",
    async () => {
        // try{
            const token = localStorage.getItem("token");
            const config = { headers: { Authorization : `Bearer ${token}`  } }; 
            const {data} = await publicRequest.get(
                `/me`,
                config
            )
            return data.user
        // }catch(err){
        //     return  err.response.data.message
        // }
    }
);

//Log out
export const logout = createAsyncThunk(
    'user/logout',
    async()=>{
        
        await publicRequest.get(
            `/logout`
        )
    }
);

//Update Profile 
export const updateProfile = createAsyncThunk(
    "user/updateProfile",
    async(userData)=>{
       
            const token = localStorage.getItem("token");
            const config = { headers: { Authorization : `Bearer ${token}`  } }; 

            const {data} = await publicRequest.put(
                '/me/update',
                userData,
                config,
                
            )
            return data.success
    }
)

//Update password
export const updatePassword = createAsyncThunk(
    "user/updatePassword",
    async (passwords) => {
        // try{
            const token = localStorage.getItem("token");
            const config = { headers: { Authorization : `Bearer ${token}`  } }; 
    
            const {data} = await publicRequest.put(
                '/password/update',
                passwords,
                config,
            )
            return data.success 
        // }catch(err){
        //     return  err.response.data.message
        // }
    }
);

//forgot password
export const forgotPassword = createAsyncThunk(
    "user/forgotPassword",
    async (email)=>{
        // try{
            const {data} = await publicRequest.post(
                '/password/forgot',
                email,
            )
            return data.message 
        // }catch(err){
        //     return  err.response.data.message
        // }
    }
)

//reset password
export const resetPassword = createAsyncThunk(
    "user/resetPassword",
    async (TokenAndPassword)=>{
        // try{
            const {data} = await publicRequest.put(
                `/password/reset/${TokenAndPassword[0]}`,
                TokenAndPassword[1]
            )
            return data.success

        // }catch(err){
        //     return  err.response.data.message
        // }
    }
)


