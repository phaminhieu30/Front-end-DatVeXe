import React, {Fragment, useEffect} from "react";
import {Layout, Menu, Breadcrumb, Image, Table, Statistic, Button, Rate, Popconfirm} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {AudioOutlined, EditOutlined, SearchOutlined, DeleteOutlined, CalendarOutlined, FolderViewOutlined, CarOutlined} from "@ant-design/icons";
import {OPEN_DRAWER} from "../../redux/types/DrawerTypes";

import DirectionsRailwayFilledIcon from "@mui/icons-material/DirectionsRailwayFilled";
import {getListStationAction, deleteStationAction} from "../../redux/actions/stationAction";
import EditStation from "../../components/Edit/EditStation";
import {SET_MODAL} from "../../redux/types/ModalTypes";
import PointStation from "../../components/PointStation.js/PointStation";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AddStation from "../../components/Add/AddStation";
const {Header, Content, Footer, Sider} = Layout;

export default function AdminStation() {
	const dispatch = useDispatch();
	const {listStation} = useSelector((state) => state.StationReducer);
	console.log("file: AdminStation.js ~ line 10 ~ AdminStation ~ listStation", listStation);

	useEffect(() => {
		dispatch(getListStationAction());
	}, []);
	const columns = [
		{
			title: "Tên",
			dataIndex: "name",
			onFilter: (value, record) => record.name.indexOf(value) === 0,
			sorter: (a, b) => a.name?.length - b.name?.length,
			sortDirections: ["descend"],
		},
		{
			title: "Địa chỉ",
			dataIndex: "address",
			onFilter: (value, record) => record.address.indexOf(value) === 0,
			sorter: (a, b) => a.address?.length - b.address?.length,
			sortDirections: ["descend"],
		},
		{
			title: "Thành phố / Tỉnh",
			dataIndex: "province",
			onFilter: (value, record) => record.address.indexOf(value) === 0,
			sorter: (a, b) => a.address?.length - b.address?.length,
			sortDirections: ["descend"],
		},
		{
			title: "Các điểm đón / trả",
			render: (text, station) => {
				return (
					<div className="flex items-center">
						<Button
							type="primary"
							onClick={() => {
								dispatch({
									type: SET_MODAL,
									title: `Điểm đón / trả của bến xe ${station.name}`,
									content: <PointStation id={station.id} />,
									width: 900,
								});
							}}
						>
							<DirectionsRailwayFilledIcon />
							<span>Điểm Đón / Trả</span>
						</Button>
					</div>
				);
			},
		},
		{
			title: "Action",
			render: (text, item) => {
				return (
					<Fragment>
						<div className="flex justify-between">
							<button
								className="mr-3"
								onClick={() => {
									dispatch({
										type: OPEN_DRAWER,
										title: "Cập nhật Bến Xe",
										content: <EditStation id={item.id} />,
									});
								}}
							>
								<EditOutlined />
							</button>
							<Popconfirm
								placement="topLeft"
								title={"Bạn có muốn xóa  xe này"}
								onConfirm={() => {
									dispatch(deleteStationAction(item.id));
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
				<Breadcrumb.Item>Station</Breadcrumb.Item>
			</Breadcrumb>
			<div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
				<h1>Danh sách bến xe</h1>
				<Button
					type="primary"
					className="mb-3"
					onClick={() => {
						dispatch({
							type: OPEN_DRAWER,
							title: "Thêm Bến Xe",
							content: <AddStation />,
						});
					}}
				>
					<AddBusinessIcon className="mr-2" />
					Thêm Bến Xe
				</Button>
				<Table columns={columns} dataSource={listStation} />
			</div>
		</Content>
	);
}
