import React from "react";
import "./hello.css";

export const Hello = ({ label }) => {
	return (
		<button type="button" className="hello">
			{label}
		</button>
	);
};
