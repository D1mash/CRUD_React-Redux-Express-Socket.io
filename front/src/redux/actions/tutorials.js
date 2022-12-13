import {
	CREATE_TUTORIAL,
	RETRIEVE_TUTORIALS,
	UPDATE_TUTORIAL,
	DELETE_TUTORIAL,
	DELETE_ALL_TUTORIALS,
} from "./types";

import TutorialDataService from "../../services/TutorialService";

export const createTutorial =
	(socket, title, description) => async dispatch => {
		try {
			socket.emit("createTutorial", { title, description });

			return new Promise(resolve => {
				socket.on("createTutorial", data => {
					dispatch({
						type: CREATE_TUTORIAL,
						payload: data,
					});
					resolve(data);
				});
			});
		} catch (err) {
			return Promise.reject(err);
		}
	};

export const retrieveTutorials = socket => async dispatch => {
	try {
		socket.emit("fetchTutorials");
		socket.on("fetchTutorials", data => {
			dispatch({
				type: RETRIEVE_TUTORIALS,
				payload: data,
			});
		});
	} catch (err) {
		console.log(err);
	}
};

export const updateTutorial = (socket, id, data) => async dispatch => {
	try {
		// const res = await TutorialDataService.update(id, data);

		socket.emit("updateTutorial", { id, data });

		return new Promise(resolve => {
			socket.on("updateTutorial", data => {
				dispatch({
					type: UPDATE_TUTORIAL,
					payload: data,
				});
				resolve(data);
			});
		});

		// return Promise.resolve(res.data);
	} catch (err) {
		return Promise.reject(err);
	}
};

export const deleteTutorial = (socket, id) => async dispatch => {
	try {
		// await TutorialDataService.remove(id);
		socket.emit("deleteTutorialById", { id });
		socket.on("deleteTutorialById", data => {
			dispatch({
				type: DELETE_TUTORIAL,
				payload: { data },
			});
		});
	} catch (err) {
		console.log(err);
	}
};

export const deleteAllTutorials = socket => async dispatch => {
	try {
		socket.emit("deleteTutorial");

		return new Promise(resolve => {
			socket.on("deleteTutorial", data => {
				dispatch({
					type: DELETE_ALL_TUTORIALS,
					payload: data,
				});

				resolve(data);
			});
		});
	} catch (err) {
		return Promise.reject(err);
	}
};

export const findTutorialsByTitle = title => async dispatch => {
	try {
		const res = await TutorialDataService.findByTitle(title);

		dispatch({
			type: RETRIEVE_TUTORIALS,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
	}
};
