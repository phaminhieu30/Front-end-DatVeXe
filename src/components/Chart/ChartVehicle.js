import React, {useEffect} from "react";
import {LineChart, PieChart} from "react-chartkick";
import "chartkick/chart.js";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {getDetailPassenger} from "../../redux/actions/passengerAction";

export default function ChartVehicle(props) {
	const {id} = props;
	const dispatch = useDispatch();
	const {passengerDetail} = useSelector((state) => state.PassengerReducer);
	console.log("file: ChartTicket.js ~ line 12 ~ ChartTicket ~ passengerDetail", passengerDetail);

	useEffect(() => {
		dispatch(getDetailPassenger(id));
	}, [id]);
	const dataFunc = () => {
		let dataTotal = [];
		let dataLimouse = ["Limouse"];
		let dataNormal = ["Normal"];

		let lengthLimouse = 0;
		let lengthNormal = 0;

		passengerDetail?.passengerCar?.forEach((item) => {
			if (item.type == "limouse") {
				lengthLimouse += 1;
			}
			if (item.type == "normal") {
				lengthNormal += 1;
			}
		});
		dataLimouse.push(lengthLimouse);
		dataNormal.push(lengthNormal);
		dataTotal.push(dataLimouse, dataNormal);
		return dataTotal;
	};
	let data = dataFunc();
	return (
		<div>
			<PieChart data={data} />
		</div>
	);
}
