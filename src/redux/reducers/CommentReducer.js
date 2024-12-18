import {GET_COMMENT_BY_PASSENGER, GET_COMMENT_BY_USER} from "../types/CommentTypes";

const initialState = {
	listCommentPassenger: [],
	listCommentUser: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_COMMENT_BY_PASSENGER: {
			return {...state, listCommentPassenger: action.listCommentPassenger};
		}
		case GET_COMMENT_BY_USER: {
			return {...state, listCommentUser: action.listCommentUser};
		}
		default:
			return state;
	}
};
