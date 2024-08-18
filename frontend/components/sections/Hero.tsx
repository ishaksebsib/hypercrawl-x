"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BackgroundBeams } from "../ui/background-beams";
import { Input } from "../ui/input";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import axiosInstance from "@/lib/api";
import axios from "axios";
import { ResultCard } from "../ui/resultCard";

interface ScrapeResponse {
	success: boolean;
	statusCode: number;
	message: string;
	responseObject?: {
		id: string;
		summary: string;
	};
}

const Hero = () => {
	const [url, setUrl] = useState("");
	const [data, setData] = useState<{ id: string; summary: string } | null>(
		null,
	);
	const [isLoading, setLoading] = useState(false);

	const handleSubmit = async (): Promise<void> => {
		if (!url || !url.startsWith("http")) {
			toast.error("Invalid URL");
			return;
		}

		setLoading(true);

		try {
			const res = await axiosInstance.post<ScrapeResponse>("/scrape", {
				url,
			});

			if (res.data.success && res.data.responseObject) {
				setData(res.data.responseObject);
				return;
			}
			toast.error(res.data.message || "Failed to scrape the URL");
		} catch (error: unknown) {
			console.log(error);
			if (axios.isAxiosError(error)) {
				const message = error.response?.data?.message || "An error occurred";
				toast.error(message);
			} else {
				toast.error("An unexpected error occurred");
			}
		} finally {
			setLoading(false);
		}
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

			<div>{data && <ResultCard data={data.summary} />}</div>
			<BackgroundBeams />
		</div>
	);
};

export default Hero;
