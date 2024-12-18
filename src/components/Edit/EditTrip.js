import React, {useEffect} from "react";
import {Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space, TimePicker, Tag} from "antd";
import {PlusOutlined, AudioOutlined, EditOutlined, SearchOutlined, DeleteOutlined, CalendarOutlined, FolderViewOutlined, CheckCircleOutlined, SyncOutlined, CloseCircleOutlined, ExclamationCircleOutlined, ClockCircleOutlined, MinusCircleOutlined} from "@ant-design/icons";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {getDetailTripPassengerAction, updateTripPassengerAction} from "../../redux/actions/tripAction";
import moment from "moment";
import {updatePassengerAction} from "../../redux/actions/passengerAction";
import {CLOSE_DRAWER} from "../../redux/types/DrawerTypes";
const {Option} = Select;

export default function EditTrip(props) {
	const dispatch = useDispatch();
	const {tripPassengerDetail} = useSelector((state) => state.TripReducer);
	console.log(tripPassengerDetail);
	useEffect(() => {
		dispatch(getDetailTripPassengerAction(props.idTripPassenger));
	}, [props.idTripPassenger]);
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			tripId: tripPassengerDetail.tripId,
			passengerId: tripPassengerDetail.passengerId,
			status: tripPassengerDetail.status,
			price: tripPassengerDetail.passenger?.price,
			startTime: tripPassengerDetail.startTime,
			endTime: tripPassengerDetail.endTime,
			vehicleId: tripPassengerDetail.vehicleId,
			passengerName: tripPassengerDetail.passenger?.name,
			vehicleName: tripPassengerDetail.vehicle?.name,
			description: tripPassengerDetail.passenger?.description,
			soVe: tripPassengerDetail.tripPassengerTicket?.length,
		},

		onSubmit: (values) => {
			let tripPassengerUpdate = {
				tripId: values.tripId,
				status: values.status,
				passengerId: values.passengerId,
				startTime: values.startTime,
				endTime: values.endTime,
				vehicleId: values.vehicleId,
			};
			let passengerUpdate = {...tripPassengerDetail.passenger, price: values.price};
			dispatch(updateTripPassengerAction(tripPassengerUpdate, tripPassengerDetail.id));
			dispatch(updatePassengerAction(passengerUpdate, tripPassengerDetail.passengerId));
			dispatch({type: CLOSE_DRAWER});
		},
	});
	const changeOption = (value) => {
		formik.setFieldValue("status", value);
	};
	const changeTime = (name) => {
		return (value) => {
			formik.setFieldValue(name, moment(value).format("HH:mm:ss"));
		};
	};
	return (
		<Form layout="vertical" name="basic" autoComplete="off">
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Nhà Xe">
						<Input placeholder="Please enter passenger name" value={formik.values.passengerName} name="passengerName" onChange={(e) => formik.setFieldValue("passengerName", e.target.value)} disabled />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label="Xe">
						<Input style={{width: "100%"}} name="vehicleName" placeholder="Please enter vehicle" disabled value={formik.values.vehicleName} onChange={(e) => formik.setFieldValue("vehicleName", e.target.value)} />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Trạng Thái">
						<Select placeholder="Please select status" value={formik.values.status} onChange={changeOption}>
							<Option value="depart">
								<Tag icon={<ClockCircleOutlined spin />} color="default">
									Sắp xuất phát
								</Tag>
							</Option>
							<Option value="progress">
								<Tag icon={<SyncOutlined spin />} color="processing">
									Đang Chạy
								</Tag>
							</Option>
							<Option value="cancel">
								<Tag icon={<CloseCircleOutlined />} color="error">
									Đã Hủy
								</Tag>
							</Option>
							<Option value="success">
								<Tag icon={<CheckCircleOutlined />} color="success">
									Hoàn Thành
								</Tag>
							</Option>
						</Select>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label="Giá Tiền">
						<Input style={{width: "100%"}} type="number" name="price" placeholder="Giá tiền" value={formik.values.price} onChange={(e) => formik.setFieldValue("price", e.target.value)} />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Số Vé" rules={[{required: true, message: "Please choose the approver"}]}>
						<Input style={{width: "100%"}} type="number" placeholder="Số Vé" disabled value={formik.values.soVe} />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label="Thời Gian">
						<TimePicker style={{width: "50%"}} name="startTime" value={moment(formik.values.startTime, "HH:mm:ss")} onChange={changeTime("startTime")} />
						<TimePicker style={{width: "50%"}} name="endTime" value={moment(formik.values.endTime, "HH:mm:ss")} onChange={changeTime("endTime")} />
						{/* <DatePicker.RangePicker style={{width: "100%"}} getPopupContainer={(trigger) => trigger.parentElement} /> */}
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={24}>
					<Form.Item
						label="Description"
						rules={[
							{
								required: true,
								message: "please enter url description",
							},
						]}
					>
						<Input.TextArea rows={4} name="description" placeholder="please enter url description" value={formik.values.description} />
					</Form.Item>
				</Col>
			</Row>
			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					onClick={() => {
						formik.handleSubmit();
					}}
				>
					Cập Nhật
				</Button>
			</Form.Item>
		</Form>
	);
}
