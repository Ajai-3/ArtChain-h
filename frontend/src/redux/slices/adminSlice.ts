import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
    loading: false,
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAuthStatus(state, action) {
            state.isAuthenticated = action.payload.isAuthenticated
            state.user = action.payload.user
            state.error = null
            state.loading = false
        },
        setAuthError(state, action) {
            state.error = action.payload.error
            state.loading = false
        },
        setAuthLoading(state, action) {
            state.loading = action.payload.loading
        },
    },
})

export const { setAuthStatus, setAuthError, setAuthLoading } = adminSlice.actions
export default adminSlice.reducer