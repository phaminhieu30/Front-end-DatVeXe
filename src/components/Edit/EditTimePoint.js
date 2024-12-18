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
import {getDetailTimePointTripAction, getTimePointBookingTripAction} from "../../redux/actions/timePointAction";
import {CHANGE_DROP_TICKET, CHANGE_PICK_TICKET} from "../../redux/types/TicketTypes";
import {HIDE_MODAL} from "../../redux/types/ModalTypes";
const {Option} = Select;

export default function EditTimePoint(props) {
	const dispatch = useDispatch();

	const {timePointBooking, timepointDetail} = useSelector((state) => state.timePointReducer);
	let timePointBookingPick = timePointBooking.filter((item) => item.type == "pickup");
	let timePointBookingDrop = timePointBooking.filter((item) => item.type == "dropoff");

	useEffect(() => {
		dispatch(getDetailTimePointTripAction(props.id));
		dispatch(getTimePointBookingTripAction(props.tripPassengerId));
	}, [props.id]);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			timePoint: timepointDetail?.point?.name,
			timePointId: timepointDetail?.id,
		},

		onSubmit: (values) => {
			if (props.type == "pickup") {
				dispatch({
					type: CHANGE_PICK_TICKET,
					pointPickup: values.timePointId,
				});
			} else {
				dispatch({
					type: CHANGE_DROP_TICKET,
					pointDropoff: values.timePointId,
				});
			}
			message.success("Cập nhật thành công");
			dispatch({
				type: HIDE_MODAL,
			});
		},
	});
	const renderSelect = () => {
		if (props.type == "pickup") {
			return timePointBookingPick.map((item, index) => {
				return {label: `${item.time}-${item.point.name}`, value: item.id};
			});
		} else {
			return timePointBookingDrop.map((item, index) => {
				return {label: `${item.time}-${item.point.name}`, value: item.id};
			});
		}
	};
	const handleChangeSelect = (name, id) => {
		return (value) => {
			formik.setFieldValue(id, value);
			formik.setFieldValue(name, value);
		};
	};
	return (
		<Form layout="vertical" name="basic" autoComplete="off">
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Điểm đón / trả">
						<Select placeholder="Please select point" value={formik.values.timePoint} name="timePoint" onChange={handleChangeSelect("timePoint", "timePointId")} options={renderSelect()}></Select>
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
