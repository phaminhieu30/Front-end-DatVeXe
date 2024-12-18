import React, {useEffect} from "react";
import {Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space, TimePicker, Tag} from "antd";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {getDetailTripPassengerAction, updateTripPassengerAction} from "../../redux/actions/tripAction";
import moment from "moment";
import _ from "lodash";
import {CLOSE_DRAWER} from "../../redux/types/DrawerTypes";
import {getDetailVehicleAction, UpdateVehicleAction} from "../../redux/actions/vehicleAction";
const {Option} = Select;

export default function EditVehicle(props) {
	const {id} = props;
	const dispatch = useDispatch();
	const {vehicleDetail} = useSelector((state) => state.vehicleReducer);
	useEffect(() => {
		dispatch(getDetailVehicleAction(id));
	}, [id]);
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: vehicleDetail.name,
			numberFloors: vehicleDetail.numberFloors,
			type: vehicleDetail.type,
			passenger: vehicleDetail.passengerCar?.name,
			numberSeat: vehicleDetail.seatVehicle?.length,
			description: vehicleDetail.description,
		},

		onSubmit: (values) => {
			console.log(values);
			let vehicleUpdate = {
				name: values.name,
				type: values.type,
				numberFloors: values.numberFloors,
				description: values.description,
			};
			dispatch(UpdateVehicleAction(vehicleDetail.id, vehicleUpdate));
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
	const handleChangeFile = (e) => {
		let file = e.target.files[0];

		formik.setFieldValue("file", file);
	};
	return (
		<Form layout="vertical" name="basic" autoComplete="off">
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Tên Xe">
						<Input placeholder="Please enter passenger name" name="name" onChange={handleChange("name")} value={formik.values.name} />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label="Số tầng">
						<Input style={{width: "100%"}} disabled name="numberVehicle" value={formik.values.numberFloors} />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Loại Xe">
						<Select placeholder="Please select type" value={formik.values.type} name="confirmType" onChange={handleChangeSelect("type")}>
							<Option value="normal">Xe Thường</Option>
							<Option value="limouse">Xe Vip Limouse</Option>
						</Select>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label="Nhà Xe">
						<Input style={{width: "100%"}} disabled value={formik.values.passenger} />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Số Ghế">
						<Input style={{width: "100%"}} type="number" placeholder="Số ghế" disabled value={formik.values.numberSeat} />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label="Số Tầng">
						<Input style={{width: "100%"}} type="number" placeholder="Số Tầng" value={formik.values.numberFloors} onChange={handleChange("numberFloors")} />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={24}>
					<Form.Item
						label="Mô Tả"
						rules={[
							{
								required: true,
								message: "please enter url description",
							},
						]}
					>
						<Input.TextArea rows={4} name="description" placeholder="please enter url description" value={formik.values.description} onChange={handleChange("description")} />
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
