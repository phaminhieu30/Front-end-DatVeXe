import React, {useEffect, useState} from "react";
import {Steps, Button, message, Dropdown, Menu, Radio, Space, Form, Input, InputNumber, Spin} from "antd";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Seat from "./Seat/Seat";
import Wheel from "./Seat/Wheel";
import SeatSelect from "./Seat/SeatSelect";
import SeatBooked from "./Seat/SeatBooked";
import {useDispatch, useSelector} from "react-redux";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DoDisturbOnRoundedIcon from "@mui/icons-material/DoDisturbOnRounded";
import {DownOutlined} from "@ant-design/icons";
import LoadingSpin from "../Loading/LoadingSpin";
import Tooltip from "@mui/material/Tooltip";
import {bookingSeatAction, bookingTicketAction} from "../../redux/actions/bookingAction";
import {SET_MODAL} from "../../redux/types/ModalTypes";
import {SET_DROPOFF_PICKUP} from "../../redux/types/BookingTypes";
import {history} from "../../App";
import {TICKET_BOOKING} from "../../redux/types/TicketTypes";
import {USER_LOGIN} from "../../util/settings/config";
import {OPEN_DRAWER} from "../../redux/types/DrawerTypes";
import MapPoint from "../Map/MapPoint";
import moment from "moment";

const {SubMenu} = Menu;
const menu = (
	<Menu>
		<Menu.ItemGroup title="Group title">
			<Menu.Item>1st menu item</Menu.Item>
			<Menu.Item>2nd menu item</Menu.Item>
		</Menu.ItemGroup>
		<SubMenu title="sub menu">
			<Menu.Item>3rd menu item</Menu.Item>
			<Menu.Item>4th menu item</Menu.Item>
		</SubMenu>
		<SubMenu title="disabled sub menu" disabled>
			<Menu.Item>5d menu item</Menu.Item>
			<Menu.Item>6th menu item</Menu.Item>
		</SubMenu>
	</Menu>
);

