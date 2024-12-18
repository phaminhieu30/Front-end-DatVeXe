import logo from "./logo.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import {createBrowserHistory} from "history";
import {Router, Switch} from "react-router-dom";
import {HomeTemplate} from "./templates/HomeTemplate";
import "antd/dist/antd.css";

import Home from "./pages/Home";
import Booking from "./pages/Booking";
import AlertAll from "./components/Alert/AlertAll";
import Payment from "./pages/Payment";
import ModalInfo from "./components/Modal/ModalInfo";
import TicketManagement from "./components/UserManagement/TicketManagement";
import InfoManagement from "./components/UserManagement/InfoManagement";
import CommentManagement from "./components/UserManagement/CommentManagement";

import AdminTemplate from "./templates/Admin/AdminTemplate";
import AdminTicket from "./pages/Admin/AdminTicket";
import AdminVehicle from "./pages/Admin/AdminVehicle";
import AdminTrip from "./pages/Admin/AdminTrip";
import AdminUser from "./pages/Admin/AdminUser";
import AdminPassenger from "./pages/Admin/AdminPassenger";
import AdminStation from "./pages/Admin/AdminStation";

import AdminTripPassenger from "./pages/Admin/AdminTripPassenger";
import DrawerForm from "./components/Drawer/DrawerForm";
import AdminTurnOver from "./pages/Admin/AdminTurnOver/AdminTurnOver";
import AddTrip from "./components/Add/AddTrip";
import MapPoint from "./components/Map/MapPoint";

export const history = createBrowserHistory();

function App() {
	return (
		<Router history={history}>
			<AlertAll />
			<ModalInfo />
			<DrawerForm />

			<Switch>
				<Payment path="/payment" exact />
				<AdminTemplate path="/admin/ticket" exact Component={AdminTicket} />
				<AdminTemplate path="/admin/vehicle" exact Component={AdminVehicle} />
				<AdminTemplate path="/admin/trip" exact Component={AdminTrip} />
				<AdminTemplate path="/admin/station" exact Component={AdminStation} />
				<MapPoint path="/mappoint" exact />
				<AdminTemplate path="/admin/addtrip" exact Component={AddTrip} />
				<AdminTemplate path="/admin/trip/tripPassenger/:id" exact Component={AdminTripPassenger} />
				<AdminTemplate path="/admin/user" exact Component={AdminUser} />
				<AdminTemplate path="/admin/turnover" exact Component={AdminTurnOver} />
				<AdminTemplate path="/admin" exact Component={AdminUser} />
				<AdminTemplate path="/admin/passenger" exact Component={AdminPassenger} />
				<HomeTemplate path="/booking" exact Component={Booking} />
				<HomeTemplate path="/ticketmgt" exact Component={TicketManagement} />
				<HomeTemplate path="/usermgt" exact Component={InfoManagement} />
				<HomeTemplate path="/commentmgt" exact Component={CommentManagement} />
				<HomeTemplate path="/booking" exact Component={Booking} />
				<HomeTemplate path="/booking/:id/:from/:to/:start" exact Component={Booking} />
				<HomeTemplate path="/" exact Component={Home} />
			</Switch>
		</Router>
	);
}

export default App;
