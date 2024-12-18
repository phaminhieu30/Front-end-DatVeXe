import React from "react";
import {Form, Input, Button, Checkbox, Popconfirm} from "antd";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";

import {registerAction} from "../../redux/actions/UserAction";
import {CLOSE_NOFICATION, NOFICATION} from "../../redux/types/userTypes";
export default function Register(props) {
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
		initialValues: {
			name: "",
			phone: "",
			email: "",
			passWord: "",
			confirmPassword: "",
		},
		validationSchema: SignupSchema,
		onSubmit: (values) => {
			console.log(values);
			let user = {
				name: values.name,
				email: values.email,
				password: values.passWord,
				numberPhone: values.phone,
			};
			dispatch(registerAction(user));
		},
	});

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
				<Form.Item label="Xác nhận mật khẩu" name="passWord">
					<Input.Password onChange={(e) => formik.setFieldValue("confirmPassword", e.target.value)} name="passWord" value={formik.values.confirmPassword} />
					<p className="text-red-500 text-xs italic mb-0">{formik.errors.confirmPassword}</p>
				</Form.Item>
				<Form.Item wrapperCol={{offset: 8, span: 8}}>
					<Popconfirm
						placement="topLeft"
						title={"Bạn có muốn đăng ký tài khoản"}
						onConfirm={() => {
							formik.handleSubmit();
							if (!formik.isValid) {
								dispatch({
									type: NOFICATION,
									title: "error",
									text: "Lỗi Đăng ký, Vui lòng thử lại!",
								});
							} else {
								props.setToggle(!props.toggle);
							}
						}}
						okText="Yes"
						cancelText="No"
					>
						<Button type="primary" htmlType="submit">
							Đăng ký
						</Button>
					</Popconfirm>
				</Form.Item>
				<div>
					Nếu đã có tài khoản?
					<button
						type="button"
						className="ant-btn ant-btn-link ant-btn-sm"
						onClick={() => {
							props.setToggle(!props.toggle);
						}}
					>
						<span>Đăng nhập</span>
					</button>
				</div>
			</Form>
		</>
	);
}
