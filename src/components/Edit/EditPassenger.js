import React, {useEffect} from "react";
import {Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space, TimePicker, Tag} from "antd";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {getDetailTripPassengerAction, updateTripPassengerAction} from "../../redux/actions/tripAction";
import moment from "moment";
import _ from "lodash";
import {getDetailPassenger, updateImagePassengerAction, updatePassengerAction} from "../../redux/actions/passengerAction";
import {CLOSE_DRAWER} from "../../redux/types/DrawerTypes";
const {Option} = Select;

export default function EditPassenger(props) {
	const {id} = props;
	const dispatch = useDispatch();
	const {passengerDetail} = useSelector((state) => state.PassengerReducer);

	useEffect(() => {
		dispatch(getDetailPassenger(id));
	}, [id]);
	const rateAvg = (rateArr) => {
		let rate;
		if (rateArr.passengerRate?.length == 0) {
			rate = 0;
		} else {
			rate = _.meanBy(rateArr.passengerRate, (rate) => rate.numberRate);
		}
		return rate;
	};
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: passengerDetail.name,
			confirmType: passengerDetail.confirmType,
			price: passengerDetail.price,
			imageIntro: passengerDetail.imageIntro,
			description: passengerDetail.description,
			numberVehicle: passengerDetail.passengerCar?.length,
			rate: rateAvg(passengerDetail),
			file: "",
		},

		onSubmit: (values) => {
			let passengerUpdate = {
				name: values.name,
				confirmType: values.confirmType,
				price: values.price,
				description: values.description,
			};
			var bodyFormData = new FormData();
			bodyFormData.append("passenger", values.file);
			console.log(bodyFormData);
			dispatch(updatePassengerAction(passengerUpdate, passengerDetail.id));
			dispatch(updateImagePassengerAction(passengerDetail.id, bodyFormData));
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
					<Form.Item label="Tên Nhà Xe">
						<Input placeholder="Please enter passenger name" name="name" onChange={handleChange("name")} value={formik.values.name} />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label="Số Xe">
						<Input style={{width: "100%"}} disabled name="numberVehicle" value={formik.values.numberVehicle} />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Loại Xác Nhận">
						<Select placeholder="Please select type" value={formik.values.confirmType} name="confirmType" onChange={handleChangeSelect("confirmType")}>
							<Option value="Xác nhận tức thì">Xác Nhận Tức Thì</Option>
							<Option value="Xác Nhận Qua Điện Thoại">Xác Nhận Qua Điện Thoại</Option>
						</Select>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label="Hình Ảnh">
						<Input style={{width: "100%"}} type="file" onChange={handleChangeFile} />
						<img src={formik.values.imageIntro} alt="123" width={75} height={75} />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Đánh Giá">
						<Input style={{width: "100%"}} type="number" placeholder="Đánh Giá" disabled value={formik.values.rate} />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label="Giá">
						<Input style={{width: "100%"}} type="number" placeholder="Giá" value={formik.values.price} onChange={handleChange("price")} />
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
