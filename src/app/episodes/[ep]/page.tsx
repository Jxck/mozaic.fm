export default async function Page({ params }: { params: { ep: number } }) {
	const { ep } = params;
	return (
		<main>
			<h1>/episodes/{ep}</h1>
		</main>
	);
}
