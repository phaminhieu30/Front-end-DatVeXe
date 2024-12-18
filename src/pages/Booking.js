import React, {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import FilterTrips from "../components/Booking/FilterTrips";
import ListTrips from "../components/Booking/ListTrips";
import InputSearchTrip from "../components/Input/InputSearchTrip";
import Loading from "../components/Loading/Loading";
import LoadingSpin from "../components/Loading/LoadingSpin";
import LoadingSpinFilter from "../components/Loading/LoadingSpinFilter";
import {getTripPassengerAction} from "../redux/actions/bookingAction";
import {getDetailTripAction} from "../redux/actions/tripAction";
import "../Sass/css/Booking.css";
export default function Booking(props) {
	let {tripSearch, listTripPassenger, tripByUser, tripRender} = useSelector((state) => state.BookingReducer);
	let {tripDetail} = useSelector((state) => state.TripReducer);

	let {isLoading} = useSelector((state) => state.LoadingReducer);
	const {isLoadingSpinFilter} = useSelector((state) => state.LoadingReducer);
	console.log(tripDetail);
	const {id} = props.match.params;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getTripPassengerAction(id));
		dispatch(getDetailTripAction(id));
	}, []);
	return (
		<Fragment>
			<div className="booking_pages">
				<div className="booking_title mb-5">
					<a href="https://vexere.com/vi-VN"> {/* */}Vé xe khách</a>
					<span>
						{" "}
						&gt; xe đi {tripRender.fromStation} từ {tripRender.toStation}
					</span>
				</div>
				<InputSearchTrip id={id} />
				{isLoading ? (
					<Loading />
				) : (
					<Fragment>
						<a target="_blank" href="#" className="hoanve mb-10">
							VeXeRe - Cam kết hoàn 150% nếu nhà xe không giữ vé
							<img src="https://storage.googleapis.com/fe-production/svgIcon/error_outline.svg" alt="150%" />
						</a>
						<div className="grid grid-cols-12">
							<div className="col-span-4">
								<FilterTrips id={id} />
							</div>
							{isLoadingSpinFilter ? (
								<div className="col-span-8">
									<LoadingSpinFilter />
								</div>
							) : (
								<div className="col-span-8">
									<ListTrips param={props.match.params} tripDetail={tripDetail} />
								</div>
							)}
						</div>
					</Fragment>
				)}
			</div>
		</Fragment>
	);
}
