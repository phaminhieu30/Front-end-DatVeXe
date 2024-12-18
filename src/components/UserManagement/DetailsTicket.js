import React from "react";
import {Descriptions, Badge} from "antd";
import moment from "moment";

export default function DetailsTicket(props) {
	let {ticket} = props;

	const renderPoint = (typePoint) => {
		let point = ticket.ticketPointId.find((obj) => {
			return obj.typePoint == typePoint;
		});

		return (
			<span>
				{point?.timepointTicket?.point.name} - {point?.timepointTicket?.point.address}
			</span>
		);
	};
	const renderSeat = () => {
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
			<Descriptions title="Thông tin vé" layout="vertical" bordered labelStyle={{fontWeight: "bold", fontSize: 16}} contentStyle={{fontSize: 12}}>
				<Descriptions.Item label="Mã Vé">Vé số {ticket.id}</Descriptions.Item>
				<Descriptions.Item label="Trung tâm nhận vé">{ticket.tripPassengerTicket.trip.from.name}</Descriptions.Item>
				<Descriptions.Item label="Họ tên">{ticket.user.name}</Descriptions.Item>
				<Descriptions.Item label="Số điện thoại người đặt">{ticket.user.numberPhone}</Descriptions.Item>
				<Descriptions.Item label="Thời gian đặt vé">{moment(ticket.createAt).format("DD-MM-YYYY hh:mm:ss")}</Descriptions.Item>
				<Descriptions.Item label="Nhà xe">{ticket.tripPassengerTicket.passenger.name}</Descriptions.Item>
				<Descriptions.Item label="Tên xe">{ticket.tripPassengerTicket.vehicle.name}</Descriptions.Item>
				<Descriptions.Item label="Hình ảnh xe">
					<div>
						{ticket.tripPassengerTicket.vehicle.vehicleOfImage.map((item, index) => {
							return <img src={item.link} alt width={60} height={50} />;
						})}
					</div>
				</Descriptions.Item>
				<Descriptions.Item label="Khởi hành (dự kiến)">
					{moment(ticket.tripPassengerTicket.trip?.startTime).format("DD-MM-YYYY")} {ticket.tripPassengerTicket.startTime}
				</Descriptions.Item>
				<Descriptions.Item label="Kết thúc (dự kiến)">
					{moment(ticket.tripPassengerTicket.trip?.endTime).format("DD-MM-YYYY")} {ticket.tripPassengerTicket.endTime}
				</Descriptions.Item>
				<Descriptions.Item label="Điểm đón">{renderPoint("dropoff")}</Descriptions.Item>
				<Descriptions.Item label="Điểm trả">{renderPoint("pickup")}</Descriptions.Item>
				<Descriptions.Item label="Trạng thái vé" span={3}>
					<Badge status="processing" text={ticket.status} />
				</Descriptions.Item>
				<Descriptions.Item label="Ghế đã đặt">{renderSeat()}</Descriptions.Item>
				<Descriptions.Item label="Tổng tiền">{ticket.totalAmount?.toLocaleString()} VNĐ</Descriptions.Item>
				<Descriptions.Item label="Lưu ý">Mọi thủ tục vui lòng đến nhà xe thông tin trên vé . Nhà xe không chịu trách nhiệm</Descriptions.Item>
			</Descriptions>
			,
		</div>
	);
}
