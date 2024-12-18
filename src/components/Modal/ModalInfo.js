import React from "react";
import {Modal, Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {HIDE_MODAL} from "../../redux/types/ModalTypes";

export default function ModalInfo() {
	const {visibleModal, title, content, width} = useSelector((state) => state.ModalReducer);
	const dispatch = useDispatch();
	return (
		<Modal
			title={title}
			centered
			visible={visibleModal}
			footer={null}
			width={width}
			onCancel={() => {
				dispatch({
					type: HIDE_MODAL,
				});
			}}
		>
			{content}
			<div className="text-center" style={{borderTop: "1px solid #f0f0f0"}}>
				<Button
					type="primary"
					className="mt-3"
					onClick={() => {
						dispatch({
							type: HIDE_MODAL,
						});
					}}
				>
					Đóng
				</Button>
			</div>
		</Modal>
	);
}
