import React, {useEffect, useState} from "react";
import {List, Avatar, Pagination} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getAllTicketByTrip} from "../../redux/actions/ticketAction";
import moment from "moment";

export default function AdminDetailTicket(props) {
	const dispatch = useDispatch();
	const {listTicketTrip} = useSelector((state) => state.TicketReducer);
	console.log("listTicketTrip", listTicketTrip);
	useEffect(() => {
		dispatch(getAllTicketByTrip(props.id));
	}, [props.id]);
	const [minValue, setminValue] = useState(0);
	const [maxValue, setmaxValue] = useState(1);
	const numEachPage = 4;

	let dataReduce = listTicketTrip.slice(minValue, maxValue);
	const handleChange = (value) => {
		setminValue((value - 1) * numEachPage);
		setmaxValue(value * numEachPage);
	};
	const renderPoint = (ticket, typePoint) => {
		let point = ticket.ticketPointId.find((obj) => {
			return obj.typePoint == typePoint;
		});

		return (
			<span>
				{point?.timepointTicket?.point.name} - {point?.timepointTicket?.point.address}
			</span>
		);
	};
	const renderSeat = (ticket) => {
		return ticket.ticketSeatId.map((item, index) => {
			return (
				<div>
					{item?.seatofticket?.name}, tầng {item?.seatofticket?.floor}
				</div>
			);
		});
	};
	return (
		<div>
			<div className="text-xl">
				Tổng số vé : <span className="font-bold">{listTicketTrip.length}</span>
			</div>
			<List
				itemLayout="horizontal"
				dataSource={dataReduce}
				renderItem={(item) => (
					<List.Item>
						<List.Item.Meta
							avatar={<Avatar src={item.user.avatar} />}
							title={
								<a>
									{item.user.name} - Số Điện Thoại {item.user.numberPhone} - Vé số {item.id}
								</a>
							}
							description={
								<div className="flex justify-around">
									<p className="font-semibold">Đặt Lúc : {moment(item.createdAt).format("DD-MM-YYYY HH:mm:ss")}</p>
									<p className="font-bold">Số ghế: {renderSeat(item)} </p>
									<p className="font-bold">Đón : ({renderPoint(item, "pickup")})</p>
									<p className="font-bold">Trả : ({renderPoint(item, "dropoff")})</p>
								</div>
							}
						/>
					</List.Item>
				)}
			/>
			<div className="flex justify-end mt-3">
				<Pagination
					defaultCurrent={2}
					defaultPageSize={numEachPage} //default size of page
					onChange={handleChange}
					total={10} //total number of card data available
				/>
			</div>
		</div>
	);
}