//////////Ghế đặt
function StepBookingSeat(props) {
	const {listSeatSelected} = useSelector((state) => state.BookingReducer);
	const {listSeatVehicle} = useSelector((state) => state.vehicleReducer);
	const {isLoadingSpin} = useSelector((state) => state.LoadingReducer);
	let {tripDetail} = useSelector((state) => state.TripReducer);
	const {tripPassenger} = props;
	console.log(tripPassenger);
	var today = new Date();
	var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
	console.log(date);
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date + " " + time;

	const {prev, next, current, setCurrent} = props;
	const dispatch = useDispatch();
	const renderSeat = (floors) => {
		return listSeatVehicle.map((item, index) => {
			let classDaDat = item.status === "đã đặt" ? "gheDaChon" : "";
			let classDangDat = "";
			let indexSeatSelect = listSeatSelected.findIndex((seatSelect) => seatSelect.id == item.id);
			if (indexSeatSelect != -1) {
				classDangDat = "GheDangChon";
			}
			let disabled = item.status === "đã đặt" ? true : false;
			let arrClass = [classDaDat, classDangDat];
			let typeGhe = item.type == "seat" ? "Ghế thường" : "Giường nằm";

			if (item.floor === floors) {
				return (
					<Tooltip title={`Ghế: ${item.name}, Giá: ${item.price.toLocaleString()} VNĐ, Loại: ${typeGhe}`} placement="top">
						<button
							className="seat"
							style={{border: "none"}}
							key={index}
							onClick={() => {
								dispatch(bookingSeatAction(item));
							}}
							disabled={disabled}
						>
							<div className="seat-container">
								<Seat arrClass={arrClass} />
							</div>
						</button>
					</Tooltip>
				);
			}
		});
	};
	const renderFloor = () => {
		let arr = [];
		for (let index = 1; index <= props.vehicle.numberFloors; index++) {
			arr.push(
				<div class="coach-container">
					<span>Tầng {index}</span>
					<div className="coach">
						<table>
							<tbody>
								<tr className="coach-row">
									<td className="seat">
										<div className="seat-container" data-disabled="true" disabled>
											<Wheel />
										</div>
									</td>
								</tr>
								<div className="coach-row">{renderSeat(index)}</div>
							</tbody>
						</table>
					</div>
				</div>
			);
		}
		return arr;
	};
	const tongTienGhe = () => {
		return listSeatSelected.reduce((tongTien, item, index) => {
			return (tongTien += item.price);
		}, 0);
	};
	return (
		<>
			{isLoadingSpin ? (
				<LoadingSpin />
			) : (
				<>
					<div class="TrustMessage__Container-sc-8xur6b-0 deVKGv trust-message-container undefined" style={{color: "rgb(14, 99, 193)"}}>
						<p class="base__Body02-sc-1tvbuqk-14 VqdXU trust-message-content">VeXeRe cam kết giữ đúng vị trí bạn đã chọn.</p>
					</div>
					<div className="flex justify-center items-center">
						<div className="list-seat flex" style={{width: "80%"}}>
							<div className="seat-groups">
								<div className="note font-bold" style={{fontSize: "14px"}}>
									Chú thích
								</div>
								<div className="seat-info">
									<div className="seat-thumbnail">
										<Seat />
									</div>
									<span className="seat-name">Còn trống</span>
								</div>
								<div className="seat-info">
									<div className="seat-thumbnail" disabled>
										<SeatBooked />
									</div>
									<span className="seat-name">Ghế đã được đặt</span>
								</div>
								<div className="seat-info">
									<div className="seat-thumbnail">
										<SeatSelect />
									</div>
									<span className="seat-name">Ghế Đang chọn</span>
								</div>
								<div />
							</div>
							<div className="seat-template flex justify-center items-center">{renderFloor()}</div>
						</div>
					</div>
					<div className="steps-action">
						<div class="footer">
							<div class="footer-left"></div>
							<div class="footer-right">
								Tổng cộng: <div class="footer-total">{tongTienGhe().toLocaleString()}đ</div>
								<Button
									type="primary"
									onClick={() => {
										var date1 = new Date(`${moment(tripPassenger.trip.startTime).format("YYYY-MM-DD")} ${tripPassenger.startTime}`);
										var date2 = new Date(dateTime);
										if (localStorage.getItem(USER_LOGIN)) {
											if (listSeatSelected.length > 0) {
												if (date2.getTime() <= date1.getTime()) {
													next();
												} else {
													message.error("Chuyến đã qua ngày không thể đặt vé");
												}
											} else {
												dispatch({
													type: SET_MODAL,
													title: "Lỗi chọn ghế",
													content: "Vui lòng chọn ít nhất 1 chỗ ngồi",
												});
											}
										} else {
											message.error("Bạn chưa đăng nhập");
										}
									}}
								>
									Tiếp tục
								</Button>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}
/////////////

//////Điểm đón điểm trả
function StepStartFrom(props) {
	const {pickup, dropoff} = useSelector((state) => state.BookingReducer);
	const {timePointTrip} = useSelector((state) => state.timePointReducer);
	console.log("pickup", pickup);
	console.log("dropoff", dropoff);
	const dispatch = useDispatch();
	const handleChange = (name) => {
		return (event) => {
			dispatch({
				type: SET_DROPOFF_PICKUP,
				title: name,
				[name]: event.target.value,
			});
		};
	};
	const {prev, next, current, setCurrent} = props;
	const {trip, tripPassenger} = props;
	const renderOption = (type) => {
		return timePointTrip
			.filter((item) => item.type == type)
			.map((item, index) => {
				return (
					<Radio value={item.id} onChange={handleChange(type)}>
						<div className="radio-label" style={{color: "rgb(0, 96, 196)"}}>
							<span style={{fontWeight: "bold"}}>{item.time}</span>
							<span color="#0060C4">
								<span role="img" aria-label="emoji" className="px-2" style={{fontSize: 5}}>
									⚫
								</span>
							</span>
							{item.point.name}
						</div>
						<div style={{display: "flex", marginTop: 8}}>
							<span>
								<LocationOnIcon style={{fontSize: 18}} />
							</span>
							<span
								style={{color: "rgb(72, 72, 72)", fontSize: 10}}
								onClick={() => {
									console.log(item);
									dispatch({
										type: OPEN_DRAWER,
										title: `Vị trí của ${item.point.name}`,
										width: 1000,
										content: <MapPoint id={item.pointId} item={item.point} />,
									});
								}}
							>
								{item.point.address}
								<span className="ml-3 viewmap-link" style={{color: "rgb(0, 96, 196)", cursor: "pointer", textDecoration: "underline"}}>
									Xem vị trí
								</span>
							</span>
						</div>
					</Radio>
				);
			});
	};
	return (
		<>
			<div className="trust-message-container undefined">
				<p className="trust-message-content">Đón đúng nơi, trả đúng vị trí. Chủ động tìm điểm đón - dễ dàng đổi điểm đi.</p>
			</div>
			<div className="steps-start-content">
				<div className="step-2 grid grid-cols-2">
					<div className="container pickup-point">
						<div className="pickup-content">
							<div>
								<p className="point-type">Điểm đón</p>
								<div className="label-container flex justify-between">
									<p className="color--darkness">Hãy chọn điểm gần bạn nhất</p>
									<p className="color--darkness pl-5">Khoảng cách từ điểm đón đến</p>
								</div>
							</div>
						</div>
						<Radio.Group>
							<Space direction="vertical">{renderOption("pickup")}</Space>
						</Radio.Group>
					</div>
					<div className="container dropoff-point">
						<div className="pickup-content">
							<div>
								<p className="point-type">Điểm trả</p>
								<div className="label-container flex justify-between">
									<p className="color--darkness">Sắp xếp theo</p>
									<p className="color--darkness pl-5">Khoảng cách từ điểm đón đến</p>
								</div>
							</div>
						</div>
						<Radio.Group>
							<Space direction="vertical" className="ml-5">
								{renderOption("dropoff")}
							</Space>
						</Radio.Group>
					</div>
				</div>
			</div>
			<div class="footer">
				<div class="footer-left"></div>
				<div class="footer-right">
					<Button
						style={{margin: "0 8px"}}
						onClick={() => {
							dispatch({
								type: "reset_pickdrop",
							});
							prev();
						}}
					>
						Quay Lại
					</Button>
					{/* <Button type="primary" onClick={() => next()}>
						Tiếp tục
					</Button> */}
					<Button
						type="primary"
						onClick={() => {
							if (!localStorage.getItem(USER_LOGIN)) {
								message.error("Vui lòng đăng nhập để hoàn thành đặt vé");
							} else {
								if (dropoff == "" || pickup == "") {
									dispatch({
										type: SET_MODAL,
										title: "Lỗi chuyến đi",
										content: "Vui lòng chọn điểm đón và điểm trả",
									});
								} else {
									next();
								}
							}
						}}
					>
						Tiếp tục
					</Button>
				</div>
			</div>
		</>
	);
}

//Nhập thông tin

function InfomationPerson(props) {
	const dispatch = useDispatch();
	const [value, setValue] = React.useState("");
	const {listSeatSelected} = useSelector((state) => state.BookingReducer);
	const {pickup, dropoff} = useSelector((state) => state.BookingReducer);
	const {userLogin} = useSelector((state) => state.userReducer);
	const {tripPassenger} = props;
	console.log("file: StepBooking.js ~ line 336 ~ InfomationPerson ~ tripPassenger", tripPassenger);

	const [note, setNote] = useState("");
	const {prev, next, current, setCurrent} = props;
	const handleChangeNote = (event) => {
		setNote(event.target.value);
	};
	const layout = {
		labelCol: {span: 24},
		wrapperCol: {span: 24},
	};
	const validateMessages = {
		required: "${label} is required!",
		types: {
			email: "${label} is not a valid email!",
			number: "${label} is not a valid number!",
		},
		number: {
			range: "${label} must be between ${min} and ${max}",
		},
	};
	const onFinish = (values) => {
		console.log(values);
	};
	const tongTienGhe = () => {
		return listSeatSelected.reduce((tongTien, item, index) => {
			return (tongTien += item.price);
		}, 0);
	};
	return (
		<div className="info-trip">
			<div className="TrustMessage__Container-sc-8xur6b-0 deVKGv trust-message-container undefined">
				<p className="base__Body02-sc-1tvbuqk-14 VqdXU trust-message-content">Chỉ còn 1 bước nữa! VeXeRe cam kết chỉ sử dụng thông tin trong việc ghi nhận vé.</p>
			</div>
			<div className="w-full">
				<div style={{margin: "auto", width: 400}}>
					<Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
						<Form.Item name={["user", "name"]} label="Họ tên" rules={[{required: true}]}>
							<Input defaultValue={userLogin.name} readOnly />
						</Form.Item>
						<Form.Item name={["user", "email"]} label="Email" rules={[{type: "email", required: true}]}>
							<Input defaultValue={userLogin.email} readOnly />
						</Form.Item>
						<Form.Item name={["user", "phone"]} label="Số điện thoại" rules={[{type: "number", required: true}]}>
							<Input defaultValue={userLogin.numberPhone} readOnly />
						</Form.Item>
						<Form.Item name={["user", "introduction"]} label="Ghi chú">
							<Input.TextArea placeholder="Các yêu cầu đặc biệt không thể được đảm bảo - nhưng nhà xe sẽ cố gắng hết sức để đáp ứng nhu cầu của bạn." onChange={handleChangeNote} />
						</Form.Item>
					</Form>
				</div>
			</div>
			<div className="noteInfo">
				<DoDisturbOnRoundedIcon className="mr-5" style={{color: "rgb(47, 128, 237) !important"}} />
				<div className="info-note-content">
					<p className="base__Body02Highlight-sc-1tvbuqk-15 cACxVN color--dark">Lưu ý: </p>
					<p className="base__Body02-sc-1tvbuqk-14 VqdXU color--dark">Bạn cần điền số CMND/CCCD theo quy định mới của cơ quan thẩm quyền về di chuyển trong mùa dịch Covid-19</p>
				</div>
			</div>
			<div class="footer">
				<div class="footer-left"></div>
				<div class="footer-right">
					<Button
						style={{margin: "0 8px"}}
						onClick={() => {
							dispatch({
								type: "reset_pickdrop",
							});
							prev();
						}}
					>
						Quay Lại
					</Button>
					<Button
						type="primary"
						onClick={() => {
							let ticket = {
								note: note,
								totalAmount: tongTienGhe(),
								userId: userLogin.id,
								tripPassengerId: tripPassenger.id,
								pointPickup: pickup,
								pointDropoff: dropoff,
								listSeat: listSeatSelected,
							};
							console.log(ticket);
							// dispatch(bookingTicketAction(ticket));
							dispatch({
								type: TICKET_BOOKING,
								ticketBooking: ticket,
							});
							history.push("/payment");
						}}
					>
						Tiếp tục
					</Button>
				</div>
			</div>
		</div>
	);
}
export default function StepBooking(props) {
	const {listSeatSelected} = useSelector((state) => state.BookingReducer);

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
			title: "Chọn ghế ngồi",
			content: <StepBookingSeat tripPassenger={props.tripPassenger} vehicle={props.vehicle} prev={prev} next={next} current={current} setCurrent={setCurrent} />,
		},
		{
			title: "Điểm đón trả",
			content: <StepStartFrom trip={props.trip} tripPassenger={props.tripPassenger} prev={prev} next={next} current={current} setCurrent={setCurrent} />,
		},
		{
			title: "Nhập thông tin",
			content: <InfomationPerson prev={prev} next={next} current={current} setCurrent={setCurrent} tripPassenger={props.tripPassenger} />,
		},
	];

	return (
		<>
			<Steps current={current}>
				{steps.map((item) => (
					<Step key={item.title} title={item.title} />
				))}
			</Steps>
			<div className="steps-content">{steps[current].content}</div>
			{/* <div className="steps-action">
				{current < steps.length && (
					// <Button type="primary" onClick={() => next()}>
					//   Next
					// </Button>
					<div class="footer">
						<div class="footer-left"></div>
						<div class="footer-right">
							Tổng cộng: <div class="footer-total">{tongTienGhe()}đ</div>
							<Button type="primary" onClick={() => next()}>
								Tiếp tục
							</Button>
						</div>
					</div>
				)}
				{current === steps.length - 1 && (
					<></>
					// <Button
					//   type="primary"
					//   onClick={() => message.success("Processing complete!")}
					// >
					//   Done
					// </Button>
				)}
				{current > 0 && (
					<Button style={{margin: "0 8px"}} onClick={() => prev()}>
						Previous
					</Button>
				)}
			</div> */}
		</>
	);
}
