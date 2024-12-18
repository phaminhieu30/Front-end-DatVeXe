import React, {memo, useEffect, useState} from "react";
import {List, Avatar, Image} from "antd";
import {date} from "yup";
import {useDispatch, useSelector} from "react-redux";
import {getDetailPassenger} from "../../redux/actions/passengerAction";
import {PREVIEW_FALSE, PREVIEW_TRUE} from "../../redux/types/PassengerTypes";

export default function DetailsVehicleOfPassengerCar(props) {
	const {id} = props;
	const dispatch = useDispatch();
	const {passengerDetail} = useSelector((state) => state.PassengerReducer);
	useEffect(() => {
		dispatch(getDetailPassenger(id));
	}, [id]);
	const renderImgVehicle = (vehicle) => {
		return (
			<>
				<Image
					preview={{visible: vehicle.visible}}
					width={75}
					height={60}
					style={{borderRadius: "50%"}}
					src={vehicle?.vehicleOfImage[0]?.link}
					onClick={() => {
						console.log(vehicle.id);
						dispatch({
							type: PREVIEW_TRUE,
							vehicleId: vehicle.id,
						});

						// console.log(vehicle[index].visible);
					}}
				/>
				<div style={{display: "none"}}>
					<Image.PreviewGroup
						preview={{
							visible: vehicle.visible,
							onVisibleChange: (vis) => {
								dispatch({
									type: PREVIEW_FALSE,
									vehicleId: vehicle.id,
								});
							},
						}}
					>
						{vehicle.vehicleOfImage.map((item, index) => {
							return <Image src={item.link} key={index} />;
						})}
					</Image.PreviewGroup>
				</div>
			</>
		);
	};
	return (
		<List
			itemLayout="horizontal"
			dataSource={passengerDetail.passengerCar}
			renderItem={(item) => (
				<List.Item>
					<List.Item.Meta
						avatar={renderImgVehicle(item)}
						title={<a>{item.name}</a>}
						description={
							<div>
								<p className="m-0">{item.description}</p>
								<div>
									Số tầng : {item.numberFloors} <span className="font-bold ml-3">Loại xe</span> : {item.type}
								</div>
							</div>
						}
					/>
				</List.Item>
			)}
		/>
	);
}
