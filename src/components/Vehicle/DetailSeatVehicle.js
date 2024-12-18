import React, {useEffect, useState} from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {useDispatch, useSelector} from "react-redux";
import {MinusCircleOutlined, PlusOutlined, FormOutlined, DeleteOutlined} from "@ant-design/icons";
import {Form, Input, Button, Space, Select, message, Popover, Checkbox, Popconfirm} from "antd";
import {useFormik} from "formik";
import * as Yup from "yup";
import Tooltip from "@mui/material/Tooltip";
import {bookingSeatAction, bookingTicketAction} from "../../redux/actions/bookingAction";
import Wheel from "../Booking/Seat/Wheel";
import Seat from "../Booking/Seat/Seat";
import SeatBooked from "../Booking/Seat/SeatBooked";
import SeatSelect from "../Booking/Seat/SeatSelect";
import "../../Sass/css/Vehicle.css";
import {getDetailVehicleAction} from "../../redux/actions/vehicleAction";
import {CreateSeatVehicleAction, DeleteSeatAction, getSeatDetailAction} from "../../redux/actions/SeatAction";
import {SET_MODAL} from "../../redux/types/ModalTypes";
import {OPEN_DRAWER} from "../../redux/types/DrawerTypes";
import EditSeat from "../Edit/EditSeat";
const {Option} = Select;

export default function DetailSeatVehicle(props) {
	const dispatch = useDispatch();
	const {listSeatSelected} = useSelector((state) => state.BookingReducer);
	const {vehicleDetail, seatDetail} = useSelector((state) => state.vehicleReducer);

	useEffect(() => {
		dispatch(getDetailVehicleAction(props.id));
	}, [props.id]);
	const renderSeat = (floors) => {
		return vehicleDetail.seatVehicle.map((item, index) => {
			let classDaDat = item.status === "đã đặt" ? "gheDaChon" : "";
			let classDangDat = "";
			let indexSeatSelect = listSeatSelected.findIndex((seatSelect) => seatSelect.id == item.id);
			if (indexSeatSelect != -1) {
				classDangDat = "GheDangChon";
			}
			let disabled = item.status === "đã đặt" ? true : false;
			let arrClass = [classDaDat, classDangDat];
			const text = <span>Title</span>;
			const content = (
				<div className="flex justify-center">
					<Button
						type="primary"
						onClick={() => {
							dispatch({
								type: OPEN_DRAWER,
								title: `Cập Nhật Cho Ghế ${item.name} , Giá ${item.price}`,
								content: <EditSeat id={item.id} />,
								width: 300,
							});
						}}
					>
						<FormOutlined />
					</Button>
					<Popconfirm
						placement="topRight"
						title={"Bạn có muốn xóa ghế này"}
						onConfirm={() => {
							dispatch(DeleteSeatAction(item.id, vehicleDetail.id));
						}}
						okText="Yes"
						cancelText="No"
					>
						<Button className="bg-red-600 ml-5" style={{backgroundColor: "red"}}>
							<DeleteOutlined className="text-red-600" />
						</Button>
					</Popconfirm>
				</div>
			);
			if (item.floor === floors) {
				return (
					<Popover title={`Ghế: ${item.name}, Giá: ${item.price.toLocaleString()} VNĐ`} content={content} placement="top">
						<button className="seat" style={{border: "none"}} key={index} disabled={disabled}>
							<div className="seat-container">
								<Seat arrClass={arrClass} />
							</div>
						</button>
					</Popover>
				);
			}
		});
	};
	const renderFloor = () => {
		let arr = [];
		for (let index = 1; index <= vehicleDetail.numberFloors; index++) {
			arr.push(
				<div class="coach-container">
					<span>Tầng {index}</span>
					<div className="coach">
						<table>
							<tbody>
								<tr className="coach-row">
									<td className="seat">
										<div className="seat-container" data-disabled="true" disabled>
											<Wheel />
										</div>
									</td>
								</tr>
								<div className="coach-row">{renderSeat(index)}</div>
							</tbody>
						</table>
					</div>
				</div>
			);
		}
		return arr;
	};
	const [form] = Form.useForm();

	const onFinish = (values) => {
		console.log("Received values of form:", values);
		let listSeat = values.ListSeatAdd;
		if (vehicleDetail.seatVehicle.length <= 40) {
			let filterFloor1 = vehicleDetail.seatVehicle.filter((item) => item.floor == 1).length;
			let seatFloor2 = vehicleDetail.seatVehicle.length - filterFloor1;
			try {
				if (filterFloor1 >= 20) {
					if (seatFloor2 >= 20) {
						message.error("thêm ghế xe thất bại");
					} else {
						dispatch(CreateSeatVehicleAction(vehicleDetail.id, listSeat));
					}
				} else {
					dispatch(CreateSeatVehicleAction(vehicleDetail.id, listSeat));
				}
			} catch (error) {}
		} else {
			message.error("thêm ghế xe thất bại");
		}
		//
	};

	const handleChange = () => {
		form.setFieldsValue({sights: []});
	};
	return (
		<>
			<div className="flex justify-center items-center">
				<div className="list-seat flex" style={{width: "80%"}}>
					<div className="seat-groups">
						<div className="note font-bold" style={{fontSize: "14px"}}>
							Chú thích
						</div>
						<div className="seat-info">
							<div className="seat-thumbnail">
								<Seat />
							</div>
							<span className="seat-name">Còn trống</span>
						</div>
						<div className="seat-info">
							<div className="seat-thumbnail" disabled>
								<SeatBooked />
							</div>
							<span className="seat-name">Ghế đã được đặt</span>
						</div>
						<div />
					</div>
					<div className="seat-template flex justify-center items-center">{renderFloor()}</div>
				</div>
			</div>
			<div style={{margin: "30px auto", width: "60%"}}>
				<h3>Thêm ghế cho xe</h3>
				<Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
					<Form.List name="ListSeatAdd">
						{(fields, {add, remove}) => (
							<>
								{fields.map(({key, name, ...restField}) => (
									<Space key={key} style={{display: "flex", marginBottom: 8}} align="baseline">
										<Form.Item {...restField} name={[name, "name"]} rules={[{required: true, message: "Missing seats name"}]}>
											<Input placeholder="Tên Ghế" />
										</Form.Item>
										<Form.Item {...restField} name={[name, "price"]} rules={[{required: true, message: "Missing price"}]}>
											<Input placeholder="Giá Ghế" type="number" min={50000} />
										</Form.Item>
										<Form.Item {...restField} name={[name, "floor"]} rules={[{required: true, message: "Missing floor"}]}>
											<Select placeholder="Tầng" style={{width: 130}}>
												<Option key={"1"} value={1}>
													Tầng 1
												</Option>
												<Option key={"2"} value={2}>
													Tầng 2
												</Option>
											</Select>
										</Form.Item>
										<Form.Item {...restField} name={[name, "type"]} rules={[{required: true, message: "Missing type"}]}>
											<Select placeholder="Loại Ghế" style={{width: 130}}>
												<Option key={"bed"} value={"bed"}>
													Ghế Giường Nằm
												</Option>
												<Option key={"seat"} value={"seat"}>
													Ghế Thường
												</Option>
											</Select>
										</Form.Item>
										<MinusCircleOutlined onClick={() => remove(name)} />
									</Space>
								))}
								<Form.Item>
									<Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
										Thêm
									</Button>
								</Form.Item>
							</>
						)}
					</Form.List>
					<Form.Item className="text-center">
						<Button type="primary" htmlType="submit">
							Thêm Ghế
						</Button>
					</Form.Item>
				</Form>
			</div>
		</>
	);
}
