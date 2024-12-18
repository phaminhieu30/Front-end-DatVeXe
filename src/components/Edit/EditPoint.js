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
import {getDetailPointAction, updatePointAction} from "../../redux/actions/pointAction";
const {Option} = Select;

export default function EditPoint(props) {
	const dispatch = useDispatch();
	const {pointDetail} = useSelector((state) => state.PointReducer);
	useEffect(() => {
		dispatch(getDetailPointAction(props.id));
	}, [props.id]);
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: pointDetail.name,
			address: pointDetail.address,
			stationId: pointDetail.stationId,
		},

		onSubmit: (values) => {
			dispatch(updatePointAction(props.id, values));
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
	const handleChangeSelect = (name) => {
		return (value) => {
			formik.setFieldValue(name, value);
		};
	};
	return (
		<Form layout="vertical" name="basic" autoComplete="off">
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Tên Trạm">
						<Input placeholder="Please enter passenger name" name="name" onChange={handleChange("name")} value={formik.values.name} />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label="Địa chỉ">
						<Input style={{width: "100%"}} name="address" value={formik.values.address} onChange={handleChange("address")} />
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
