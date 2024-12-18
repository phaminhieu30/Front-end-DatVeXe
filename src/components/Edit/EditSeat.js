import React, {useEffect, useState} from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {useDispatch, useSelector} from "react-redux";
import {MinusCircleOutlined, PlusOutlined, FormOutlined, DeleteOutlined} from "@ant-design/icons";
import {Form, Input, Button, Space, Select, message, Popover, Checkbox} from "antd";
import {useFormik} from "formik";
import * as Yup from "yup";
import {getSeatDetailAction, UpdateSeatAction} from "../../redux/actions/SeatAction";
import {CLOSE_DRAWER} from "../../redux/types/DrawerTypes";
const {Option} = Select;
export default function EditSeat(props) {
	const dispatch = useDispatch();
	const {vehicleDetail, seatDetail} = useSelector((state) => state.vehicleReducer);
	useEffect(() => {
		dispatch(getSeatDetailAction(props.id));
	}, [props.id]);
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: seatDetail.name,
			status: seatDetail.status,
			floor: seatDetail.floor,
			price: seatDetail.price,
			type: seatDetail.type,
		},

		onSubmit: (values) => {
			dispatch(UpdateSeatAction(seatDetail.id, values, vehicleDetail.id));
			dispatch({
				type: CLOSE_DRAWER,
			});
		},
	});
	const handleChangeForm = (name) => {
		return (e) => {
			formik.setFieldValue(name, e.target.value);
		};
	};
	const handleChangeSelect = (name) => {
		return (value) => {
			formik.setFieldValue(name, value);
		};
	};
	return (
		<Form name="basic" initialValues={{remember: true}} requiredMark={false} autoComplete="off">
			<Form.Item label="Ghế" rules={[{required: true, message: "Please input your name!"}]}>
				<Input name="name" onChange={handleChangeForm("name")} value={formik.values.name} />
			</Form.Item>
			<Form.Item label="Giá" rules={[{required: true, message: "Please input your price!"}]}>
				<Input onChange={handleChangeForm("price")} value={formik.values.price} />
			</Form.Item>
			<Form.Item rules={[{required: true, message: "Missing type"}]} label={"Loại Ghế"}>
				<Select placeholder="Loại" style={{width: 130}} onChange={handleChangeSelect("type")} value={formik.values.type}>
					<Option key={"1"} value={"bed"}>
						Giường nằm
					</Option>
					<Option key={"2"} value={"seat"}>
						Ghế thường
					</Option>
				</Select>
			</Form.Item>
			<Form.Item rules={[{required: true, message: "Missing floor"}]} label={"Trạng Thái"}>
				<Select placeholder="Trạng thái" style={{width: 130}} disabled={formik.values.status == "đã đặt" ? true : false} onChange={handleChangeSelect("status")} value={formik.values.status}>
					<Option key={"1"} value={"đã đặt"}>
						đã đặt
					</Option>
					<Option key={"2"} value={"chưa đặt"}>
						chưa đặt
					</Option>
				</Select>
			</Form.Item>
			<Form.Item rules={[{required: true, message: "Missing floor"}]} label={"Tầng"}>
				<Select placeholder="Tầng" style={{width: 130}} onChange={handleChangeSelect("floor")} value={formik.values.floor}>
					<Option key={"1"} value={1}>
						Tầng 1
					</Option>
					<Option key={"2"} value={2}>
						Tầng 2
					</Option>
				</Select>
			</Form.Item>
			<Form.Item wrapperCol={{offset: 8, span: 16}}>
				<Button
					type="primary"
					htmlType="submit"
					onClick={() => {
						formik.handleSubmit();
					}}
				>
					Cập Nhật Ghế
				</Button>
			</Form.Item>
		</Form>
	);
}
