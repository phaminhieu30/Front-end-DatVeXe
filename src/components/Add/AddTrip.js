import React, {Fragment, useEffect, useState} from "react";
import {Steps, Button, message, Breadcrumb, Form, Row, Col, Input, Select, DatePicker, TimePicker, Result, Space} from "antd";
import {Content} from "antd/lib/layout/layout";
import {DownOutlined, UpOutlined, MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {getListStationAction} from "../../redux/actions/stationAction";

import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {getAllPassenger} from "../../redux/actions/passengerAction";
import {getAllVehicleByPassengerAction} from "../../redux/actions/vehicleAction";
import {createTripAction, createTripPassengerAction} from "../../redux/actions/tripAction";
import {getPointDropoffAction, getPointPickUpAction} from "../../redux/actions/pointAction";
import {HIDE_RESULT} from "../../redux/types/LoadingTypes";
import {createTimePointTripAction} from "../../redux/actions/timePointAction";
const {Option} = Select;

function AddTripProvince(props) {
	const dispatch = useDispatch();
	const {listStation} = useSelector((state) => state.StationReducer);
	console.log("listStation", listStation);
	const {prev, next, current, setCurrent} = props;
	function disabledDate(current) {
		// Can not select days before today and today
		return current && current.valueOf() < Date.now() + 1;
	}
	const onFinish = (values) => {
		const {fromStation, toStation, startTime} = values;
		if (fromStation == toStation) {
			message.error("Điểm đến và đi không được giống nhau");
		} else {
			const trip = {
				fromStation,
				toStation,
				startTime: moment(startTime).format("YYYY-MM-DD"),
			};
			console.log(trip);
			dispatch(createTripAction(trip, next));
			next();
		}
	};
	useEffect(() => {
		dispatch(getListStationAction());
	}, []);
	const renderStation = () => {
		return listStation.map((item, index) => {
			return {label: `${item.name}-${item.province}`, value: item.id};
		});
	};

	return (
		<Form name="advanced_search" className="ant-advanced-search-form" onFinish={onFinish} requiredMark={true}>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item
						label="Đi Từ"
						name="fromStation"
						rules={[
							{
								required: true,
								message: "Thiếu Điểm Đi!",
							},
						]}
					>
						<Select options={renderStation()}></Select>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						label="Đến"
						name="toStation"
						rules={[
							{
								required: true,
								message: "Thiếu Điểm Đến!",
							},
						]}
					>
						<Select options={renderStation()}></Select>
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={16}>
					<Form.Item
						label="Ngày Xuất Phát"
						name="startTime"
						rules={[
							{
								required: true,
								message: "Thiếu Ngày Ngày Xuất!",
							},
						]}
					>
						<DatePicker disabledDate={disabledDate} />
					</Form.Item>
				</Col>
			</Row>

			<Row>
				<Col
					span={24}
					style={{
						textAlign: "center",
					}}
				>
					<Button type="primary" htmlType="submit">
						Tạo
					</Button>
				</Col>
			</Row>
		</Form>
	);
}
function AddTripPassenger(props) {
	const {prev, next, current, setCurrent} = props;
	const dispatch = useDispatch();
	const {listPassenger} = useSelector((state) => state.PassengerReducer);
	const {listSelectVehicle} = useSelector((state) => state.vehicleReducer);
	const {tripCreated} = useSelector((state) => state.TripReducer);
	console.log(" tripCreated", tripCreated);
	const renderPassenger = () => {
		return listPassenger.map((item, index) => {
			return {label: `Nhà xe ${item.name}`, value: item.id};
		});
	};
	const renderVehicle = () => {
		return listSelectVehicle.map((item, index) => {
			return {label: `Xe ${item.name}`, value: item.id};
		});
	};
	useEffect(() => {
		dispatch(getAllPassenger());
	}, []);
	const onFinish = (values) => {
		const {endTime, startTime, passengerId, vehicleId} = values;
		let tripPassenger = {
			tripId: tripCreated.id,
			passengerId,
			vehicleId,
			startTime: moment(startTime).format("hh:MM:ss"),
			endTime: moment(endTime).format("hh:MM:ss"),
		};
		dispatch(createTripPassengerAction(tripPassenger, next));
		next();
	};
	const onchangePassenger = (value) => {
		dispatch(getAllVehicleByPassengerAction(value));
	};
	return (
		<Form name="advanced_search" className="ant-advanced-search-form" onFinish={onFinish} requiredMark={true}>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item
						label="Chọn Nhà Xe"
						name="passengerId"
						rules={[
							{
								required: true,
								message: "Thiếu Nhà Xe!",
							},
						]}
					>
						<Select options={renderPassenger()} onChange={onchangePassenger}></Select>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						label="Chọn Xe"
						name="vehicleId"
						rules={[
							{
								required: true,
								message: "Thiếu Xe!",
							},
						]}
					>
						<Select options={renderVehicle()}></Select>
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item
						label="Thời Gian Khởi Hành"
						name="startTime"
						rules={[
							{
								required: true,
								message: "Thiếu Ngày Ngày Xuất!",
							},
						]}
					>
						<TimePicker />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						label="Thời Gian kết thúc (Dự Kiến)"
						name="endTime"
						rules={[
							{
								required: true,
								message: "Thiếu Thời Gian Kết Thúc!",
							},
						]}
					>
						<TimePicker />
					</Form.Item>
				</Col>
			</Row>

			<Row>
				<Col
					span={24}
					style={{
						textAlign: "center",
					}}
				>
					<Button style={{margin: "0 8px"}} onClick={() => prev()}>
						Quay Lại
					</Button>
					<Button type="primary" htmlType="submit">
						Tạo
					</Button>
				</Col>
			</Row>
		</Form>
	);
}

function AddPoint(props) {
	const {prev, next, current, setCurrent} = props;
	const dispatch = useDispatch();
	const {listPointPickup, listPointDropoff} = useSelector((state) => state.PointReducer);
	const {tripCreated, tripPassengerCreated} = useSelector((state) => state.TripReducer);
	const {isSuccess} = useSelector((state) => state.LoadingReducer);
	console.log("file: AddTrip.js ~ line 234 ~ AddPoint ~ tripPassengerCreated", tripPassengerCreated);
	useEffect(() => {
		dispatch(getPointPickUpAction(tripCreated.fromStation));
		dispatch(getPointDropoffAction(tripCreated.toStation));
	}, []);
	console.log();
	const getDisabledHoursStartTime = () => {
		let hoursStartTime = moment(tripPassengerCreated.startTime, "HH:mm:SS").hour();
		let hoursEndTime = moment(tripPassengerCreated.endTime, "HH:mm:SS").hour();
		var hours = [];
		for (var i = 0; i < hoursStartTime; i++) {
			hours.push(i);
		}
		return hours;
	};
	const getDisabledHoursEndTime = () => {
		let hoursStartTime = moment(tripPassengerCreated.startTime, "HH:mm:SS").hour();
		let hoursEndTime = moment(tripPassengerCreated.endTime, "HH:mm:SS").hour();
		var hours = [];
		for (var i = 0; i < hoursEndTime; i++) {
			hours.push(i);
		}
		return hours;
	};
	const renderPickUp = () => {
		return listPointPickup.map((item, index) => {
			return {label: `${item.name}-${item.address}`, value: item.id};
		});
	};
	const renderDropOff = () => {
		return listPointDropoff?.map((item, index) => {
			return {label: `${item.name}-${item.address}`, value: item.id};
		});
	};
	const onFinish = (values) => {
		let arrListPoint = values.listTimePoint.map((item, index) => {
			return {...item, timeDropOff: moment(item.timeDropOff).format("HH:mm:SS"), timePickUp: moment(item.timePickUp).format("HH:mm:SS")};
		});
		let createdPoint = {
			arrListPoint,
			tripPassengerId: tripPassengerCreated.id,
		};
		dispatch(createTimePointTripAction(createdPoint));
	};

	return (
		<Fragment>
			{isSuccess ? (
				<Result
					status="success"
					title="Hoàn thành tạo chuyến đi"
					subTitle="Vui lòng kiểm tra lại"
					extra={[
						<Button
							type="primary"
							key="console"
							onClick={() => {
								prev();
								dispatch({
									type: HIDE_RESULT,
								});
							}}
						>
							Quay Lại
						</Button>,
					]}
				/>
			) : (
				<Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
					<Form.List name="listTimePoint">
						{(fields, {add, remove}) => (
							<>
								{fields.map(({key, name, ...restField}) => (
									<>
										<Row gutter={16}>
											<Col span={12}>
												<Form.Item
													label="Điểm Đón"
													name={[name, "PickupPointId"]}
													{...restField}
													rules={[
														{
															required: true,
															message: "Thiếu Điểm Đến!",
														},
													]}
												>
													<Select options={renderPickUp()}></Select>
												</Form.Item>
											</Col>
											<Col span={12}>
												<Form.Item
													label="Thời gian đón"
													name={[name, "timePickUp"]}
													{...restField}
													rules={[
														{
															required: true,
															message: "Thiếu Ngày Ngày Xuất!",
														},
													]}
												>
													<TimePicker disabledHours={getDisabledHoursStartTime} />
												</Form.Item>
											</Col>
										</Row>
										<Row gutter={16}>
											<Col span={12}>
												<Form.Item
													label="Điểm Trả"
													name={[name, "DropoffPointId"]}
													{...restField}
													rules={[
														{
															required: true,
															message: "Thiếu Điểm Đến!",
														},
													]}
												>
													<Select options={renderDropOff()}></Select>
												</Form.Item>
											</Col>
											<Col span={12}>
												<Form.Item
													label="Thời gian trả"
													name={[name, "timeDropOff"]}
													{...restField}
													rules={[
														{
															required: true,
															message: "Thiếu Ngày Ngày Xuất!",
														},
													]}
												>
													<TimePicker disabledHours={getDisabledHoursEndTime} />
												</Form.Item>
											</Col>
										</Row>
										<MinusCircleOutlined onClick={() => remove(name)} />
									</>
								))}
								<Form.Item>
									<Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
										Add field
									</Button>
								</Form.Item>
							</>
						)}
					</Form.List>
					<Form.Item>
						<Button
							htmlType="submit"
							onClick={() => {
								prev();
							}}
						>
							Quay Lại
						</Button>
						<Button
							type="primary"
							htmlType="submit"
							onClick={() => {
								next();
							}}
						>
							Thêm
						</Button>
					</Form.Item>
				</Form>
			)}
		</Fragment>
	);
}

export default function AddTrip() {
	const {Step} = Steps;
	const [current, setCurrent] = React.useState(0);

	const next = () => {
		if (current < 2) {
			setCurrent(current + 1);
		}
	};

	const prev = () => {
		setCurrent(current - 1);
	};

	const steps = [
		{
			title: "Tạo Chuyến Đi",
			content: <AddTripProvince prev={prev} next={next} current={current} setCurrent={setCurrent} />,
		},
		{
			title: "Tạo Nhà Xe - Xe Phụ Trách Chuyến Đi",
			content: <AddTripPassenger prev={prev} next={next} current={current} setCurrent={setCurrent} />,
		},
		{
			title: "Thêm Điểm Đón - Trả",
			content: <AddPoint prev={prev} next={next} current={current} setCurrent={setCurrent} />,
			// 	(

			// ),
		},
		// {
		// 	title: "Hoàn Thành",
		// 	content: (
		// 		<Result
		// 			status="success"
		// 			title="Hoàn thành tạo chuyến đi"
		// 			subTitle="Vui lòng kiểm tra lại"
		// 			extra={[
		// 				<Button type="primary" key="console" onClick={() => prev()}>
		// 					Quay Lại
		// 				</Button>,
		// 			]}
		// 		/>
		// 	),
		// },
	];

	return (
		<>
			<Content style={{margin: "0 16px"}}>
				<Breadcrumb style={{margin: "16px 0"}}>
					<Breadcrumb.Item>Admin</Breadcrumb.Item>
					<Breadcrumb.Item>Add Trip</Breadcrumb.Item>
				</Breadcrumb>
				<div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
					<h1>Tạo Chuyến Đi</h1>
					<Steps current={current}>
						{steps.map((item) => (
							<Step key={item.title} title={item.title} />
						))}
					</Steps>
					<div className="steps-content">{steps[current].content}</div>
					{/* <div className="steps-action">
						{current < steps.length - 1 && (
							<Button type="primary" onClick={() => next()}>
								Next
							</Button>
						)}
						{current === steps.length - 1 && (
							<Button type="primary" onClick={() => message.success("Processing complete!")}>
								Done
							</Button>
						)}
						{current > 0 && (
							<Button style={{margin: "0 8px"}} onClick={() => prev()}>
								Previous
							</Button>
						)}
					</div> */}
				</div>
			</Content>
		</>
	);
}
