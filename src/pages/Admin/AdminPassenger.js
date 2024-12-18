import React, {Fragment, useEffect} from "react";
import {Layout, Menu, Breadcrumb, Image, Table, Statistic, Button, Rate, Popconfirm} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {deletePassenger, getAllPassenger} from "../../redux/actions/passengerAction";
import _ from "lodash";
import {AudioOutlined, EditOutlined, SearchOutlined, DeleteOutlined, CalendarOutlined, FolderViewOutlined} from "@ant-design/icons";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import {SET_MODAL} from "../../redux/types/ModalTypes";
import DetailsVehicleOfPassengerCar from "../../components/Vehicle/DetailsVehicleOfPassengerCar";
import {OPEN_DRAWER} from "../../redux/types/DrawerTypes";

import EditPassenger from "../../components/Edit/EditPassenger";
import AddPassenger from "../../components/Add/AddPassenger";

const {Header, Content, Footer, Sider} = Layout;
export default function AdminPassenger() {
	const dispatch = useDispatch();
	const {listPassenger} = useSelector((state) => state.PassengerReducer);
	useEffect(() => {
		dispatch(getAllPassenger());
	}, []);
	let arrFilterName = listPassenger.map((item) => {
		return {value: item.name, text: item.name};
	});
	let arrFilterType = _.uniqBy(listPassenger, "confirmType").map((item) => {
		return {value: item.confirmType, text: item.confirmType};
	});
	const columns = [
		{
			title: "Tên Nhà Xe",
			dataIndex: "name",

			sorter: (a, b) => a.name.length - b.name.length,
			sortDirections: ["descend"],
			filters: arrFilterName,
			onFilter: (value, record) => record.name.startsWith(value),
			filterSearch: true,
		},
		{
			title: "Mô Tả",
			dataIndex: "description",
			onFilter: (value, record) => record.description.indexOf(value) === 0,
			sorter: (a, b) => a.description.length - b.description.length,
			sortDirections: ["descend"],
		},

		// {
		// 	title: "Loại Xác Nhận",
		// 	dataIndex: "confirmType",
		// 	filters: arrFilterType,
		// 	onFilter: (value, record) => record.confirmType.startsWith(value),
		// 	filterSearch: true,
		// },
		{
			title: "Hình Ảnh",
			render: (text, passenger) => {
				return (
					<div>
						<Image width={150} src={passenger.imageIntro} style={{borderRadius: "50%"}} />
					</div>
				);
			},
		},
		{
			title: "Số Xe Sở Hữu",
			render: (text, passenger) => {
				return (
					<div>
						<Statistic title="Số Xe" value={passenger.passengerCar.length} />
						<Button
							type="primary"
							onClick={() => {
								dispatch({
									type: SET_MODAL,
									title: `Danh sách xe của nhà xe ${passenger.name}`,
									content: <DetailsVehicleOfPassengerCar id={passenger.id} />,
									width: 800,
								});
							}}
						>
							Xem Chi Tiết
						</Button>
					</div>
				);
			},
			onFilter: (value, record) => record.passengerCar?.length.indexOf(value) === 0,
			sorter: (a, b) => a.passengerCar?.length - b.passengerCar?.length,
			sortDirections: ["descend"],
		},
		{
			title: "Đánh Giá",
			render: (text, passenger) => {
				let rate;
				if (passenger.passengerRate.length == 0) {
					rate = 0;
				} else {
					rate = _.meanBy(passenger.passengerRate, (rate) => rate.numberRate);
				}

				return <div>{<Rate disabled defaultValue={rate} style={{fontSize: 10}} />}</div>;
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
										title: "Cập nhật nhà xe",
										content: <EditPassenger id={item.id} />,
									});
								}}
							>
								<EditOutlined />
							</button>
							<Popconfirm
								placement="topLeft"
								title={"Bạn có muốn xóa nhà xe này"}
								onConfirm={() => {
									dispatch(deletePassenger(item.id));
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
				<Breadcrumb.Item>Passenger</Breadcrumb.Item>
			</Breadcrumb>
			<div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
				<h1>Danh sách các nhà xe</h1>
				<Button
					type="primary"
					className="mb-3"
					onClick={() => {
						dispatch({
							type: OPEN_DRAWER,
							title: "Thêm nhà xe",
							content: <AddPassenger />,
						});
					}}
				>
					<AddBusinessIcon className="mr-2" />
					Thêm Nhà Xe
				</Button>
				<Table columns={columns} dataSource={listPassenger} />
			</div>
		</Content>
	);
}
