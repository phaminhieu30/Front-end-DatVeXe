import React, {useEffect} from "react";
import {LineChart, PieChart} from "react-chartkick";
import "chartkick/chart.js";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {getDetailPassenger} from "../../redux/actions/passengerAction";

export default function ChartTicket(props) {
	const {id} = props;
	const dispatch = useDispatch();
	const {passengerDetail} = useSelector((state) => state.PassengerReducer);

	useEffect(() => {
		dispatch(getDetailPassenger(id));
	}, [id]);
	const dataFunc = () => {
		let dataTotal = [];
		let dataDepart = ["Chuyến Sắp Đi"];
		let dataRunning = ["Chuyến đang đi"];
		let dataSuccess = ["Chuyến Hoàn Thành"];
		let dataCancel = ["Chuyến Đã Hủy"];
		let lengthDepart = 0;
		let lengthRunning = 0;
		let lengthSuccess = 0;
		let lengthCancel = 0;
		passengerDetail?.passenger?.forEach((item) => {
			if (item.status == "depart") {
				lengthDepart += 1;
			}
			if (item.status == "running") {
				lengthRunning += 1;
			}
			if (item.status == "success") {
				lengthSuccess += 1;
			}
			if (item.status == "cancel") {
				lengthCancel += 1;
			}
		});
		dataCancel.push(lengthCancel);
		dataDepart.push(lengthDepart);
		dataRunning.push(lengthRunning);
		dataSuccess.push(lengthSuccess);
		dataTotal.push(dataCancel, dataDepart, dataRunning, dataSuccess);
		return dataTotal;
	};
	let data = dataFunc();
	return (
		<div>
			<PieChart data={data} />
		</div>
	);
}
