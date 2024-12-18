import React, {useEffect} from "react";
import {Form, Input, Button, Checkbox, Popconfirm, Select} from "antd";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";

import {getDetailUserAction, registerAction, UpdatelUserAction} from "../../redux/actions/UserAction";
import {CLOSE_NOFICATION, NOFICATION} from "../../redux/types/userTypes";
const {Option, OptGroup} = Select;

export default function EditUser(props) {
	const dispatch = useDispatch();
	const {detailUser} = useSelector((state) => state.userReducer);
	useEffect(() => {
		dispatch(getDetailUserAction(props.id));
	}, [props.id]);
	const SignupSchema = Yup.object().shape({
		email: Yup.string().min(2, "Email quá ngắn!").max(50, "Password quá dài!").email("Email không hợp lệ").required("Vui lòng nhập email"),
		name: Yup.string().min(2, "tên quá ngắn!").max(50, "tên quá dài!").required("Vui lòng nhập email"),
		passWord: Yup.string().min(2, "Password quá ngắn!").max(50, "Password quá dài!"),
		phone: Yup.string()
			.required("Không được bỏ trống số điện thoại")
			.matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "Số điện thoại không hợp lệ"),
	});
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: detailUser.name,
			phone: detailUser.numberPhone,
			email: detailUser.email,
			passWord: detailUser.password,
			type: detailUser.type,
		},
		validationSchema: SignupSchema,
		onSubmit: (values) => {
			let user = {
				name: values.name,
				email: values.email,
				password: values.passWord,
				numberPhone: values.phone,
				type: values.type,
			};
			dispatch(UpdatelUserAction(user, props.id));
		},
	});
	function handleChangeOpt(value) {
		formik.setFieldValue("type", value);
	}
	return (
		<>
			<Form name="basic" autoComplete="off">
				<Form.Item label="Tên" name="name">
					<Input onChange={(e) => formik.setFieldValue("name", e.target.value)} name="name" value={formik.values.name} />
					<p className="text-red-500 text-xs italic mb-0">{formik.errors.name}</p>
				</Form.Item>
				<Form.Item label="Số điện thoại" name="phone">
					<Input onChange={(e) => formik.setFieldValue("phone", e.target.value)} name="phone" value={formik.values.phone} />
					<p className="text-red-500 text-xs italic mb-0">{formik.errors.phone}</p>
				</Form.Item>
				<Form.Item label="Email" name="email">
					<Input onChange={(e) => formik.setFieldValue("email", e.target.value)} name="email" value={formik.values.email} />
					<p className="text-red-500 text-xs italic mb-0">{formik.errors.email}</p>
				</Form.Item>
				<Form.Item label="Mật khẩu" name="passWord">
					<Input.Password onChange={(e) => formik.setFieldValue("passWord", e.target.value)} name="passWord" value={formik.values.passWord} />
					<p className="text-red-500 text-xs italic mb-0">{formik.errors.passWord}</p>
				</Form.Item>

				<Select value={formik.values.type} style={{width: 200, marginBottom: 15}} onChange={handleChangeOpt}>
					<OptGroup label="Loại người dùng">
						<Option value="CLIENT">CLIENT</Option>
						<Option value="ADMIN">ADMIN</Option>
					</OptGroup>
				</Select>

				<Form.Item wrapperCol={{offset: 8, span: 8}}>
					<Popconfirm
						placement="topLeft"
						title={"Bạn có muốn cập nhật tài khoản"}
						onConfirm={() => {
							formik.handleSubmit();
							// if (!formik.isValid) {
							// 	dispatch({
							// 		type: NOFICATION,
							// 		title: "error",
							// 		text: "Lỗi Cập Nhật, Vui lòng thử lại!",
							// 	});
							// } else {
							// 	props.setToggle(!props.toggle);
							// }
						}}
						okText="Yes"
						cancelText="No"
					>
						<Button type="primary" htmlType="submit">
							Cập Nhật
						</Button>
					</Popconfirm>
				</Form.Item>
			</Form>
		</>
	);
}
