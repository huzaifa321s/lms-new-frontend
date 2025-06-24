
import { createSlice } from '@reduxjs/toolkit'
import { clearCookie, getCookie } from '../../../shared/utils/helperFunction';



// export const getLeadsContent = createAsyncThunk('/teacher/auth', async () => {
// 	const response = await axios.get('/api/users?page=2', {})
// 	return response.data;
// })

export const teacherAuthSlice = createSlice({
    name: "teacherAuth",
    initialState: {
        token: getCookie("teacherToken") || null,
        credentials: getCookie("teacherCredentials") || null,
    },
    reducers: {
        handleLogin: (state, action) => {
            const {token, credentials} = action.payload;
            state.token = token;
            state.credentials = credentials
        },
        handleLogout: (state) => {
            state.token = null;
            state.credentials = null

            clearCookie("teacherToken")
            clearCookie("teacherCredentials")
        },
        handleUpdateProfile: (state, action) => {
            state.credentials = action.payload;
        }
    },

    extraReducers: (builder) => {
        // builder
        // // Register
        // .addCase(getLeadsContent.pending, (state) => {
        //   state.isLoading = true;
        // })
        // .addCase(getLeadsContent.fulfilled, (state, action) => {
        //   state.leads = action.payload.data;
        //   state.isLoading = false;
        // })
        // .addCase(getLeadsContent.rejected, (state, action) => {
        //   state.isLoading = false;
        // });
    },
});

export const { handleLogin, handleLogout, handleUpdateProfile } = teacherAuthSlice.actions;

export default teacherAuthSlice.reducer;
