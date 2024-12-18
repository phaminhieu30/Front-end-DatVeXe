import React, {useEffect} from "react";
import "../../Sass/css/ticket.css";
import {Breadcrumb, Card, Tabs, Avatar, Popconfirm, message, Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {SET_MODAL} from "../../redux/types/ModalTypes";
import DetailsTicket from "./DetailsTicket";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {HomeOutlined, UserOutlined, EditOutlined, EllipsisOutlined, SettingOutlined, DeleteFilled} from "@ant-design/icons";
import moment from "moment";
import {cancelTicketUser, getTicketUser} from "../../redux/actions/ticketAction";
import {TOKEN, USER_LOGIN} from "../../util/settings/config";
import {history} from "../../App";
const {TabPane} = Tabs;
const {Meta} = Card;
export default function TicketManagement() {
	const {ticketUser} = useSelector((state) => state.TicketReducer);
	console.log("file: TicketManagement.js ~ line 18 ~ TicketManagement ~ ticketUser", ticketUser);

	const {userLogin} = useSelector((state) => state.userReducer);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getTicketUser(userLogin.id));
	}, []);
	function confirm(id) {
		dispatch(cancelTicketUser(id));
	}

	const renderTicketDepart = (status) => {
		return ticketUser.map((item, index) => {
			if (item.status == status) {
				return (
					<Card
						style={{width: "100%"}}
						cover={<img alt="example" src={item.tripPassengerTicket.passenger.imageIntro} height={120} />}
						actions={[
							<VisibilityOutlinedIcon
								key="view"
								onClick={() => {
									dispatch({
										type: SET_MODAL,
										content: <DetailsTicket ticket={item} />,
										width: 700,
									});
								}}
							/>,
							item.status == "cancel" ? (
								""
							) : (
								<Popconfirm
									placement="topRight"
									title={"Bạn có muốn hủy vé xe này không?"}
									onConfirm={() => {
										if (item.tripPassengerTicket.status == "depart") {
											confirm(item.id);
										} else {
											message.error("Không thể hủy vé");
										}
									}}
									okText="Yes"
									cancelText="No"
								>
									<DeleteFilled key="delete" />
								</Popconfirm>
							),
						]}
					>
						<Meta
							style={{fontSize: 12}}
							avatar={<Avatar src="https://storage.googleapis.com/fe-production/images/ticket.svg" />}
							title={`Vé xe số ${item.id}`}
							description={
								<>
									<div>
										<p>
											Vé Xe Đi <span className="font-bold">{item.tripPassengerTicket.trip.to.province}</span> từ <span className="font-bold">{item.tripPassengerTicket.trip.from.province}</span>
										</p>
									</div>
									<div>
										<p>
											Thời gian khởi hành: <span className="font-bold">{moment(item.tripPassengerTicket.trip.startTime).format("DD-MM-YYYY")}</span> lúc <span className="font-bold">{item.tripPassengerTicket.startTime}</span>
										</p>
									</div>
								</>
							}
						/>
					</Card>
				);
			}
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
							<span style={{ fontSize: "18px" }}>Vé của tôi</span>
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
							<Tabs type="card">
								<TabPane tab="Vé đã đặt" key="1">
									<div className="grid grid-cols-3 gap-4">{renderTicketDepart("pending")}</div>
								</TabPane>

								<TabPane tab="Vé đã hủy" key="3">
									<div className="grid grid-cols-3 gap-4">{renderTicketDepart("cancel")}</div>
								</TabPane>
							</Tabs>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
