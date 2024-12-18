import React, {Fragment} from "react";
import {Spin} from "antd";
import {useSelector} from "react-redux";

export default function LoadingSpin() {
	const {isLoadingSpin} = useSelector((state) => state.LoadingReducer);

	return <Fragment>{isLoadingSpin ? <Spin style={{width: "100%", height: "200px", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 99}} /> : ""};</Fragment>;
}
