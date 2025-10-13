const Gradient = () => {
	return (
		<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-screen">
			<div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-emerald-700 rounded-full opacity-20 blur-[100px]"></div>
			<div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-700 rounded-full opacity-20 blur-[100px]"></div>
		</div>
	);
};

export default Gradient;
