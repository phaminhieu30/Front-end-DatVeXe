import React from "react";
import {Form, Input, Button, Checkbox} from "antd";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {LoginAction} from "../../redux/actions/UserAction";

export default function Login(props) {
	const dispatch = useDispatch();
	const SignupSchema = Yup.object().shape({
		email: Yup.string().min(2, "Email quá ngắn!").max(50, "Password quá dài!").email("Email không hợp lệ").required("Vui lòng nhập email"),
		passWord: Yup.string().min(2, "Password quá ngắn!").max(50, "Password quá dài!").required("Vui lòng nhập password"),
	});
	const formik = useFormik({
		initialValues: {
			email: "",
			passWord: "",
		},
		validationSchema: SignupSchema,
		onSubmit: (values) => {
			let user = {
				email: values.email,
				password: values.passWord,
			};
			dispatch(LoginAction(user));
		},
	});

	return (
		<Form name="basic" autoComplete="off" onFinish={formik.handleSubmit}>
			<Form.Item label="Email" name="email">
				<Input onChange={(e) => formik.setFieldValue("email", e.target.value)} name="email" />
				<p className="text-red-500 text-xs italic mb-0">{formik.errors.email}</p>
			</Form.Item>

			<Form.Item label="Mật khẩu" name="passWord">
				<Input.Password onChange={(e) => formik.setFieldValue("passWord", e.target.value)} name="passWord" />
				<p className="text-red-500 text-xs italic mb-0">{formik.errors.passWord}</p>
			</Form.Item>

			<Form.Item name="remember" valuePropName="checked">
				<Checkbox>Ghi nhớ</Checkbox>
			</Form.Item>

			<Form.Item wrapperCol={{offset: 8, span: 8}}>
				<Button
					type="primary"
					htmlType="submit"
					onClick={() => {
						formik.handleSubmit();
						props.setModal(false);
					}}
				>
					Đăng nhập
				</Button>
			</Form.Item>
			<div>
				Bạn chưa có tài khoản?
				<button
					type="button"
					className="ant-btn ant-btn-link ant-btn-sm"
					onClick={() => {
						props.setToggle(!props.toggle);
					}}
				>
					<span>Đăng ký</span>
				</button>
			</div>
		</Form>
	);
}
