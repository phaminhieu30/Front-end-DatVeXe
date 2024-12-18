import React, {Fragment, useEffect} from "react";
import {Layout, Menu, Breadcrumb, Table, Input, Space, Popconfirm, Tag, Divider, Button, message} from "antd";
import {useDispatch, useSelector} from "react-redux";

import {AudioOutlined, EditOutlined, SearchOutlined, DeleteOutlined, CalendarOutlined, FolderViewOutlined, CheckCircleOutlined, SyncOutlined, CloseCircleOutlined, ExclamationCircleOutlined, ClockCircleOutlined, MinusCircleOutlined, AreaChartOutlined, PieChartOutlined} from "@ant-design/icons";
import moment from "moment";
import {getAllTripPassengerAction} from "../../../redux/actions/tripAction";
import {getAllPassenger} from "../../../redux/actions/passengerAction";
import {Content} from "antd/lib/layout/layout";
import {SET_MODAL} from "../../../redux/types/ModalTypes";
import ChartTurnOver from "../../../components/Chart/ChartTurnOver";
import ChartTicket from "../../../components/Chart/ChartTicket";
import ChartVehicle from "../../../components/Chart/ChartVehicle";

export default function AdminTurnOver(props) {
	const dispatch = useDispatch();

	const {listPassenger} = useSelector((state) => state.PassengerReducer);
	console.log("file: AdminTurnOver.js ~ line 14 ~ AdminTurnOver ~ listTripPassenger", listPassenger);
	useEffect(() => {
		dispatch(getAllPassenger());
	}, []);
	const renderTotalAmountTicket = (passenger) => {
		let total = 0;
		passenger.passenger.forEach((item) => {
			total += item.tripPassengerTicket.reduce((amount, ticket) => {
				return amount + ticket.totalAmount;
			}, 0);
		});
		return total;
	};
	const renderNumberTicket = (passenger) => {
		let lengthTotal = 0;
		passenger?.passenger?.forEach((item) => {
			lengthTotal += item.tripPassengerTicket.length;
		});
		return lengthTotal;
	};
	const columns = [
		{
			title: "Tên Nhà Xe",
			render: (text, passenger) => {
				return (
					<div>
						{passenger?.name} ({passenger?.description}){" "}
					</div>
				);
			},
		},
		{
			title: "Số Chuyến đi",
			render: (text, passenger) => {
				return (
					<div>
						{passenger?.passenger.length}
						<button
							className="ml-3"
							onClick={() => {
								dispatch({
									type: SET_MODAL,
									title: `Thống Kê Về Chuyến đi ${passenger.name}`,
									content: <ChartTicket id={passenger.id} />,
									width: 1000,
								});
							}}
						>
							<AreaChartOutlined style={{fontSize: 20, cursor: "pointer", color: "blue"}} />
						</button>
					</div>
				);
			},
			onFilter: (value, record) => record.description.indexOf(value) === 0,
			sorter: (a, b) => a.passenger.length - b.passenger.length,
			sortDirections: ["descend"],
		},
		{
			title: "Số Xe Sở Hữu",
			render: (text, passenger) => {
				return (
					<div>
						{passenger?.passengerCar.length}
						<button
							className="ml-3"
							onClick={() => {
								dispatch({
									type: SET_MODAL,
									title: `Thống Kê Loại  Xe ${passenger.name}`,
									content: <ChartVehicle id={passenger.id} />,
									width: 1000,
								});
							}}
						>
							<AreaChartOutlined style={{fontSize: 20, cursor: "pointer", color: "blue"}} />
						</button>
					</div>
				);
			},
			onFilter: (value, record) => record.description.indexOf(value) === 0,
			sorter: (a, b) => a.passengerCar.length - b.passengerCar.length,
			sortDirections: ["descend"],
		},
		{
			title: "Số vé đặt được",
			render: (text, passenger) => {
				return (
					<div>
						{renderNumberTicket(passenger)}
						<button
							className="ml-3"
							onClick={() => {
								dispatch({
									type: SET_MODAL,
									title: `Thống Kê Doanh Thu ${passenger.name}`,
									content: <ChartTicket id={passenger.id} />,
									width: 1000,
								});
							}}
						>
							<PieChartOutlined style={{fontSize: 20, cursor: "pointer", color: "blue"}} />
						</button>
					</div>
				);
			},
			onFilter: (value, record) => record.description.indexOf(value) === 0,
			sorter: (a, b) => a.description.length - b.description.length,
			sortDirections: ["descend"],
		},
		{
			title: "Doanh Thu",
			render: (text, passenger) => {
				return (
					<div>
						{renderTotalAmountTicket(passenger).toLocaleString()} VNĐ
						<button
							className="ml-3"
							onClick={() => {
								dispatch({
									type: SET_MODAL,
									title: `Thống Kê Doanh Thu ${passenger.name}`,
									content: <ChartTurnOver id={passenger.id} />,
									width: 1000,
								});
							}}
						>
							<AreaChartOutlined style={{fontSize: 20, cursor: "pointer", color: "blue"}} />
						</button>
					</div>
				);
			},
			onFilter: (value, record) => record.description.indexOf(value) === 0,
			sorter: (a, b) => a.description.length - b.description.length,
			sortDirections: ["descend"],
		},
	];
	return (
		<Content style={{margin: "0 16px"}}>
			<Breadcrumb style={{margin: "16px 0"}}>
				<Breadcrumb.Item>Admin</Breadcrumb.Item>
				<Breadcrumb.Item>TurnOver</Breadcrumb.Item>
			</Breadcrumb>
			<div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
				<h1>Thống Kê</h1>
				<Table columns={columns} dataSource={listPassenger} />
			</div>
		</Content>
	);
}
