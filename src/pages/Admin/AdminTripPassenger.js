import React, {Fragment, useEffect} from "react";
import {Layout, Menu, Breadcrumb, Table, Input, Space, Popconfirm, Tag, Divider, Button, message, Popover} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {AudioOutlined, EditOutlined, SearchOutlined, DeleteOutlined, CalendarOutlined, FolderViewOutlined, CheckCircleOutlined, SyncOutlined, CloseCircleOutlined, ExclamationCircleOutlined, ClockCircleOutlined, MinusCircleOutlined} from "@ant-design/icons";
import {confirmTripPassengerAction, deleteTripPassengerAction, getDetailTripAction, getTripAction, getTripPassengerAction} from "../../redux/actions/tripAction";
import moment from "moment";
import {history} from "../../App";
import {Content} from "antd/lib/layout/layout";
import {SET_MODAL} from "../../redux/types/ModalTypes";
import Vehicle from "../../components/Vehicle/Vehicle";
import {OPEN_DRAWER} from "../../redux/types/DrawerTypes";
import EditTrip from "../../components/Edit/EditTrip";
import _ from "lodash";
import AdminDetailTicket from "../../components/AdminDetailTicKet/AdminDetailTicket";

export default function AdminTripPassenger(props) {
	const dispatch = useDispatch();
	const {id} = props.match.params;
	const {listTripPassenger, tripDetail} = useSelector((state) => state.TripReducer);
	console.log("file: AdminTripPassenger.js ~ line 19 ~ AdminTripPassenger ~ listTripPassenger", listTripPassenger);

	useEffect(() => {
		dispatch(getDetailTripAction(id));
		dispatch(getTripPassengerAction(id));
	}, [id]);
	let arrFilterDate = _.uniqBy(listTripPassenger, "startTime").map((item) => {
		return {value: item.startTime, text: item.startTime};
	});
	let arrFilterDateEnd = _.uniqBy(listTripPassenger, "endTime").map((item) => {
		return {value: item.endTime, text: item.endTime};
	});
	const renderStatus = (trip) => {
		if (trip.status == "depart") {
			return (
				<Tag icon={<ClockCircleOutlined spin />} color="default">
					Sắp xuất phát
				</Tag>
			);
		} else if (trip.status == "progress") {
			return (
				<Tag icon={<SyncOutlined spin />} color="processing">
					Đang Chạy
				</Tag>
			);
		} else if (trip.status == "cancel") {
			return (
				<Tag icon={<CloseCircleOutlined />} color="error">
					Đã Hủy
				</Tag>
			);
		} else {
			return (
				<Tag icon={<CheckCircleOutlined />} color="success">
					Hoàn Thành
				</Tag>
			);
		}
	};
	const renderButtonStatus = (trip) => {
		if (trip.status == "depart") {
			return (
				<>
					<Button
						type="primary"
						onClick={() => {
							dispatch(confirmTripPassengerAction(trip, "progress"));
						}}
					>
						<Tag icon={<SyncOutlined spin />} color="default">
							Đang Chạy
						</Tag>
					</Button>
					<Button
						type="danger"
						onClick={() => {
							dispatch(confirmTripPassengerAction(trip, "cancel"));
						}}
					>
						<Tag icon={<CloseCircleOutlined spin />} color="error">
							Hủy
						</Tag>
					</Button>
					<Button
						type="primary"
						onClick={() => {
							dispatch(confirmTripPassengerAction(trip, "success"));
						}}
					>
						<Tag icon={<CheckCircleOutlined spin />} color="success">
							Hoàn Thành
						</Tag>
					</Button>
				</>
			);
		} else if (trip.status == "progress") {
			return (
				<>
					<Button
						type="primary"
						onClick={() => {
							dispatch(confirmTripPassengerAction(trip, "success"));
						}}
					>
						<Tag icon={<CheckCircleOutlined spin />} color="success">
							Hoàn Thành
						</Tag>
					</Button>
					<Button
						type="danger"
						onClick={() => {
							dispatch(confirmTripPassengerAction(trip, "cancel"));
						}}
					>
						<Tag icon={<CloseCircleOutlined spin />} color="error">
							Hủy
						</Tag>
					</Button>
				</>
			);
		} else if (trip.status == "cancel") {
			return (
				<Tag icon={<CloseCircleOutlined />} color="error">
					Đã Hủy
				</Tag>
			);
		} else {
			return (
				<Tag icon={<CheckCircleOutlined />} color="success">
					Hoàn Thành
				</Tag>
			);
		}
	};
	const columns = [
		{
			title: "Nhà Xe",
			render: (text, tripPassenger) => {
				return (
					<div>
						{tripPassenger.passenger.name} ({tripPassenger.passenger.description}){" "}
					</div>
				);
			},
		},
		{
			title: "Xe",

			// specify the condition of filtering result
			// here is that finding the name started with `value`
			render: (text, trip) => {
				return (
					<div>
						{" "}
						{trip.vehicle.name}{" "}
						<Button
							type="primary"
							onClick={() => {
								dispatch({
									type: SET_MODAL,
									title: `Sơ Đồ Xe ${trip.vehicle.name}`,
									content: <Vehicle vehicle={trip.vehicle} />,
								});
							}}
						>
							Chi Tiết
						</Button>
					</div>
				);
			},
		},
		{
			title: "Giá",

			// specify the condition of filtering result
			// here is that finding the name started with `value`
			render: (text, trip) => {
				return <div> {trip.passenger.price} VNĐ</div>;
			},
			defaultSortOrder: "descend",
			sorter: (a, b) => a.passenger.price - b.passenger.price,
		},

		{
			title: "Trạng Thái",

			render: (text, trip) => {
				return (
					<Popover content={renderButtonStatus(trip)} title="Xác nhận trạng thái">
						{renderStatus(trip)}
					</Popover>
				);
			},
		},
		{
			title: "Giờ Bắt Đầu",
			dataIndex: "startTime",

			defaultSortOrder: "descend",
			sorter: (a, b) => {
				return a.startTime.localeCompare(b.startTime);
			},
			filters: arrFilterDate,
			onFilter: (value, record) => record.startTime.startsWith(value),
			filterSearch: true,
		},
		{
			title: "Giờ Kết Thúc",
			dataIndex: "endTime",

			defaultSortOrder: "descend",
			sorter: (a, b) => {
				return a.endTime.localeCompare(b.endTime);
			},
			filters: arrFilterDateEnd,
			onFilter: (value, record) => record.endTime.startsWith(value),
			filterSearch: true,
		},
		{
			title: "Chi Tiết Về Vé",

			render: (text, item) => {
				return (
					<Fragment>
						{/* { item.tripPassengerTicket.length } */}
						<Button
							type="primary"
							onClick={() => {
								dispatch({
									type: SET_MODAL,
									title: `Danh Sách Vé của nhà xe ${item.passenger.name} lúc ${item.startTime} đến ${tripDetail.from?.address}`,
									content: <AdminDetailTicket id={item.id} />,
									width: 1000,
								});
							}}
						>
							Chi Tiết Vé
						</Button>
					</Fragment>
				);
			},
		},
		{
			title: "Hành Động",

			render: (text, item) => {
				return (
					<Fragment>
						<div>
							<button
								className="mr-3"
								onClick={() => {
									dispatch({
										type: OPEN_DRAWER,
										title: "Cập Nhật Chuyến Xe",
										content: <EditTrip idTripPassenger={item.id} soVe={item} />,
									});
								}}
							>
								<EditOutlined />
							</button>
							<Popconfirm
								placement="topLeft"
								title={"Bạn có muốn xóa chuyến đi này"}
								onConfirm={() => {
									if (item.status != "cancel") {
										message.error("Bạn không được phép xóa chuyến đi này vì đang ở không ở trạng thái hủy");
									} else {
										dispatch(deleteTripPassengerAction(item));
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
				<Breadcrumb.Item>Trip</Breadcrumb.Item>
				<Breadcrumb.Item>TripPassenger</Breadcrumb.Item>
			</Breadcrumb>

			<div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
				<h1>
					Danh sách các chuyến đi từ {tripDetail.from?.province} - {tripDetail.from?.address} đến {tripDetail.to?.province} - {tripDetail.to?.address} từ ngày {moment(tripDetail?.startTime).format("DD-MM-YYYY")}
				</h1>

				<Table columns={columns} dataSource={listTripPassenger} />
			</div>
		</Content>
	);
}
