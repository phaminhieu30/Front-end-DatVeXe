import React, {useEffect, useState} from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {useDispatch, useSelector} from "react-redux";
import {MinusCircleOutlined, PlusOutlined, FormOutlined, DeleteOutlined} from "@ant-design/icons";
import {Form, Input, Button, Space, Select, message, Popover, Checkbox, Row, Col} from "antd";
import {useFormik} from "formik";
import * as Yup from "yup";
import {getDetailStationAction, updateStationAction, createStationAction} from "../../redux/actions/stationAction";
import {CLOSE_DRAWER} from "../../redux/types/DrawerTypes";
import {getProvinceAction} from "../../redux/actions/bookingAction";
const {Option} = Select;

export default function AddStation(props) {
	const dispatch = useDispatch();
	const {stationDetail} = useSelector((state) => state.StationReducer);
	const {listProvince} = useSelector((state) => state.BookingReducer);
	useEffect(() => {
		dispatch(getProvinceAction());
	}, [props.id]);
	const ListProvince = listProvince?.map((item, index) => {
		if (item.name.includes("Tỉnh")) {
			return item.name.substring(5, item.name.length);
		} else if (item.name.includes("Thành phố")) {
			return item.name.substring(10, item.name.length);
		} else {
			return item.name;
		}
	});
	const renderProvince = () => {
		return ListProvince.map((item, index) => {
			return {label: `${item}`, value: item};
		});
	};
	const finish = (values) => {
		console.log("file: AddStation.js ~ line 35 ~ finish ~ values", values);
		dispatch(createStationAction(values));
		dispatch({
			type: CLOSE_DRAWER,
		});
	};
	return (
		<Form layout="vertical" name="basic" autoComplete="off" onFinish={finish} requiredMark={true}>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item
						label="Tên Trạm"
						rules={[
							{
								required: true,
								message: "Thiếu tên!",
							},
						]}
						name="name"
					>
						<Input placeholder="Please enter station name" />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						label="Địa chỉ"
						rules={[
							{
								required: true,
								message: "Thiếu địa chỉ!",
							},
						]}
						name="address"
					>
						<Input style={{width: "100%"}} />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item
						label="Tỉnh / Thành Phố"
						rules={[
							{
								required: true,
								message: "Thiếu thành phố!",
							},
						]}
						name="province"
					>
						<Select placeholder="Please select province" name="province" options={renderProvince()}></Select>
					</Form.Item>
				</Col>
			</Row>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					Thêm Bến
				</Button>
			</Form.Item>
		</Form>
	);
}
