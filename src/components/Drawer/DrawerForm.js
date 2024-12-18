import React from "react";
import {Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {CLOSE_DRAWER} from "../../redux/types/DrawerTypes";
const {Option} = Select;

export default function DrawerForm() {
	const dispatch = useDispatch();
	const {isOpenDrawer, title, content} = useSelector((state) => state.DrawerReducer);
	const onClose = () => {
		dispatch({
			type: CLOSE_DRAWER,
		});
	};
	return (
		<Drawer title={title} width={720} onClose={onClose} visible={isOpenDrawer} bodyStyle={{paddingBottom: 80}}>
			{content}
		</Drawer>
	);
}
