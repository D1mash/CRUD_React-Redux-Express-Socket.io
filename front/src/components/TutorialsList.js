import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	retrieveTutorials,
	findTutorialsByTitle,
	deleteAllTutorials,
} from "../redux/actions/tutorials";
import { Link } from "react-router-dom";
import { SocketContext } from "../context/socket";
import AddTutorial from "./AddTutorial";

const TutorialsList = () => {
	const [currentTutorial, setCurrentTutorial] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [searchTitle, setSearchTitle] = useState("");

	const tutorials = useSelector(state => state.tutorials);
	const dispatch = useDispatch();

	const socket = useContext(SocketContext);

	useEffect(() => {
		dispatch(retrieveTutorials(socket));
	}, [dispatch, socket]);

	const onChangeSearchTitle = e => {
		const searchTitle = e.target.value;
		setSearchTitle(searchTitle);
	};

	const refreshData = () => {
		setCurrentTutorial(null);
		setCurrentIndex(-1);
	};

	const setActiveTutorial = (tutorial, index) => {
		setCurrentTutorial(tutorial);
		setCurrentIndex(index);
	};

	const removeAllTutorials = () => {
		dispatch(deleteAllTutorials(socket))
			.then(response => {
				console.log(response);
				refreshData();
			})
			.catch(e => {
				console.log(e);
			});
	};

	const findByTitle = () => {
		refreshData();
		dispatch(findTutorialsByTitle(searchTitle));
	};

	return (
		<div className='list row'>
			<div className='col-md-12'>
				<div className='input-group mb-3'>
					<input
						type='text'
						className='form-control'
						placeholder='Search by title'
						value={searchTitle}
						onChange={onChangeSearchTitle}
					/>
					<div className='input-group-append'>
						<button
							className='btn btn-outline-secondary'
							type='button'
							onClick={findByTitle}
						>
							Search
						</button>
					</div>
				</div>
			</div>
			<div className='col-md-4'>
				<AddTutorial socket={socket} />
			</div>
			<div className='col-md-4'>
				<h4>Tutorials List</h4>
				<ul className='list-group'>
					{tutorials &&
						tutorials.map((tutorial, index) => (
							<li
								className={
									"list-group-item " + (index === currentIndex ? "active" : "")
								}
								onClick={() => setActiveTutorial(tutorial, index)}
								key={index}
							>
								{tutorial.title}
							</li>
						))}
				</ul>

				<button
					className='m-3 btn btn-sm btn-danger'
					onClick={removeAllTutorials}
				>
					Remove All
				</button>
			</div>
			<div className='col-md-4'>
				{currentTutorial ? (
					<div>
						<h4>Tutorial</h4>
						<div>
							<label>
								<strong>Title:</strong>
							</label>{" "}
							{currentTutorial.title}
						</div>
						<div>
							<label>
								<strong>Description:</strong>
							</label>{" "}
							{currentTutorial.description}
						</div>
						<div>
							<label>
								<strong>Status:</strong>
							</label>{" "}
							{currentTutorial.published ? "Published" : "Pending"}
						</div>

						<Link
							to={"/tutorials/" + currentTutorial.id}
							className='badge badge-warning'
						>
							Edit
						</Link>
					</div>
				) : (
					<div>
						<br />
						<p>Please click on a Tutorial...</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default TutorialsList;
