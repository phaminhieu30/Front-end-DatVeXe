import React, {useCallback, useEffect, useRef, useState} from "react";
import {Upload, Modal} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {DOMAIN} from "../../util/settings/config";
import {useDispatch, useSelector} from "react-redux";
import {CreateImgVehicleAction, deleteImgVehicleAction, getDetailVehicleAction, getDetailVehicleOfImageAction} from "../../redux/actions/vehicleAction";
import {CANCEL_PREVIEW, HANDLE_CHANGE_FILE, HANDLE_PREVIEW, SET_FILELIST} from "../../redux/types/VehicleTypes";
function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}
export default function ImageVehicle(props) {
	const {id} = props;
	const dispatch = useDispatch();
	const {vehicleDetail, fileImageVehicle} = useSelector((state) => state.vehicleReducer);

	useEffect(() => {
		dispatch(getDetailVehicleOfImageAction(id));
	}, [id]);

	// const [state, setState] = useState({
	// 	previewVisible: false,
	// 	previewImage: "",
	// 	previewTitle: "",
	// 	fileList: [
	// 		{
	// 			uid: "-1",
	// 			name: "image.png",
	// 			status: "done",
	// 			url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
	// 		},
	// 		{
	// 			uid: "-2",
	// 			name: "image.png",
	// 			status: "done",
	// 			url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
	// 		},
	// 		// {
	// 		// 	uid: "-3",
	// 		// 	name: "image.png",
	// 		// 	status: "done",
	// 		// 	url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
	// 		// },
	// 		// {
	// 		// 	uid: "-4",
	// 		// 	name: "image.png",
	// 		// 	status: "done",
	// 		// 	url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
	// 		// },
	// 		{
	// 			uid: "-xxx",
	// 			percent: 50,
	// 			name: "image.png",
	// 			status: "uploading",
	// 			url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
	// 		},
	// 		// {
	// 		// 	uid: "-5",
	// 		// 	name: "image.png",
	// 		// 	status: "error",
	// 		// },
	// 	],
	// });

	const handleCancel = (e) => {
		dispatch({type: CANCEL_PREVIEW});
	};
	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		dispatch({
			type: HANDLE_PREVIEW,
			previewImage: file.url || file.preview,
			previewVisible: true,
			previewTitle: file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
		});
	};

	const handleChange = (e) => {
		dispatch({
			type: HANDLE_CHANGE_FILE,
			fileList: e.fileList,
		});
	};
	const uploadChange = (e) => {
		var bodyFormData = new FormData();
		bodyFormData.append("imagevehicle", e);
		dispatch(CreateImgVehicleAction(vehicleDetail.id, bodyFormData));
		return true;
	};
	const remove = (e) => {
		dispatch(deleteImgVehicleAction(e.id));
	};
	// const {previewVisible, previewImage, fileList, previewTitle} = fileImageVehicle;
	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{marginTop: 8}}>Upload</div>
		</div>
	);

	return (
		<>
			<Upload listType="picture-card" fileList={fileImageVehicle?.fileList} onPreview={handlePreview} onChange={handleChange} onRemove={remove} beforeUpload={uploadChange}>
				{fileImageVehicle.fileList?.length >= 8 ? null : uploadButton}
			</Upload>
			<Modal visible={fileImageVehicle.previewVisible} title={fileImageVehicle.previewTitle} footer={null} onCancel={handleCancel}>
				<img alt="example" style={{width: "100%"}} src={fileImageVehicle.previewImage} />
			</Modal>
		</>
	);
}
