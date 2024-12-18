import {baseService} from "./BaseService";

export class CommentService extends baseService {
	constructor() {
		super();
	}
	getCommentByPassenger = (passengerId) => {
		return this.get(`/comment?passengerId=${passengerId}`);
	};
	getCommentUserPassenger = (userId, passengerId) => {
		return this.get(`/comment/usercomment/${userId}?passengerId=${passengerId}`);
	};
	createCommentUserPassenger = (userComment) => {
		return this.post(`/comment`, userComment);
	};
}
export const commentService = new CommentService();
