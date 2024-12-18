import {HIDE_MODAL, SET_MODAL} from "../types/ModalTypes";

const initialState = {
	visibleModal: false,
	title: "",
	content: "",
	width: "",
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_MODAL: {
			return {...state, visibleModal: true, title: action.title, content: action.content, width: action.width};
		}
		case HIDE_MODAL: {
			return {...state, visibleModal: false};
		}
		default:
			return state;
	}
};
