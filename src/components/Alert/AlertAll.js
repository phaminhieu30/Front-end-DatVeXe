import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {useDispatch, useSelector} from "react-redux";
import Stack from "@mui/material/Stack";
import {CLOSE_NOFICATION} from "../../redux/types/userTypes";
export default function AlertAll() {
	const dispatch = useDispatch();
	const {nofication} = useSelector((state) => state.userReducer);
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		dispatch({
			type: CLOSE_NOFICATION,
		});
	};
	return (
		<Stack spacing={2} sx={{width: "100%"}}>
			<Snackbar open={nofication.toggle} autoHideDuration={6000} anchorOrigin={{vertical: "top", horizontal: "center"}} onClose={handleClose}>
				<Alert severity={nofication.title} sx={{width: "100%"}} onClose={handleClose}>
					{nofication.text}
				</Alert>
			</Snackbar>
		</Stack>
	);
}
