import React, {useEffect, useState} from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {useDispatch, useSelector} from "react-redux";
import {MinusCircleOutlined, PlusOutlined, FormOutlined, DeleteOutlined} from "@ant-design/icons";
import {Form, Input, Button, Space, Select, message, Popover, Checkbox, Row, Col} from "antd";
import {useFormik} from "formik";
import * as Yup from "yup";
import {getDetailStationAction, updateStationAction} from "../../redux/actions/stationAction";
import {CLOSE_DRAWER} from "../../redux/types/DrawerTypes";
import {getProvinceAction} from "../../redux/actions/bookingAction";
import {createPointAction, getDetailPointAction, updatePointAction} from "../../redux/actions/pointAction";
const {Option} = Select;

export default function AddPoint(props) {
	const dispatch = useDispatch();

	console.log("file: AddPoint.js ~ line 17 ~ AddPoint ~ pointDetail", props);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: "",
			address: "",
			stationId: props.stationId,
		},

		onSubmit: (values) => {
			dispatch(createPointAction(values));
			dispatch({
				type: CLOSE_DRAWER,
			});
		},
	});
	const handleChange = (name) => {
		return (e) => {
			formik.setFieldValue(name, e.target.value);
		};
	};

	return (
		<Form layout="vertical" name="basic" autoComplete="off">
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Tên Trạm">
						<Input placeholder="Please enter passenger name" name="name" onChange={handleChange("name")} />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label="Địa chỉ">
						<Input style={{width: "100%"}} onChange={handleChange("address")} />
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
					Thêm Điểm Dừng / Đón
				</Button>
			</Form.Item>
		</Form>
	);
}
