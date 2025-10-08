import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";

const ASPECT_OPTIONS = [
	{ label: "1:1", value: 1 },
	{ label: "4:5", value: 4 / 5 },
	{ label: "3:4", value: 3 / 4 },
	{ label: "4:3", value: 4 / 3 },
	{ label: "2:3", value: 2 / 3 },
];

const ImageCropper = ({ image, onCancel, onCropComplete }) => {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
	const [aspect, setAspect] = useState(1);

	const onCropCompleteLocal = useCallback((_, areaPixels) => {
		setCroppedAreaPixels(areaPixels);
	}, []);

	const getCroppedImg = async () => {
		const img = document.createElement("img");
		img.src = image;
		await img.decode();

		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");

		canvas.width = croppedAreaPixels.width;
		canvas.height = croppedAreaPixels.height;

		ctx.drawImage(
			img,
			croppedAreaPixels.x,
			croppedAreaPixels.y,
			croppedAreaPixels.width,
			croppedAreaPixels.height,
			0,
			0,
			croppedAreaPixels.width,
			croppedAreaPixels.height,
		);

		canvas.toBlob((blob) => {
			const file = new File([blob], "cropped.jpg", { type: "image/jpeg" });
			onCropComplete(file, URL.createObjectURL(blob));
		}, "image/jpeg");
	};

	return (
		<div className="fixed inset-0 bg-black/90 z-[100] h-full flex flex-col items-center justify-center">
			<div className="relative w-full h-[70vh] rounded-xl overflow-hidden">
				<Cropper
					image={image}
					crop={crop}
					zoom={zoom}
					aspect={aspect}
					onCropChange={setCrop}
					onZoomChange={setZoom}
					onCropComplete={onCropCompleteLocal}
				/>
			</div>

			{/* Aspect Ratio Buttons */}
			<div className="flex gap-2 mt-4">
				{ASPECT_OPTIONS.map((opt) => (
					<Button
						key={opt.label}
						type="button"
						size="sm"
						variant={aspect === opt.value ? "default" : "outline"}
						onClick={() => setAspect(opt.value)}
					>
						{opt.label}
					</Button>
				))}
			</div>

			<div className="flex gap-3 mt-6">
				<Button
					type="button"
					className="border"
					variant="ghost"
					onClick={onCancel}
				>
					Cancel
				</Button>
				<Button type="button" variant="outline" onClick={getCroppedImg}>
					Crop
				</Button>
			</div>
		</div>
	);
};

export default ImageCropper;
