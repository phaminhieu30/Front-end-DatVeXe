import React, {useEffect} from "react";
import "../../Sass/css/user.css";
import {Breadcrumb, Card, Tabs, Avatar, Dropdown, Menu, Radio, Space, Form, Input, InputNumber, Button} from "antd";
import {HomeOutlined, UserOutlined, EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {history} from "../../App";
import {TOKEN, USER_LOGIN} from "../../util/settings/config";
import * as Yup from "yup";

import {useFormik} from "formik";
import {UpdatelUserAction} from "../../redux/actions/UserAction";
const {TabPane} = Tabs;
const {Meta} = Card;
export default function InfoManagement(props) {
	const dispatch = useDispatch();
	const {userLogin} = useSelector((state) => state.userReducer);
	const layout = {
		labelCol: {span: 24},
		wrapperCol: {span: 24},
	};
	useEffect(() => {}, [userLogin]);

	const onFinish = (values) => {
		console.log(values);
	};
	const SignupSchema = Yup.object().shape({
		email: Yup.string().min(2, "Email quá ngắn!").max(50, "Password quá dài!").email("Email không hợp lệ").required("Vui lòng nhập email"),
		name: Yup.string().min(2, "tên quá ngắn!").max(50, "tên quá dài!").required("Vui lòng nhập email"),
		passWord: Yup.string().min(2, "Password quá ngắn!"),
		phone: Yup.string()
			.required("Không được bỏ trống số điện thoại")
			.matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "Số điện thoại không hợp lệ"),
	});
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: userLogin.name,
			phone: userLogin.numberPhone,
			email: userLogin.email,
			passWord: userLogin.password,
			type: userLogin.type,
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
			dispatch(UpdatelUserAction(user, userLogin.id));
		},
	});
	return (
		<div className="user">
			<div className="user-container">
				<div className="bread-cump">
					<Breadcrumb>
						<Breadcrumb.Item href="">
							<HomeOutlined />
						</Breadcrumb.Item>
						<Breadcrumb.Item href="">
							<UserOutlined />
							<span style={{ fontSize: "18px" }} >Thông tin cá nhân</span>
						</Breadcrumb.Item>
					</Breadcrumb>
				</div>
				<div className="ticket_management">
					<div className="grid grid-cols-12 gap-5">
						<div className="col-span-4">
							<Card style={{width: "100%"}}>
								<div className="card-item">
									<a
										onClick={() => {
											history.push("/usermgt");
										}}
									>
										<img src="https://storage.googleapis.com/fe-production/images/Auth/account-circle.svg" width={24} height={16} alt />
										<span style={{ fontSize: "18px" }} color="text" className="core__Text-sc-1c81tsc-1 kCMizM">
											Thông tin cá nhân
										</span>
									</a>
								</div>
								<div className="card-item">
									<a
										onClick={() => {
											history.push("/ticketmgt");
										}}
									>
										<img src="https://storage.googleapis.com/fe-production/images/ticket.svg" width={24} height={16} alt />
										<span style={{ fontSize: "18px" }} color="text" className="core__Text-sc-1c81tsc-1 kCMizM">
											Vé của tôi
										</span>
									</a>
								</div>
								<div className="card-item">
									<a
										onClick={() => {
											history.push("/commentmgt");
										}}
									>
										<img src="https://storage.googleapis.com/fe-production/images/review.svg" width={24} height={16} alt />
										<span style={{ fontSize: "18px" }} color="text" className="core__Text-sc-1c81tsc-1 kCMizM">
											Nhận xét của tôi
										</span>
									</a>
								</div>
								<div className="card-item">
									<a
										onClick={() => {
											localStorage.removeItem(USER_LOGIN);
											localStorage.removeItem(TOKEN);
											window.location.reload();
										}}
									>
										<img src="https://storage.googleapis.com/fe-production/images/Auth/logout.svg" width={24} height={16} alt />
										<span style={{ fontSize: "18px" }} color="text" className="core__Text-sc-1c81tsc-1 kCMizM">
											Đăng xuất
										</span>
									</a>
								</div>
							</Card>
						</div>
						<div className="col-span-8">
							<div className="title font-bold text-xl">Thông tin cá nhân</div>
							<Form {...layout} name="nest-messages">
								<Form.Item label="Họ tên" rules={[{required: true}]}>
									<Input onChange={(e) => formik.setFieldValue("name", e.target.value)} name="name" value={formik.values.name} />
									<p className="text-red-500 text-xs italic mb-0">{formik.errors.name}</p>
								</Form.Item>
								<Form.Item label="Email">
									<Input onChange={(e) => formik.setFieldValue("email", e.target.value)} name="email" value={formik.values.email} />
									<p className="text-red-500 text-xs italic mb-0">{formik.errors.email}</p>
								</Form.Item>
								<Form.Item label="Số điện thoại">
									<Input onChange={(e) => formik.setFieldValue("phone", e.target.value)} name="phone" value={formik.values.phone} />
									<p className="text-red-500 text-xs italic mb-0">{formik.errors.phone}</p>
								</Form.Item>
								<Form.Item label="Mật Khẩu" rules={[{required: true}]}>
									<Input.Password onChange={(e) => formik.setFieldValue("passWord", e.target.value)} name="passWord" value={formik.values.passWord} />
									<p className="text-red-500 text-xs italic mb-0">{formik.errors.passWord}</p>
								</Form.Item>
								<Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										onClick={() => {
											formik.handleSubmit();
										}}
									>
										Cập nhật
									</Button>
								</Form.Item>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
