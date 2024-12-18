import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LoadingButton from "@mui/lab/LoadingButton";
import {SELECT_TRIP, TRIP_RENDER} from "../../redux/types/BookingTypes";
import {getProvinceAction, getTripByUserAction, getTripPassengerAction} from "../../redux/actions/bookingAction";
import moment from "moment";
import {openNotificationWithIcon} from "../../util/lib/Nofication";
import {SET_LOADING_BUTTON, HIDE_LOADING_BUTTON} from "../../redux/types/LoadingTypes";

export default function InputSearchTrip(props) {
	let {listProvince, tripByUser, tripSearch} = useSelector((state) => state.BookingReducer);
	console.log("file: InputSearchTrip.js ~ line 17 ~ InputSearchTrip ~ tripSearch", tripSearch);
	let {loadingButton} = useSelector((state) => state.LoadingReducer);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProvinceAction());
	}, []);
	const ListProvince = listProvince?.map((item, index) => {
		if (item.name.includes("Tỉnh")) {
			return item.name.substring(5, item.name.length);
		} else if (item.name.includes("Thành phố")) {
			return item.name.substring(10, item.name.length);
		} else {
			return item.name;
		}
	});
	const handleClick = () => {
		if (tripSearch.fromStation == "" || tripSearch.toStation == "" || tripSearch.startTime == "") {
			openNotificationWithIcon("error");
		} else {
			dispatch({
				type: SET_LOADING_BUTTON,
			});
			dispatch({
				type: TRIP_RENDER,
				tripRender: tripSearch,
			});
			setTimeout(function () {
				dispatch(getTripByUserAction(tripSearch));
			}, 2000);
		}
	};

	return (
		<div className="w-full search_trip">
			<div className="flex search_trips_input grid grid-cols-6">
				<div className="search_input col-span-5">
					<div className="flex">
						<div className="input-1">
							<Autocomplete
								value={tripSearch.fromStation}
								disablePortal
								id="combo-box-demo"
								onChange={(event, newValue) => {
									dispatch({
										type: SELECT_TRIP,
										value: newValue,
										key: "fromStation",
									});
								}}
								options={ListProvince}
								sx={{width: 300}}
								renderInput={(params) => <TextField {...params} label="Điểm đi" />}
							/>
						</div>
						<div className="input-2">
							<Autocomplete
								value={tripSearch.toStation}
								disablePortal
								id="combo-box-demo"
								onChange={(event, newValue) => {
									dispatch({
										type: SELECT_TRIP,
										value: newValue,
										key: "toStation",
									});
								}}
								options={ListProvince}
								sx={{width: 300}}
								renderInput={(params) => <TextField {...params} label="Điểm đến" />}
							/>
						</div>
						<div className="input-3">
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									label="Ngày đi"
									value={tripSearch.startTime}
									views={["year", "month", "day"]}
									format="DD-MM-YYYY"
									onChange={(newValue) => {
										dispatch({
											type: SELECT_TRIP,
											value: moment(newValue).format("YYYY-MM-DD"),
											key: "startTime",
										});
									}}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</div>
					</div>
				</div>
				<div className="search_trips_button col-span-1 text-center">
					<LoadingButton className="w-full h-full" color="primary" onClick={handleClick} loading={loadingButton} loadingPosition="start" variant="contained">
						Tìm chuyến
					</LoadingButton>
				</div>
			</div>
		</div>
	);
}
