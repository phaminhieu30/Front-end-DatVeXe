import React, {useEffect} from "react";
import "../../Sass/css/ticket.css";
import {Breadcrumb, Card, Tabs, Avatar, Form, Popconfirm, message, Button, Collapse, Comment, Tooltip, List, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {SET_MODAL} from "../../redux/types/ModalTypes";
import DetailsTicket from "./DetailsTicket";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {HomeOutlined, UserOutlined, EditOutlined, EllipsisOutlined, SettingOutlined, DeleteFilled} from "@ant-design/icons";
import moment from "moment";
import {cancelTicketUser, getTicketUser} from "../../redux/actions/ticketAction";
import {TOKEN, USER_LOGIN} from "../../util/settings/config";
import {history} from "../../App";
import {getAllPassenger} from "../../redux/actions/passengerAction";
import {createCommentUserAction, getCommentUserAction} from "../../redux/actions/commentAction";
const {TextArea} = Input;

const {TabPane} = Tabs;
const {Meta} = Card;
const {Panel} = Collapse;

export default function CommentManagement(props) {
	const dispatch = useDispatch();
	const {listPassenger} = useSelector((state) => state.PassengerReducer);
	const {userLogin} = useSelector((state) => state.userReducer);
	const {listCommentUser} = useSelector((state) => state.CommentReducer);
	console.log("file: CommentManagement.js ~ line 25 ~ CommentManagement ~ listCommentUser", listCommentUser);

	useEffect(() => {
		dispatch(getAllPassenger());
	}, [listCommentUser]);
	const handleChange = (e) => {
		console.log(e[0]);
		if (e[0]) {
			dispatch(getCommentUserAction(userLogin.id, e[0]));
		}
	};
	const onfinish = (values, id) => {
		let usercomment = {
			userId: userLogin.id,
			content: values.content,
			passengerId: id,
		};
		dispatch(createCommentUserAction(usercomment));
	};
	const renderCommentPassenger = () => {
		return listPassenger.map((item, index) => {
			return (
				<>
					<Panel header={`Nhà xe ${item.name}`} key={item.id}>
						<List
							className="comment-list"
							itemLayout="horizontal"
							dataSource={listCommentUser}
							renderItem={(item) => (
								<li>
									<Comment actions={item.actions} author={item.userComment?.name} avatar={"https://joeschmoe.io/api/v1/random"} content={item.content} datetime={item.datetime} />
								</li>
							)}
						/>
						<Form
							name="basic"
							initialValues={{remember: true}}
							onFinish={(values) => {
								onfinish(values, item.id);
							}}
						>
							<Form.Item name="content">
								<TextArea rows={4} />
							</Form.Item>
							<Form.Item>
								<Button htmlType="submit" type="primary">
									Add Comment
								</Button>
							</Form.Item>
						</Form>
					</Panel>
				</>
			);
		});
	};

	return (
		<div className="ticket">
			<div className="ticket-container">
				<div className="bread-cump">
					<Breadcrumb>
						<Breadcrumb.Item href="">
							<HomeOutlined />
						</Breadcrumb.Item>
						<Breadcrumb.Item href="">
							<UserOutlined />
							<span style={{ fontSize: "18px" }}>Nhận xét của tôi</span>
						</Breadcrumb.Item>
					</Breadcrumb>
				</div>
				<div className="ticket_management">
					<div className="grid grid-cols-12 gap-5">
						<div className="col-span-4">
							<Card style={{width: "100%"}}>
								<div className="card-item">
									<a
										onClick={() => {
											history.push("/usermgt");
										}}
									>
										<img src="https://storage.googleapis.com/fe-production/images/Auth/account-circle.svg" width={24} height={16} alt />
										<span style={{ fontSize: "18px" }} color="text" className="core__Text-sc-1c81tsc-1 kCMizM">
											Thông tin tài khoản
										</span>
									</a>
								</div>
								<div className="card-item">
									<a
										onClick={() => {
											history.push("/ticketmgt");
										}}
									>
										<img src="https://storage.googleapis.com/fe-production/images/ticket.svg" width={24} height={16} alt />
										<span style={{ fontSize: "18px" }} color="text" className="core__Text-sc-1c81tsc-1 kCMizM">
											Vé của tôi
										</span>
									</a>
								</div>
								<div className="card-item">
									<a
										onClick={() => {
											history.push("/commentmgt");
										}}
									>
										<img src="https://storage.googleapis.com/fe-production/images/review.svg" width={24} height={16} alt />
										<span style={{ fontSize: "18px" }} color="text" className="core__Text-sc-1c81tsc-1 kCMizM">
											Nhận xét của tôi
										</span>
									</a>
								</div>
								<div className="card-item">
									<a
										onClick={() => {
											localStorage.removeItem(USER_LOGIN);
											localStorage.removeItem(TOKEN);
											window.location.reload();
										}}
									>
										<img src="https://storage.googleapis.com/fe-production/images/Auth/logout.svg" width={24} height={16} alt />
										<span style={{ fontSize: "18px" }} color="text" className="core__Text-sc-1c81tsc-1 kCMizM">
											Đăng xuất
										</span>
									</a>
								</div>
							</Card>
						</div>
						<div className="col-span-8">
							<Collapse onChange={handleChange}>{renderCommentPassenger()}</Collapse>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
