import React from "react";
import "../../Sass/css/Footer.css";
export default function Footer() {
	return (
		<>
			<footer>
				<div className="footer_content">
					<hr />
					<div className="footer_main grid grid-cols-4 gap-6">
						<div className="footer_about">
							<div className="footer_title">Liên hệ</div>
							<div className="footer_list">
								<a href="https://www.facebook.com/phaminh.h2003" target="_blank">
									Phạm Minh Hiếu
								</a>
								<a href="#">Email: phaminhieu30@gmail.com</a>
								<a href="#">SĐT: 0845939330</a>
							</div>
						</div>
						<div className="footer_sup">
							<div className="footer_title">Hỗ trợ</div>
							<div className="footer_list">
								<a href="https://vexere.com/vi-VN/huong-dan-thanh-toan-tren-website.html" target="_blank">
									Hướng dẫn thanh toán
								</a>
								<a href="https://vexere.com/vi-VN/quy-che" target="_blank">
									Quy chế VeXeRe.com
								</a>
								<a href="https://vexere.com/vi-VN/chinh-sach-bao-mat" target="_blank">
									Chính sách bảo mật thông tin
								</a>
							</div>
						</div>			
						<div className="footer_download">
							<div className="footer_title">Tải ứng dụng đặt vé</div>
							<div className="footer_list">
								<a href="#">
									<img className="FooterMenu__DownloadLogo-sc-13w4bwi-1 ewtgXx lazyloaded" alt="download-logo-1" data-src="https://storage.googleapis.com/fe-production/images/landingpagetet2018/AP-icon.png?v=2" width={150} height={49} src="https://storage.googleapis.com/fe-production/images/landingpagetet2018/AP-icon.png?v=2" />
								</a>
								<a href="#">
									<img className="FooterMenu__DownloadLogo-sc-13w4bwi-1 ewtgXx lazyloaded" alt="download-logo-2" data-src="https://storage.googleapis.com/fe-production/images/landingpagetet2018/GP-icon.png?v=2" width={150} height={49} src="https://storage.googleapis.com/fe-production/images/landingpagetet2018/GP-icon.png?v=2" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</footer>
			<div className="License__Wrapper-fwwcnv-0 kSJbnI footer_license">
				<div className="License__Ayah-fwwcnv-1 kbYbCv">
					<div
						style={{
							fontSize: "large",
							fontWeight: "bold",
							color: "rgb(77, 77, 77)",
						}}
					>
						Công ty TNHH Thương Mại Dịch Vụ VeXeRe
					</div>
					<div>Địa chỉ đăng ký kinh doanh: 8C Chữ Đồng Tử, Phường 7, Quận Tân Bình, Thành Phố Hồ Chí Minh, Việt Nam</div>
					<div>&copy; 2024 by MINHIEU.</div>
				</div>
			</div>
		</>
	);
}
