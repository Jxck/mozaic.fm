import React from "react";
import "./hello.css";

export const Hello = ({ label }) => {
	return (
		<button
			className="hello"
		>
			{label}
		</button>
	);
};