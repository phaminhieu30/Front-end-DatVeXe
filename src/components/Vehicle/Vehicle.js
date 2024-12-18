import React, {useEffect, useState} from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {useDispatch, useSelector} from "react-redux";

import Tooltip from "@mui/material/Tooltip";
import {bookingSeatAction, bookingTicketAction} from "../../redux/actions/bookingAction";
import Wheel from "../Booking/Seat/Wheel";
import Seat from "../Booking/Seat/Seat";
import SeatBooked from "../Booking/Seat/SeatBooked";
import SeatSelect from "../Booking/Seat/SeatSelect";
import "../../Sass/css/Vehicle.css";

export default function (props) {
	const dispatch = useDispatch();
	const {listSeatSelected} = useSelector((state) => state.BookingReducer);

	const renderSeat = (floors) => {
		return props.vehicle.seatVehicle.map((item, index) => {
			let classDaDat = item.status === "đã đặt" ? "gheDaChon" : "";
			let classDangDat = "";
			let indexSeatSelect = listSeatSelected.findIndex((seatSelect) => seatSelect.id == item.id);
			if (indexSeatSelect != -1) {
				classDangDat = "GheDangChon";
			}
			let disabled = item.status === "đã đặt" ? true : false;
			let arrClass = [classDaDat, classDangDat];
			if (item.floor === floors) {
				return (
					<Tooltip title={`Ghế: ${item.name}, Giá: ${item.price.toLocaleString()} VNĐ`} placement="top">
						<button className="seat" style={{border: "none"}} key={index} disabled={disabled}>
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
	return (
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
					<div />
				</div>
				<div className="seat-template flex justify-center items-center">{renderFloor()}</div>
			</div>
		</div>
	);
}
