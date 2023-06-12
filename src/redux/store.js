import { configureStore } from "@reduxjs/toolkit";
import { fetchPosts, postsReducer } from "./slices/posts";

const store = configureStore({
    reducer:{
        posts: postsReducer,
    },
   
})

export default store;