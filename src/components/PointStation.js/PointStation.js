import React, {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {Button, Collapse, Popconfirm} from "antd";
import {AudioOutlined, EditOutlined, SearchOutlined, DeleteOutlined, CalendarOutlined, FolderViewOutlined, CarOutlined, SettingOutlined} from "@ant-design/icons";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import {deletePointAction, getAllPointByStationAction} from "../../redux/actions/pointAction";
import {OPEN_DRAWER} from "../../redux/types/DrawerTypes";
import EditPoint from "../Edit/EditPoint";
import {getDetailStationAction} from "../../redux/actions/stationAction";
import AddPoint from "../Add/AddPoint";
import {SET_MODAL} from "../../redux/types/ModalTypes";
import MapPoint from "../Map/MapPoint";

const {Panel} = Collapse;
export default function PointStation(props) {
	const dispatch = useDispatch();
	const {listPoint} = useSelector((state) => state.PointReducer);
	const {stationDetail} = useSelector((state) => state.StationReducer);
	useEffect(() => {
		dispatch(getAllPointByStationAction(props.id));
		dispatch(getDetailStationAction(props.id));
	}, [props.id]);
	const genExtra = () => (
		<SettingOutlined
			onClick={(event) => {
				// If you don't want click extra trigger collapse, you can prevent this:
				event.stopPropagation();
			}}
		/>
	);
	const renderPanel = () => {
		return listPoint.map((item, index) => {
			return (
				<Panel header={item.name} key={index + 1} extra={genExtra()}>
					<div className="flex justify-around items-center">
						<p>
							<span className="font-bold">Địa chỉ</span> : <span>{item.address}</span>
						</p>

						<div className="flex items-center justify-between">
							<Button
								type="primary"
								className="mr-3"
								onClick={() => {
									dispatch({
										type: OPEN_DRAWER,
										title: `Cập nhật Điểm đón/dừng của bến xe ${item.name}`,
										content: <EditPoint id={item.id} />,
									});
								}}
							>
								Sửa
							</Button>
							<Popconfirm
								placement="topLeft"
								title={"Bạn có muốn xóa điểm này"}
								onConfirm={() => {
									dispatch(deletePointAction(item.id, item.stationId));
								}}
								okText="Yes"
								cancelText="No"
							>
								<Button type="danger">Xóa</Button>
							</Popconfirm>
							{/* <Button
								className="ml-3"
								onClick={() => {
									dispatch({
										type: OPEN_DRAWER,
										title: `Map Điểm đón/dừng của bến xe ${item.name}`,
										width: 1000,
										content: <MapPoint id={item.id} item={item} />,
									});
								}}
							>
								Xem Map
							</Button> */}
						</div>
					</div>
				</Panel>
			);
		});
	};

	return (
		<>
			<Collapse defaultActiveKey={["1"]} expandIconPosition={"right"}>
				{renderPanel()}
			</Collapse>
			<div className="text-center my-4">
				<Button
					style={{borderRadius: "50%"}}
					onClick={() => {
						dispatch({
							type: OPEN_DRAWER,
							title: `Thêm Điểm đón/dừng của bến xe`,
							content: <AddPoint stationId={stationDetail.id} />,
						});
					}}
				>
					<AddLocationAltIcon />
				</Button>
			</div>
		</>
	);
}
