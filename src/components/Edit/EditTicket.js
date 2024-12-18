import React, {useEffect} from "react";
import {Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space, TimePicker, Tag} from "antd";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {getDetailTripPassengerAction, updateTripPassengerAction} from "../../redux/actions/tripAction";
import moment from "moment";
import _ from "lodash";
import {getDetailTicket, updateTicket} from "../../redux/actions/ticketAction";
import {CLOSE_DRAWER} from "../../redux/types/DrawerTypes";
const {Option} = Select;

export default function EditTicket(props) {
	const {id} = props;
	const dispatch = useDispatch();
	const {detailTicket} = useSelector((state) => state.TicketReducer);
	console.log("file: EditTicket.js ~ line 15 ~ EditTicket ~ detailTicket", detailTicket);
	useEffect(() => {
		dispatch(getDetailTicket(id));
	}, [id]);
	console.log();
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			id: detailTicket?.id,
			status: detailTicket?.status,
			totalAmount: detailTicket?.totalAmount,
			note: detailTicket?.note,
			user: detailTicket?.user,
			tripPassengerTicket: detailTicket?.tripPassengerTicket,
			createdAt: detailTicket?.createdAt,
			ticketPointId: detailTicket?.ticketPointId,
			ticketSeatId: detailTicket?.ticketSeatId,
			pickUp: `${
				detailTicket?.ticketPointId?.find((obj) => {
					return obj.typePoint == "pickup";
				})?.timepointTicket?.time
			}-${
				detailTicket?.ticketPointId?.find((obj) => {
					return obj.typePoint == "pickup";
				})?.timepointTicket?.point?.name
			}`,
			pickUpId: detailTicket?.ticketPointId?.find((obj) => {
				return obj.typePoint == "pickup";
			})?.id,
			PointpickUpId: detailTicket?.ticketPointId?.find((obj) => {
				return obj.typePoint == "pickup";
			})?.timepointId,
			dropOff: `${
				detailTicket?.ticketPointId?.find((obj) => {
					return obj.typePoint == "dropoff";
				})?.timepointTicket?.time
			}-${
				detailTicket?.ticketPointId?.find((obj) => {
					return obj.typePoint == "dropoff";
				})?.timepointTicket?.point?.name
			}`,
			dropOffId: detailTicket?.ticketPointId?.find((obj) => {
				return obj.typePoint == "dropoff";
			})?.id,
			PointdropOffId: detailTicket?.ticketPointId?.find((obj) => {
				return obj.typePoint == "dropoff";
			})?.timepointId,
			numberPhone: detailTicket?.user?.numberPhone,
			name: detailTicket?.user?.name,
		},

		onSubmit: (values) => {
			let update = {
				status: values.status,
				totalAmount: values.totalAmount,
				note: values.note,
				numberPhone: values.numberPhone,
				name: values.name,
				userId: values.user.id,
				pickUpId: values.pickUpId,
				dropOffId: values.dropOffId,
				PointpickUpId: values.PointpickUpId,
				PointdropOffId: values.PointdropOffId,
			};
			console.log(update);
			dispatch(updateTicket(detailTicket.id, update));
			dispatch({type: CLOSE_DRAWER});
		},
	});

	const handleChange = (name) => {
		return (e) => {
			formik.setFieldValue(name, e.target.value);
		};
	};
	const handleChangeSelect = (name) => {
		return (value) => {
			formik.setFieldValue(name, value);
		};
	};
	const handleChangeSelectPoint = (setname, setid) => {
		return (value) => {
			formik.setFieldValue(setname, value);
			formik.setFieldValue(setid, value);
		};
	};
	const renderSeat = (ticket) => {
		return ticket?.ticketSeatId?.map((item, index) => {
			return `${item?.seatofticket?.name},tầng ${item?.seatofticket?.floor}`;
		});
	};
	return (
		<Form layout="vertical" name="basic" autoComplete="off">
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Số Vé">
						<Input name="id" disabled value={`Số vé ${formik.values?.id}`} />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label="Ngày đặt">
						<Input style={{width: "100%"}} disabled name="createdAt" value={moment(formik.values.createdAt).format("DD-MM-YYYY h:mm:ss")} />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Điểm Đón">
						<Select
							placeholder="Please select point"
							value={formik.values?.pickUp}
							name="pickUpId"
							onChange={handleChangeSelectPoint("pickUp", "PointpickUpId")}
							options={formik.values.tripPassengerTicket?.tripTimePoint
								?.filter((item) => item.type == "pickup")
								.map((item, index) => {
									return {label: `${item.time}-${item.point.name} - (${item.point.address})`, value: item.id};
								})}
						>
							{/* <Option value="normal">Xe Thường</Option>
							<Option value="limouse">Xe Vip Limouse</Option> */}
						</Select>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label="Điểm Trả">
						<Select
							placeholder="Please select point"
							value={formik.values?.dropOff}
							name="dropOffId"
							onChange={handleChangeSelectPoint("dropOff", "PointdropOffId")}
							options={formik.values.tripPassengerTicket?.tripTimePoint
								?.filter((item) => item.type == "dropoff")
								.map((item, index) => {
									return {label: `${item.time}-${item.point.name} - (${item.point.address})`, value: item.id};
								})}
						></Select>
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Người Đặt">
						<Input style={{width: "100%"}} name="user" placeholder="tên" onChange={handleChange("name")} value={formik.values.name} />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label="Số Điện Thoại">
						<Input style={{width: "100%"}} name="numberPhone" onChange={handleChange("numberPhone")} placeholder="Số Tầng" value={formik.values.numberPhone} />
					</Form.Item>

					<Form.Item label="Tổng Tiền">
						<Input style={{width: "100%"}} name="totalAmount" onChange={handleChange("totalAmount")} value={formik.values.totalAmount} />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Trạng thái">
						<Select style={{width: "100%"}} onChange={handleChangeSelect("status")} value={formik.values.status}>
							<Option value="pending">Pending</Option>
							<Option value="confirm">Confirm</Option>
							<Option value="cancel">Cancel</Option>
						</Select>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label="Ghế Đặt">
						<Select mode="multiple" style={{width: "100%"}} disabled value={renderSeat(detailTicket)}></Select>
					</Form.Item>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={24}>
					<Form.Item
						label="Ghi Chú"
						rules={[
							{
								required: true,
								message: "please enter url description",
							},
						]}
					>
						<Input.TextArea rows={4} name="note" placeholder="please enter note" value={formik.values.note} onChange={handleChange("note")} />
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
