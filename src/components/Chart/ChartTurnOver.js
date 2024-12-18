import React, {useEffect} from "react";
import {LineChart, PieChart} from "react-chartkick";
import "chartkick/chart.js";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {getDetailPassenger} from "../../redux/actions/passengerAction";
export default function ChartTurnOver(props) {
	const {id} = props;
	const dispatch = useDispatch();
	const {passengerDetail} = useSelector((state) => state.PassengerReducer);
	console.log("file: ChartTurnOver.js ~ line 10 ~ ChartTurnOver ~ passengerDetail", passengerDetail);

	useEffect(() => {
		dispatch(getDetailPassenger(id));
	}, [id]);

	const Mydata = () => {
		let dataChange = {};

		passengerDetail?.passenger?.forEach((item) => {
			item.tripPassengerTicket.forEach((ticket, index) => {
				var dateFM = moment(ticket.createdAt).format("YYYY-MM-DD");
				let itempush = {[dateFM]: ticket?.totalAmount};
				dataChange = {...dataChange, ...itempush};
			});
		});

		return dataChange;
	};
	let data2 = Mydata();
	return (
		<div>
			<LineChart data={data2} />
		</div>
	);
}
