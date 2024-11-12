import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    loading: false,
    data: {},
    error: ''
}
export const fetchTaskThunk = createAsyncThunk('task/fetchTasks', async ({ id, memberId, search }) => {
    const token = localStorage.getItem('token')
    console.log('token ', token)
    const response = await axios.get("http://localhost:4000/api/task", {
        headers: {
            'Authorization': 'Bearer ' + token
        },
        params: {
            projectId: id, memberId, search
        }
    })

    return response.data
})
export const taskSlice = createSlice({
    name: "task",
    initialState: initialState,
    reducers: {
        // fetchTaskLoading: () => { },
        // fetchTaskSuccess: () => { },
        // fetchTaskError: () => { },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTaskThunk.fulfilled, (state, action) => {
            // console.log('fulfill case', action)
            return { ...state, data: action.payload, loading: false }
        })
        builder.addCase(fetchTaskThunk.rejected, (state, action) => {
            // console.log('rejected case', action)
            state.error = action.payload
            state.loading = false
        })
        builder.addCase(fetchTaskThunk.pending, (state, action) => {
            // console.log('pending case', action)
            // state.data = action.
            state.loading = true
        })
    }
})

export const taskReducer = taskSlice.reducer
export const taskActions = taskSlice.actions