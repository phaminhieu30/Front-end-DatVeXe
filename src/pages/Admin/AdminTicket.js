import React, {Fragment, useEffect} from "react";
import {Layout, Menu, Breadcrumb, Image, Table, Statistic, Button, Rate, Popconfirm, Tag, Spin, message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {deletePassenger, getAllPassenger} from "../../redux/actions/passengerAction";
import _ from "lodash";
import {AudioOutlined, ClockCircleOutlined, CloseCircleOutlined, CheckCircleOutlined, SyncOutlined, EditOutlined, SearchOutlined, DeleteOutlined, CalendarOutlined, FolderViewOutlined, LoadingOutlined} from "@ant-design/icons";

import {SET_MODAL} from "../../redux/types/ModalTypes";
import {OPEN_DRAWER} from "../../redux/types/DrawerTypes";
import {cancelTicketUser, confirmTicket, deleteTicket, getAllTicket} from "../../redux/actions/ticketAction";
import moment from "moment";
import EditTicket from "../../components/Edit/EditTicket";

const {Header, Content, Footer, Sider} = Layout;

export default function AdminTicket(props) {
	const dispatch = useDispatch();
	const {listTicket} = useSelector((state) => state.TicketReducer);
	console.log("file: AdminTicket.js ~ line 19 ~ AdminTicket ~ listTicket", listTicket);
	useEffect(() => {
		dispatch(getAllTicket());
	}, []);
	let arrFilterId = listTicket.map((item) => {
		return {value: item.id, text: item.id};
	});
	let arrFilterName = _.uniqBy(listTicket, "user_id").map((item) => {
		return {value: item.user_id, text: item.user?.name};
	});
	let arrFilterPhone = _.uniqBy(listTicket, "user_id").map((item) => {
		return {value: item.user_id, text: item.user?.numberPhone};
	});
	let arrFilterStatus = _.uniqBy(listTicket, "status").map((item) => {
		return {value: item.status, text: item.status};
	});
	const antIcon = <LoadingOutlined style={{fontSize: 24}} spin />;
	const renderSeat = (ticket) => {
		if (ticket.ticketSeatId?.length > 0) {
			return ticket?.ticketSeatId?.map((item, index) => {
				return (
					<div>
						{item?.seatofticket?.name} - tầng {item?.seatofticket?.floor}
					</div>
				);
			});
		} else {
			return <div>Không có ghế đặt</div>;
		}
	};
	const renderPoint = (ticket, typePoint) => {
		let point = ticket.ticketPointId?.find((obj) => {
			return obj.typePoint == typePoint;
		});

		return (
			<span>
				{point?.timepointTicket?.time}-{point?.timepointTicket?.point?.name} - {point?.timepointTicket?.point?.address}
			</span>
		);
	};
	const renderStatus = (ticket) => {
		if (ticket.status == "pending") {
			return (
				<>
					<Tag icon={<SyncOutlined spin />} color="processing">
						Chờ Xác Nhận
					</Tag>
					<div className="mt-2">
						<Button
							className="font-light font-italic mb-2"
							onClick={() => {
								dispatch(confirmTicket(ticket.id));
							}}
						>
							<Spin indicator={antIcon} /> Xác Nhận
						</Button>
						<Button
							danger
							onClick={() => {
								dispatch(cancelTicketUser(ticket.id));
							}}
						>
							Hủy
						</Button>
					</div>
				</>
			);
		} else if (ticket.status == "confirm") {
			return (
				<Tag icon={<CheckCircleOutlined />} color="success">
					Xác Nhận
				</Tag>
			);
		} else if (ticket.status == "cancel") {
			return (
				<Tag icon={<CloseCircleOutlined />} color="error">
					Đã Hủy
				</Tag>
			);
		}
	};
	const columns = [
		{
			title: "Số Vé",
			render: (text, ticket) => {
				return (
					<div>
						<h4>Số Vé {ticket.id}</h4>
					</div>
				);
			},
			sorter: (a, b) => a.id - b.id,
			sortDirections: ["descend"],
			filters: arrFilterId,
			onFilter: (value, record) => record.name.startsWith(value),
			filterSearch: true,
		},
		{
			title: "Người Đặt",
			render: (text, ticket) => {
				return (
					<div>
						<a>{ticket.user.name}</a>
					</div>
				);
			},
			filters: arrFilterName,
			onFilter: (value, record) => record.user_id == value,
			filterSearch: true,
		},
		{
			title: "Số Điện Thoại Người Đặt",
			render: (text, ticket) => {
				return (
					<div>
						<a>{ticket.user.numberPhone}</a>
					</div>
				);
			},
			filters: arrFilterPhone,
			onFilter: (value, record) => record.user_id == value,
			filterSearch: true,
		},
		{
			title: "Từ",
			render: (text, ticket) => {
				return (
					<div>
						<h4>
							{ticket.tripPassengerTicket.trip.from.province} - ({ticket.tripPassengerTicket.trip.from?.name}) - ({ticket.tripPassengerTicket.trip.from.address})
						</h4>
					</div>
				);
			},
		},
		{
			title: "Đến",
			render: (text, ticket) => {
				return (
					<div>
						<h4>
							{ticket.tripPassengerTicket.trip.to.province} - ({ticket.tripPassengerTicket.trip.to?.name}) - ({ticket.tripPassengerTicket.trip.to.address})
						</h4>
					</div>
				);
			},
		},
		{
			title: "Ngày Đặt",
			render: (text, ticket) => {
				return (
					<div>
						<a>{moment(ticket.createdAt).format("DD-MM-YYYY h:mm:ss")}</a>
					</div>
				);
			},
		},
		{
			title: "Nhà Xe - Xe",
			render: (text, ticket) => {
				return (
					<div>
						<h4 style={{fontSize: 12}}>
							Nhà xe {ticket.tripPassengerTicket.passenger.name} ({ticket.tripPassengerTicket.passenger.description})
						</h4>
						<h4 style={{fontSize: 12}}>
							{ticket.tripPassengerTicket.vehicle.name} ({ticket.tripPassengerTicket.vehicle.description})
						</h4>
						<Image width={50} src={ticket.tripPassengerTicket.passenger.imageIntro} style={{borderRadius: "50%"}} />
					</div>
				);
			},
		},
		{
			title: "Tổng tiền",
			render: (text, ticket) => {
				return (
					<div>
						<h4>{ticket.totalAmount}</h4>
					</div>
				);
			},
			onFilter: (value, record) => record.totalAmount.indexOf(value) === 0,
			sorter: (a, b) => a.totalAmount - b.totalAmount,
			sortDirections: ["descend"],
		},

		{
			title: "Trạng Thái",
			render: (text, ticket) => {
				return (
					<div>
						<h4>{renderStatus(ticket)}</h4>
					</div>
				);
			},
			filters: arrFilterStatus,
			onFilter: (value, record) => record.status.startsWith(value),
			filterSearch: true,
		},
		{
			title: "Ghế Đã Đặt",
			render: (text, ticket) => {
				return <div>{renderSeat(ticket)}</div>;
			},
		},
		{
			title: "Điểm Đón - Trả",
			render: (text, ticket) => {
				return (
					<>
						<div style={{fontSize: 12}}>
							<span className="font-bold">Điểm đón</span>: <p>{renderPoint(ticket, "pickup")}</p>
						</div>
						<div style={{fontSize: 12}}>
							<span className="font-bold">Điểm trả</span>: <p>{renderPoint(ticket, "dropoff")}</p>
						</div>
					</>
				);
			},
		},

		{
			title: "Action",
			render: (text, item) => {
				return (
					<Fragment>
						<div>
							<button
								className="mr-3"
								onClick={() => {
									dispatch({
										type: OPEN_DRAWER,
										title: "Cập nhật vé",
										content: <EditTicket id={item.id} />,
									});
								}}
							>
								<EditOutlined />
							</button>
							<Popconfirm
								placement="topLeft"
								title={"Bạn có muốn xóa vé này"}
								onConfirm={() => {
									if (item.status !== "cancel") {
										message.error("Vé đang không ở trạng thái đã hủy");
									} else {
										dispatch(deleteTicket(item.id));
									}
								}}
								okText="Yes"
								cancelText="No"
							>
								<button className="text-red-700">
									<DeleteOutlined />
								</button>
							</Popconfirm>
						</div>
					</Fragment>
				);
			},
		},
	];
	return (
		<Content style={{margin: "0 16px"}}>
			<Breadcrumb style={{margin: "16px 0"}}>
				<Breadcrumb.Item>Admin</Breadcrumb.Item>
				<Breadcrumb.Item>Ticket</Breadcrumb.Item>
			</Breadcrumb>
			<div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
				<h1>Danh sách các vé</h1>
				<Table columns={columns} dataSource={listTicket} />
			</div>
		</Content>
	);
}
