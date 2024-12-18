import React from "react";
import {Card, Button, Tag} from "antd";
import {StarFilled} from "@ant-design/icons";
import Details from "./Details";
import Collapse from "@mui/material/Collapse";
import ShareIcon from "@mui/icons-material/Share";
import {styled} from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import StepBooking from "./StepBooking";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {getImgVehicleAction} from "../../redux/actions/bookingAction";
import {OPEN_CLOSE_BOOKING, OPEN_CLOSE_DETAILS} from "../../redux/types/BookingTypes";
import {getImageVehicleAction, getSeatVehicleAction} from "../../redux/actions/vehicleAction";
import {getTimePointTripAction} from "../../redux/actions/timePointAction";

import LoadingSpin from "../Loading/LoadingSpin";
import {SortPriceTripPassengerAction, SortTimeTripPassengerAction} from "../../redux/actions/tripAction";
export default function ListTrips(props) {
	let {tripSearch, listTripPassenger, listImgVehicle, tripRender} = useSelector((state) => state.BookingReducer);
	const {isLoadingSpin} = useSelector((state) => state.LoadingReducer);
	const {param} = props;
	const dispatch = useDispatch();
	console.log(listTripPassenger);

	const handleExpandStepClick = (id) => {
		dispatch({
			type: OPEN_CLOSE_BOOKING,
			id: id,
		});
	};
	const handleExpandClick = (id) => {
		dispatch({
			type: OPEN_CLOSE_DETAILS,
			id: id,
		});
	};
	const ExpandMore = styled((props) => {
		const {expand, ...other} = props;
		return <IconButton {...other} />;
	})(({theme, expand}) => ({
		transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
	}));
	const renderTripPassenger = () => {
		return listTripPassenger?.map((item, index) => {
			if (item.status == "depart") {
				let numberBlank = item.vehicle.seatVehicle.filter((x) => x.status == "chưa đặt").length;
				let avgRatePassenger = _.meanBy(item.passenger.passengerRate, (rate) => rate.numberRate).toFixed(2);
				return (
					<Card style={{width: "100%"}} key={index}>
						<div className="grid grid-cols-12" style={{minHeight: "180px"}}>
							<div className="col-span-3 logo-trips">
								<div className="image" style={{position: "relative"}}>
									<img className="operator lazyloaded" data-src={item.passenger.imageIntro} alt="Img" src={item.passenger.imageIntro} />
									<img className="sticker ls-is-cached lazyloaded" data-src="https://storage.googleapis.com/fe-production/images/sticker-covid.png" alt="chuyến xe an toàn covid-19" src="https://storage.googleapis.com/fe-production/images/sticker-covid.png" />
									<div className="confirm-ticket">
										<svg width={14} height={12} viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path fillRule="evenodd" clipRule="evenodd" d="M13.666 2v2.667c-.733 0-1.333.6-1.333 1.333 0 .734.6 1.334 1.333 1.334V10c0 .734-.6 1.334-1.333 1.334H1.666c-.733 0-1.333-.6-1.333-1.334V7.334a1.333 1.333 0 0 0 .006-2.667V2C.34 1.26.933.667 1.666.667h10.667c.733 0 1.333.593 1.333 1.333zM6.391 8.965c-.016.125.07.235.182.235a.18.18 0 0 0 .16-.103l.244-.475c.301-.586.832-1.619 1.595-3.098.07-.167 0-.235-.128-.235H7.322l.287-2.254c.016-.125-.07-.235-.182-.235a.183.183 0 0 0-.16.103l-.972 1.899c-.337.657-.616 1.2-.835 1.632l-.001.002c-.016.025-.173.275.1.275h1.12L6.39 8.965z" fill="#fff" />
										</svg>{" "}
										{item.passenger.confirmType}
										<div className="point" />
									</div>
								</div>
							</div>
							<div className="col-span-9 mb-10">
								<div className="bus-info flex justify-between">
									<div className="bus-name">
										<span className="bus-title">{item.passenger.name}</span>
										<button type="button" className="ant-btn bus-rating-button">
											<div className="bus-rating">
												<StarFilled />
												<span>
													{avgRatePassenger} ({item.passenger.passengerRate.length == 0 ? "" : item.passenger.passengerRate.length})
												</span>
											</div>
										</button>
									</div>
									<div class="fare">
										<div>{item.passenger.price.toLocaleString()} VNĐ</div>
									</div>
								</div>
								<div className="seat-type">{item.vehicle.name}</div>
								<div className="from-to">
									<svg className="TicketPC__LocationRouteSVG-sc-1mxgwjh-4 eKNjJr" xmlns="http://www.w3.org/2000/svg" width={14} height={74} viewBox="0 0 14 74">
										<path fill="none" stroke="#787878" strokeLinecap="round" strokeWidth={2} strokeDasharray="0 7" d="M7 13.5v46" />
										<g fill="none" stroke="#484848" strokeWidth={3}>
											<circle cx={7} cy={7} r={7} stroke="none" />
											<circle cx={7} cy={7} r="5.5" />
										</g>
										<path d="M7 58a5.953 5.953 0 0 0-6 5.891 5.657 5.657 0 0 0 .525 2.4 37.124 37.124 0 0 0 5.222 7.591.338.338 0 0 0 .506 0 37.142 37.142 0 0 0 5.222-7.582A5.655 5.655 0 0 0 13 63.9 5.953 5.953 0 0 0 7 58zm0 8.95a3.092 3.092 0 0 1-3.117-3.06 3.117 3.117 0 0 1 6.234 0A3.092 3.092 0 0 1 7 66.95z" fill="#787878" />
									</svg>
									<div className="from-to-content">
										<div className="content from">
											<div className="hour">{item.startTime}</div>
											<div className="place">• {item.trip.from.name}</div>
										</div>
										<div className="duration">5h30m</div>
										<div className="content to">
											<div className="hour">{item.endTime}</div>
											<div className="place">• {item.trip.to.name}</div>
										</div>
									</div>
								</div>
								<div className="flex flex-wrap" style={{width: "20%", marginRight: "auto"}}>
									<Tag color="#2db7f5" className="my-3">
										Xe chạy đúng giờ
									</Tag>
									<Tag color="red" className="my-3">
										Sạch sẽ
									</Tag>
									<Tag color="blue" className="my-3">
										{item.passenger.description}
									</Tag>
								</div>
								<div className="ticket_pc">
									<div className="info">
										<div className="seat-available ">{numberBlank} chỗ trống</div>
									</div>
									<div className="action">
										<button
											type="button"
											className="ant-btn btn-detail ant-btn-link"
											onClick={() => {
												handleExpandClick(item.id);
												dispatch(getImageVehicleAction(item.vehicleId));
											}}
										>
											<span>Thông tin chi tiết</span>
											<ExpandMore expand={item.openDetail} aria-expanded={item.openDetail} aria-label="show more">
												<ExpandMoreIcon />
											</ExpandMore>
										</button>
										<button
											data-tracking-event="selected_route"
											type="button"
											className="ant-btn btn-booking booking hover:bg-sky-700"
											onClick={() => {
												handleExpandStepClick(item.id);
												dispatch(getSeatVehicleAction(item.vehicleId));
												dispatch(getTimePointTripAction(item.id));
											}}
										>
											<span>{item.openBooking ? "Đóng" : "Chọn chuyến"}</span>
										</button>
									</div>
								</div>
							</div>
						</div>
						<Collapse in={item.openDetail} timeout="auto" unmountOnExit>
							<Details passenger={item.passenger} avgRate={avgRatePassenger} id={item.id} trip={item.trip} index={index} start={param.start} tripPassenger={item} />
							{/* {isLoadingSpin ? <LoadingSpin /> : <Details passenger={item.passenger} avgRate={avgRatePassenger} id={item.id} trip={item.trip} index={index} start={param.start} tripPassenger={item} />} */}
						</Collapse>
						<Collapse in={item.openBooking} timeout="auto" unmountOnExit>
							<StepBooking vehicle={item.vehicle} trip={item.trip} tripPassenger={item} />
						</Collapse>
					</Card>
				);
			}
		});
	};
	return (
		<div className="list_trips">
			<div className="trip-style">
				<h1 id="seo-heading">
					Đặt mua vé xe đi {tripRender.toStation} từ {tripRender.fromStation} :{listTripPassenger.filter((item) => item.status == "depart").length} chuyến
				</h1>
				<div className="sort">
					<span className="sort-label mr-5">Sắp xếp theo:</span>
					<button
						type="button"
						className="ant-btn"
						onClick={() => {
							let tripSort = {
								tripId: param.id,
								attribute: "startTime",
								type: "ASC",
							};
							dispatch(SortTimeTripPassengerAction(tripSort));
						}}
					>
						<span>Giờ sớm nhất</span>
					</button>
					<button
						type="button"
						className="ant-btn"
						onClick={() => {
							let tripSort = {
								tripId: param.id,
								attribute: "startTime",
								type: "DESC",
							};
							dispatch(SortTimeTripPassengerAction(tripSort));
						}}
					>
						<span>Giờ muộn nhất</span>
					</button>
					<button
						type="button"
						className="ant-btn"
						onClick={() => {
							let tripSort = {
								tripId: param.id,
								attribute: "price",
								type: "ASC",
							};
							dispatch(SortPriceTripPassengerAction(tripSort));
						}}
					>
						<span>Giá thấp nhất</span>
					</button>
					<button
						type="button"
						className="ant-btn"
						onClick={() => {
							let tripSort = {
								tripId: param.id,
								attribute: "price",
								type: "DESC",
							};
							dispatch(SortPriceTripPassengerAction(tripSort));
						}}
					>
						<span>Giá cao nhất</span>
					</button>
				</div>
				<div className="list_card_trips mt-5">{renderTripPassenger()}</div>
			</div>
		</div>
	);
}
