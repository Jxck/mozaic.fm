import { useState } from "hono/jsx";

type Props = {
	src: string;
};
export default function Player(props: Props) {
	const { src } = props;
	const [playBackRate, setPlayBackRate] = useState(1);
	return (
		<div>
			<audio controls src={src} />
		</div>
	);
}
