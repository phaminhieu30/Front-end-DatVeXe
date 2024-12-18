import React, {useEffect, useState} from "react";
import ReactMapboxGl, {Layer, Feature, Marker} from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {Tooltip, Button, Divider} from "antd";

import Axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {SET_ADDRESS_POINT} from "../../redux/types/PointTypes";

export default function MapPoint(props) {
	const dispatch = useDispatch();
	const {address} = useSelector((state) => state.PointReducer);
	console.log("file: MapPoint.js ~ line 13 ~ MapPoint ~ address", address);
	let {item} = props;
	const Map = ReactMapboxGl({
		accessToken: "pk.eyJ1IjoicGh1MjAwMCIsImEiOiJjbDJpMHFyMGwwYmVhM2NxNjF4bHFweGN2In0.7I6NlXWnksUc-rWyuWhQoA",
	});

	useEffect(() => {
		let arrPosition = [];
		Axios?.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${item.name}${item.address}.json?country=vn&limit=10&proximity=ip&types=place%2Cpostcode%2Caddress%2Cdistrict%2Cregion%2Clocality%2Ccountry%2Cpoi%2Cneighborhood&access_token=pk.eyJ1IjoicGh1MjAwMCIsImEiOiJjbDJpMHFyMGwwYmVhM2NxNjF4bHFweGN2In0.7I6NlXWnksUc-rWyuWhQoA`)

			.then((res) => {
				// arrPosition = {long: res?.data?.features[0]?.center[0], lat: res?.data?.features[0]?.center[1], placename: item?.address};
				arrPosition.push(res?.data?.features[0]?.center[0]);
				arrPosition.push(res?.data?.features[0]?.center[1]);
				dispatch({
					type: SET_ADDRESS_POINT,
					address: arrPosition,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}, [item]);

	return (
		<>
			{address.length > 0 ? (
				<Map
					style="mapbox://styles/mapbox/streets-v9"
					containerStyle={{
						height: "300px",
						width: "100%",
					}}
					zoom={[15]}
					center={address}
				>
					<Tooltip color={"#108ee9"} title={item.address} key={1}>
						<Marker coordinates={address} anchor="bottom">
							<img src="https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png" style={{width: "50px", height: "50px"}} />
						</Marker>
					</Tooltip>
				</Map>
			) : (
				<Map
					style="mapbox://styles/mapbox/streets-v9"
					containerStyle={{
						height: "300px",
						width: "100%",
					}}
					zoom={[15]}
				></Map>
			)}
		</>
	);
}
