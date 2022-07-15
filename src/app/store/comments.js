import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import { nanoid } from "nanoid";
import { getCurrentUserId } from "./users";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
            state.isLoading = false;
        },
        removeComment: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;

const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    commentCreated,
    removeComment
} = actions;

const addCommentRequested = createAction("comments/addCommentRequested");
const removeCommentRequested = createAction("comments/removeCommentRequested");

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const createComment = (payload) => async (dispatch, getState) => {
    dispatch(addCommentRequested(payload));
    try {
        const { content } = await commentService.createComment({
            ...payload,
            _id: nanoid(),
            created_at: Date.now(),
            userId: getCurrentUserId()(getState())
        });

        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const commentDelete = (userId) => async (dispatch) => {
    dispatch(removeCommentRequested(userId));
    try {
        const { content } = await commentService.removeComment(userId);
        if (content === null) {
            dispatch(removeComment(userId));
        }
        dispatch(removeComment({ content, userId }));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
