import React, {useEffect} from "react";
import {Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space, TimePicker, Tag} from "antd";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {getDetailTripPassengerAction, updateTripPassengerAction} from "../../redux/actions/tripAction";
import moment from "moment";
import _ from "lodash";
import {CLOSE_DRAWER} from "../../redux/types/DrawerTypes";
import {registerAction} from "../../redux/actions/UserAction";
const {Option} = Select;

export default function AddUser(props) {
	const dispatch = useDispatch();
	const SignupSchema = Yup.object().shape({
		email: Yup.string().min(2, "Email quá ngắn!").max(50, "Password quá dài!").email("Email không hợp lệ").required("Vui lòng nhập email"),
		name: Yup.string().min(2, "tên quá ngắn!").max(50, "tên quá dài!").required("Vui lòng nhập email"),
		passWord: Yup.string().min(2, "Password quá ngắn!").max(50, "Password quá dài!").required("Vui lòng nhập password"),
		phone: Yup.string()
			.required("Không được bỏ trống số điện thoại")
			.matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "Số điện thoại không hợp lệ"),
		confirmPassword: Yup.string().oneOf([Yup.ref("passWord"), null], "Mật khẩu không trùng"),
	});
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: "",
			phone: "",
			email: "",
			passWord: "",
			confirmPassword: "",
			type: "",
		},
		validationSchema: SignupSchema,
		onSubmit: (values) => {
			console.log(values);
			let user = {
				name: values.name,
				email: values.email,
				password: values.passWord,
				numberPhone: values.phone,
				type: values.type,
			};
			dispatch(registerAction(user));
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
					<Form.Item label="Tên">
						<Input placeholder="Please enter name" name="name" onChange={handleChange("name")} />
						<p className="text-red-500 text-xs italic mb-0">{formik.errors.name}</p>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label="Email">
						<Input style={{width: "100%"}} name="email" onChange={handleChange("email")} />
						<p className="text-red-500 text-xs italic mb-0">{formik.errors.email}</p>
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Quyền">
						<Select placeholder="Please select type" name="type" onChange={handleChangeSelect("type")}>
							<Option value="ADMIN">Admin</Option>
							<Option value="CLIENT">Client</Option>
						</Select>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label="Số Điện Thoại">
						<Input style={{width: "100%"}} name="numberPhone" onChange={handleChange("phone")} />
						<p className="text-red-500 text-xs italic mb-0">{formik.errors.phone}</p>
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Mật Khẩu">
						<Input style={{width: "100%"}} type="password" name="passWord" onChange={handleChange("passWord")} />
						<p className="text-red-500 text-xs italic mb-0">{formik.errors.passWord}</p>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label="Xác Nhận Mật Khẩu">
						<Input style={{width: "100%"}} type="password" value={formik.values.numberFloors} onChange={handleChange("confirmPassword")} />
						<p className="text-red-500 text-xs italic mb-0">{formik.errors.confirmPassword}</p>
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
