import {TOKEN, USER_LOGIN} from "../../util/settings/config";
import {NOFICATION, CLOSE_NOFICATION, LOGIN, GET_LIST_USER, GET_DETAIL_USER, SET_USER} from "../types/userTypes";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
	user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
	userLogin: user,
	nofication: {
		toggle: false,
		title: "success",
		text: "",
	},
	listUser: [],
	detailUser: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case NOFICATION: {
			let nofi = {...state.nofication};
			nofi.toggle = true;
			nofi.title = action.title;
			nofi.text = action.text;
			return {...state, nofication: nofi};
		}
		case CLOSE_NOFICATION: {
			let nofi = {...state.nofication};
			nofi.toggle = false;
			return {...state, nofication: nofi};
		}
		case LOGIN: {
			localStorage.setItem(USER_LOGIN, JSON.stringify(action.user));
			localStorage.setItem(TOKEN, action.token);
			return {...state, userLogin: action.user};
		}
		case GET_LIST_USER: {
			return {...state, listUser: action.listUser};
		}
		case GET_DETAIL_USER: {
			return {...state, detailUser: action.detailUser};
		}
		case SET_USER: {
			return {...state, userLogin: action.userLogin};
		}
		default: {
			return state;
		}
	}
};
