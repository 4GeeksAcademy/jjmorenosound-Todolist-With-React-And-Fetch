import React from "react";
import { Task } from "./task";



//create your first component
const Home = () => {
	return (
		<div className="container">
			<br></br>
			<h1 className="d-flex justify-content-center">To Do List</h1>
		<Task></Task>
		
		</div>
	);
};

export default Home;