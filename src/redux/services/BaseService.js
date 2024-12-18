import Axios from "axios";
import {DOMAIN, TOKEN} from "../../util/settings/config";
export class baseService {
	//put json về phía backend
	put = (url, model) => {
		return Axios({
			url: `${DOMAIN}${url}`,
			method: "PUT",
			data: model,
			headers: {token: localStorage.getItem(TOKEN)}, //JWT
		});
	};
	putUpdateImage = (url, file) => {
		return Axios({
			url: `${DOMAIN}${url}`,
			method: "PUT",
			data: file,
			headers: {token: localStorage.getItem(TOKEN), "Content-Type": "multipart/form-data; "}, //JWT
		});
	};

	post = (url, model) => {
		return Axios({
			url: `${DOMAIN}${url}`,
			method: "POST",
			data: model,
			headers: {token: localStorage.getItem(TOKEN)}, //JWT
		});
	};
	postImage = (url, model) => {
		return Axios({
			url: `${DOMAIN}${url}`,
			method: "POST",
			data: model,
			headers: {token: localStorage.getItem(TOKEN), "Content-Type": "multipart/form-data; "}, //JWT
		});
	};
	get = (url) => {
		return Axios({
			url: `${DOMAIN}${url}`,
			method: "GET",
			headers: {token: localStorage.getItem(TOKEN)}, //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
		});
	};
	delete = (url) => {
		return Axios({
			url: `${DOMAIN}${url}`,
			method: "DELETE",
			headers: {token: localStorage.getItem(TOKEN)}, //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
		});
	};

	postPay = (url, model) => {
		return Axios({
			url: `${url}`,
			method: "POST",
			data: model,

			headers: {token: localStorage.getItem(TOKEN), "Access-Control-Allow-Origin": "*", "Content-Type": "application/json"}, //JWT
		});
	};
}
