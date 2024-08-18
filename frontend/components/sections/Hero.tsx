"use client";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BackgroundBeams } from "../ui/background-beams";
import { Input } from "../ui/input";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { Meteors } from "../ui/meteors";

const Hero = () => {
	const [url, setUrl] = useState("");
	const [data, setData] = useState("");
	const [isLoading, setLoading] = useState(false);

	//const handleSubmit = async () => {
	//const res = await fetch("/api/scrape", {
	//method: "POST",
	//body: JSON.stringify({ url }),
	//headers: {
	//"Content-Type": "application/json",
	//},
	//});
	//const data = await res.json();
	//console.log(data);
	//};
	//

	// count for 3 seconds and then show the result
	const handleSubmit = async () => {
		// if url not with http retun console.error("Invalid URL");
		if (!url.startsWith("http") || url === "https://wikipedia.or") {
			toast.error("Invalid URL");
			return;
		}

		setLoading(() => true);
		console.log("Scraping...", isLoading);
		const data =
			"Alexander III of Macedon, commonly known as Alexander the Great, was a king of Macedon, a state in northern ancient Greece. Born in Pella in 356 BC, Alexander was tutored by Aristotle until the age of 16. By the age of thirty, he had created one of the largest empires of the ancient world, stretching from the Ionian Sea to the Himalayas. He was undefeated in battle and is considered one of history's most successful military commanders.";
		setTimeout(() => {
			setData(data);
			setLoading(() => false);
		}, 3000);
	};

	return (
		<div className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
			<div className="max-w-2xl mx-auto p-4">
				<h1 className="relative z-10 text-5xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
					OloStep WebScraper
				</h1>
				<p className="text-neutral-500 max-w-md mx-auto my-2 text-sm text-center relative z-10">
					Experience unparalleled speed with a Web Scraping API delivering
					results in 2-6 seconds, at an unbeatable price. It avoids all bot
					detection and can parallelize up to 100K requests in minutes
				</p>
				<div className="flex flex-col justify-center items-center gap-4 py-4 sm:flex-row sm:py-8">
					<Input
						onChange={(e) => setUrl(e.target.value)}
						type="text"
						placeholder="https://"
						className="text-white rounded-lg border border-neutral-400 focus:ring-2 focus:ring-teal-500  w-full relative z-10 bg-neutral-950 placeholder:text-neutral-400 placeholder:text-xs sm:placeholder:text-md md:placeholder:text-lg"
					/>
					<HoverBorderGradient
						onClick={handleSubmit}
						className="w-32 hover:bg-white hover:text-black"
					>
						{isLoading == true ? "Analysing" : "Scrape Now"}
					</HoverBorderGradient>
				</div>
			</div>

			<div>{data && <MeteorsDemo data={data} />}</div>
			<BackgroundBeams />
		</div>
	);
};

export default Hero;

export function MeteorsDemo({ data }: { data: string }) {
	return (
		<div className="">
			<div className="w-full relative max-w-5xl">
				<div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
				<div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
					<div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="h-2 w-2 text-gray-300"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
							/>
						</svg>
					</div>

					<h1 className="font-bold text-xl text-white mb-4 relative z-50">
						page summary
					</h1>

					<p className="font-normal text-base text-slate-500 mb-4 relative z-50">
						{data}
					</p>

					<button className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300">
						Download
					</button>

					{/* Meaty part - Meteor effect */}
					<Meteors number={20} />
				</div>
			</div>
		</div>
	);
}
