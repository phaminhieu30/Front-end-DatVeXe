import React, {Fragment} from "react";
import {Spin} from "antd";
import {useSelector} from "react-redux";

export default function LoadingSpinFilter() {
	const {isLoadingSpinFilter} = useSelector((state) => state.LoadingReducer);

	return <Fragment>{isLoadingSpinFilter ? <Spin style={{width: "100%", height: "200px", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 99}} /> : ""};</Fragment>;
}
