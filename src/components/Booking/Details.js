import React, {createElement, useEffect, useState} from "react";
import {Tabs, List, Rate, Comment, Tooltip, Avatar} from "antd";
import moment from "moment";
import {DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled} from "@ant-design/icons";
import _ from "lodash";
import Slider from "react-slick";
import "../../Sass/css/Details.css";
import {getImgVehicleAction} from "../../redux/actions/bookingAction";
import {getCommentPassengerAction} from "../../redux/actions/commentAction";
import {useDispatch, useSelector} from "react-redux";
import LoadingSpin from "../Loading/LoadingSpin";
import {getTimePointTripAction} from "../../redux/actions/timePointAction";
const {TabPane} = Tabs;
function SampleNextArrow(props) {
	const {className, style, onClick} = props;
	return <div className={className} style={{...style, display: "block", background: "red"}} onClick={onClick} />;
}

function SamplePrevArrow(props) {
	const {className, style, onClick} = props;z
	return <div className={className} style={{...style, display: "block", background: "green"}} onClick={onClick} />;
}
export default function Details(props) {
	const {listImageVehicle} = useSelector((state) => state.vehicleReducer);
	const {listCommentPassenger} = useSelector((state) => state.CommentReducer);
	console.log("file: Details.js ~ line 26 ~ Details ~ listCommentPassenger", listCommentPassenger);
	const {timePointTrip} = useSelector((state) => state.timePointReducer);
	const {isLoadingSpin} = useSelector((state) => state.LoadingReducer);
	console.log("timePointTrip", timePointTrip);
	console.log(props.tripPassenger);
	const dispatch = useDispatch();
	const renderImg = () => {
		return listImageVehicle?.map((item, index) => {
			return (
				<div key={index}>
					<img src={item.link} alt />
				</div>
			);
		});
	};

	const renderComment = () => {
		return listCommentPassenger?.map((item, index) => {
			let arrAllRate = item.userComment.userRate.filter((rate) => rate.passengerId == item.passengerId);
			let rate = 0;
			if (arrAllRate.length > 0) {
				rate = _.meanBy(arrAllRate, (rate) => rate.numberRate);
			}
			return (
				<Comment
					author={
						<a>
							{item.userComment.name}
							<div>{rate == 0 ? <p>Không có đánh giá</p> : <Rate disabled defaultValue={rate} style={{fontSize: 10}} />}</div>
						</a>
					}
					avatar={<Avatar src={item.userComment.avatar} alt={item.userComment.name} />}
					content={<p>{item.content}</p>}
					datetime={
						<Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
							<span>{moment().fromNow()}</span>
						</Tooltip>
					}
				/>
			);
		});
	};

	const renderPoint = (type) => {
		return timePointTrip
			.filter((timepoint) => timepoint.type == type)
			.map((item, index) => {
				return (
					<div className="group-item">
						<span className="time font-bold" style={{fontSize: 12}}>
							{item.time}
						</span>
						<span className="name"> • {item.point.name}</span>
					</div>
				);
			});
	};

	const data = [
		{
			title: (
				<div className="img-name flex items-center">
					<img src="https://static.vexere.com/production/utilities/1610093076560.png" alt="Khử trùng xe" width={32} height={32} className="mr-2" />
					<div className="name">An toàn mùa covid</div>
				</div>
			),
			description: (
				<div className="description">
					Là chương trình bảo vệ an toàn cho hành khách sử dụng dịch vụ của VeXeRe trong mùa dịch Covid. VeXeRe đồng hành các nhà xe đối tác triển khai biện pháp bảo vệ an toàn cho hành khách, như sau: (1) Kiểm tra thân nhiệt hành khách trước khi lên xe
					<br />
					(2) Trang bị nước rửa tay;
					<br />
					(3) Có đảm bảo khuyến cáo tất cả hành khách đeo khẩu trang khi lên xe; (4) Có thực hiện khử trùng xe
					<br />
					(5) Tài xế và nhân viên đã được tiêm vắc xin
				</div>
			),
		},
		{
			title: (
				<div className="img-name flex items-center">
					<img src="https://static.vexere.com/production/utilities/1609837962216.png" alt="Khử trùng xe" width={32} height={32} className="mr-2" />
					<div className="name">Khử trùng xe</div>
				</div>
			),
			description: <div className="description">Nhà xe có thực hiện phun khử trùng Nano Bạc lên xe nhằm bảo vệ an toàn cho hành khách mùa Covid</div>,
		},
		{
			title: (
				<div className="img-name flex items-center">
					<img src="https://static.vexere.com/production/utilities/1609837921462.png" alt="Khử trùng xe" width={32} height={32} className="mr-2" />
					<div className="name">Nước rửa tay</div>
				</div>
			),
			description: <div className="description">Nhà xe có trang bị nước rửa tay diệt khuẩn trước khi lên xe và trong xe</div>,
		},
		{
			title: (
				<div className="img-name flex items-center">
					<img src="https://static.vexere.com/production/utilities/1609837906714.png" alt="Khử trùng xe" width={32} height={32} className="mr-2" />
					<div className="name">Đo thân nhiệt</div>
				</div>
			),
			description: <div className="description">Hành khách sẽ được đo thân nhiệt trước khi lên xe để xác định không nghi nhiễm/ lan truyền vi rút Covid cho hành khách khác.</div>,
		},
	];
	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};
	return (
		<div className="details">
			<Tabs
				defaultActiveKey="1"
				centered
				onChange={(e) => {
					if (e == 5) {
						dispatch(getCommentPassengerAction(props.tripPassenger.passengerId));
					} else if (e == 3) {
						dispatch(getTimePointTripAction(props.tripPassenger.id));
					}
				}}
			>
				<TabPane tab="Hình Ảnh" key="1">
					{isLoadingSpin ? <LoadingSpin /> : <Slider {...settings}>{renderImg()}</Slider>}
				</TabPane>
				<TabPane tab="Tiện ích" key="2">
					<List
						itemLayout="horizontal"
						dataSource={data}
						renderItem={(item) => (
							<List.Item>
								<List.Item.Meta title={<a href="https://ant.design">{item.title}</a>} description={item.description} />
							</List.Item>
						)}
					/>
				</TabPane>
				<TabPane tab="Điểm đón trả" key="3" className="from-start">
					{isLoadingSpin ? (
						<LoadingSpin />
					) : (
						<>
							<div className="ant-row header">
								<div className="note">Lưu ý</div>
								<div className="header-content">Các mốc thời gian đón, trả bên dưới là thời gian dự kiến. Lịch này có thể thay đổi tùy tình hình thưc tế.</div>
							</div>
							<div className="grid grid-cols-2 text-center">
								<div>
									<div className="content-title font-bold text-sm">Điểm đón</div>
									<div className="group">{renderPoint("pickup")}</div>
								</div>
								<div>
									<div className="content-title font-bold text-sm">Điểm trả</div>
									<div className="group">{renderPoint("dropoff")}</div>
								</div>
							</div>
						</>
					)}
				</TabPane>
				<TabPane tab="Chính sách" key="4">
					<div className="policy undefined">
						<p className="title font-bold text-xl">Chính sách hủy vé</p>
						<div className="cancel_policy">
							<div className="cancellation-timeline">
								<div className="cancellation-policy-period w-full">
									<div style={{background: "rgb(0, 96, 196)"}} />
									<p>Không mất phí</p>
								</div>
								<div className="mark" style={{left: "calc(33.3333% - 33px)"}}>
									<strong>{props.tripPassenger.startTime}</strong>
									<span>{moment(props?.start).format("DD-MM-YYYY")}</span>
								</div>
								<div className="cancellation-policy-period">
									<div style={{background: "rgb(255, 199, 0)"}} />
									<p>Phí hủy 20%</p>
								</div>
								<div className="mark" style={{left: "calc(66.6667% - 33px)"}}>
									<strong>{props.tripPassenger.endTime}</strong>
									<span>{moment(props?.start).format("DD-MM-YYYY")}</span>
								</div>
								<div className="cancellation-policy-period w-full">
									<div style={{background: "rgb(241, 0, 0)"}} />
									<p>Phí hủy 100%</p>
								</div>
							</div>
							<div className="departure">Khởi hành</div>
							<div className="circle" />
							<div className="circle today" />
						</div>
						<div className="note">
							<strong>Ghi Chú : </strong>Phí huỷ sẽ được tính trên giá gốc, không giảm trừ khuyến mãi hoặc giảm giá; đồng thời không vượt quá số tiền quý khách đã thanh toán.
						</div>
					</div>
				</TabPane>
				<TabPane tab="Đánh giá" key="5" className="review">
					{isLoadingSpin ? (
						<LoadingSpin />
					) : (
						<>
							<div className="rating">
								<div className="overall-rating">
									<i aria-label="icon: star" className="anticon anticon-star">
										<svg viewBox="64 64 896 896" className data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false">
											<path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
										</svg>
									</i>
									<span>{props.avgRate}</span>
								</div>
								<Rate allowClear={false} defaultValue={props.avgRate} disabled />
								<span className="ant-rate-text">{props.passenger?.passengerRate.length} đánh giá</span>
							</div>
							<div className="ant-row filter-rate">
								<button type="button" className="ant-btn Reviews__ButtonFilter-sc-1uhksgp-1 lmFGPV button-filter active" ant-click-animating-without-extra-node="false">
									<span>Tất cả ({listCommentPassenger?.length == 0 ? 0 : listCommentPassenger?.length})</span>
								</button>
								<button type="button" className="ant-btn Reviews__ButtonFilter-sc-1uhksgp-1 lmFGPV button-filter " ant-click-animating-without-extra-node="false">
									<span>Có nhận xét ({listCommentPassenger?.length == 0 ? 0 : listCommentPassenger?.length})</span>
								</button>
								<button type="button" className="ant-btn Reviews__ButtonFilter-sc-1uhksgp-1 lmFGPV button-filter " ant-click-animating-without-extra-node="false">
									<span>5</span>
									<i aria-label="icon: star" className="anticon anticon-star">
										<svg viewBox="64 64 896 896" className data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false">
											<path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
										</svg>
									</i>
									<span className="review-count">(91)</span>
								</button>
								<button type="button" className="ant-btn Reviews__ButtonFilter-sc-1uhksgp-1 lmFGPV button-filter ">
									<span>4</span>
									<i aria-label="icon: star" className="anticon anticon-star">
										<svg viewBox="64 64 896 896" className data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false">
											<path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
										</svg>
									</i>
									<span className="review-count">(13)</span>
								</button>
								<button type="button" className="ant-btn Reviews__ButtonFilter-sc-1uhksgp-1 lmFGPV button-filter ">
									<span>3</span>
									<i aria-label="icon: star" className="anticon anticon-star">
										<svg viewBox="64 64 896 896" className data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false">
											<path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
										</svg>
									</i>
									<span className="review-count">(5)</span>
								</button>
								<button type="button" className="ant-btn Reviews__ButtonFilter-sc-1uhksgp-1 lmFGPV button-filter ">
									<span>2</span>
									<i aria-label="icon: star" className="anticon anticon-star">
										<svg viewBox="64 64 896 896" className data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false">
											<path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
										</svg>
									</i>
									<span className="review-count">(0)</span>
								</button>
								<button type="button" className="ant-btn Reviews__ButtonFilter-sc-1uhksgp-1 lmFGPV button-filter ">
									<span>1</span>
									<i aria-label="icon: star" className="anticon anticon-star">
										<svg viewBox="64 64 896 896" className data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false">
											<path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
										</svg>
									</i>
									<span className="review-count">(1)</span>
								</button>
							</div>
							<div>{renderComment()}</div>
						</>
					)}
				</TabPane>
			</Tabs>
		</div>
	);
}
