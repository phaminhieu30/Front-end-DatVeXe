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
const {Option} = Select;

export default function EditStation(props) {
	const dispatch = useDispatch();
	const {stationDetail} = useSelector((state) => state.StationReducer);
	const {listProvince} = useSelector((state) => state.BookingReducer);
	useEffect(() => {
		dispatch(getDetailStationAction(props.id));
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
	console.log("file: EditStation.js ~ line 31 ~ ListProvince ~ ListProvince", ListProvince);
	const renderProvince = () => {
		return ListProvince.map((item, index) => {
			return {label: `${item}`, value: item};
		});
	};
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: stationDetail.name,
			address: stationDetail.address,
			province: stationDetail.province,
		},

		onSubmit: (values) => {
			dispatch(updateStationAction(props.id, values));
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
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Tỉnh / Thành Phố">
						<Select placeholder="Please select province" value={formik.values.province} name="province" onChange={handleChangeSelect("province")} options={renderProvince()}></Select>
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
