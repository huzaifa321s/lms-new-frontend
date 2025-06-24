import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


// DISCARDED !!
// export const getCreatedCourses = createAsyncThunk('/teacher/courses/getMyCourses', async (page, thunkAPI) => {
//     try {
//         let response = await axios.get(`/teacher/course/getMyCourses/${page}`, {});
//         const apiResponse = response.data;
//         return thunkAPI.fulfillWithValue(apiResponse);
//     } catch (error) {
//         const apiResponse = error.response.data.message;
//         return thunkAPI.rejectWithValue(apiResponse);
//     }
// })

// DISCARDED !!
// export const searchCreatedCourses = createAsyncThunk('teacher/course/search', async (obj, thunkAPI) => {
//     const { name, currentPage } = obj;
//     let url = `/teacher/course/search?name=${name}`;
//     if (currentPage) url += `&page=${currentPage}`;

//     try {
//         let response = await axios.get(url, {});
//         const apiResponse = response.data;
//         return thunkAPI.fulfillWithValue(apiResponse);
//     } catch (error) {
//         const apiResponse = error.response.data.message;
//         return thunkAPI.rejectWithValue(apiResponse);
//     }
// })


// export const createCourse = createAsyncThunk('/teacher/course/create', async (obj, thunkAPI) => {
//     // console.log("obj --> ", obj)
//     try {
//         let response = await axios.post('/teacher/course/create', obj);
//         const apiResponse = response.data;
//         return thunkAPI.fulfillWithValue(apiResponse);
//     } catch (error) {
//         const apiResponse = error.response.data.message;
//         return thunkAPI.rejectWithValue(apiResponse);
//     }
// })


// export const editCourse = createAsyncThunk('/teacher/course/edit', async (obj, thunkAPI) => {
//     console.log("edit obj --> ", obj)
//     const { id, formdata} = obj;
//     try {
//         let response = await axios.put(`/teacher/course/edit/${id}`, formdata);
//         const apiResponse = response.data;
//         return thunkAPI.fulfillWithValue(apiResponse);
//     } catch (error) {
//         const apiResponse = error.response.data.message;
//         return thunkAPI.rejectWithValue(apiResponse);
//     }
// })








export const teacherCourses = createSlice({
    name: "teacherCourses",
    initialState: {
        isLoading: false,
        createdCourses: [],
        totalPages: 0,
        courseWithId: null,
    },
    reducers: {

    },

    extraReducers: (builder) => {
        // builder
            // // Get: Created courses (Discarded)
            // .addCase(getCreatedCourses.pending, (state) => {
            //     state.isLoading = true;
            // })
            // .addCase(getCreatedCourses.fulfilled, (state, action) => {
            //     const {courses, totalPages} = action.payload.data;
            //     state.createdCourses = courses;
            //     state.totalPages = totalPages;
            //     state.isLoading = false;
            // })
            // .addCase(getCreatedCourses.rejected, (state) => {
            //     state.isLoading = false;
            // })


            // // Get: Search created courses (Discarded)
            // .addCase(searchCreatedCourses.pending, (state) => {
            //     state.isLoading = true;
            // })
            // .addCase(searchCreatedCourses.fulfilled, (state, action) => {
            //     const {searchResult, totalPages} = action.payload.data;
            //     state.createdCourses = searchResult;
            //     state.totalPages = totalPages;
            //     state.isLoading = false;
            // })
            // .addCase(searchCreatedCourses.rejected, (state) => {
            //     state.isLoading = false;
            // })



            // // Add
            // .addCase(createCourse.pending, (state) => {
            //     state.isLoading = true;
            // })
            // .addCase(createCourse.fulfilled, (state) => {
            //     state.createdCourses = [...state.createdCourses];
            //     state.isLoading = false;
            // })
            // .addCase(createCourse.rejected, (state) => {
            //     state.isLoading = false;
            // });
    },
});

export const {  } = teacherCourses.actions;

export default teacherCourses.reducer;
