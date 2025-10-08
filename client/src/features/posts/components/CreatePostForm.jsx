import { BadgePlus } from "lucide-react";
import { useState } from "react";
import { SiSparkpost } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { ImageCropper, Spinner } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { errorToast, formatTags, validatePostForm } from "@/utils";
import { usePostFormState } from "../hooks/useFormState";
import { useCreatePost } from "../services";

const CreatePostForm = () => {
	const navigate = useNavigate();
	const { preview, setPreview, image, fileInputRef, clearPreview, setImage } =
		usePostFormState();

	const { mutateAsync: createPost, isPending } = useCreatePost();

	const [showCropper, setShowCropper] = useState(false);
	const [tempImage, setTempImage] = useState(null);

	const handleImageSelect = (e) => {
		const file = e.target.files[0];
		if (!file) return;
		e.target.value = "";

		const reader = new FileReader();
		reader.onloadend = () => {
			setTempImage(reader.result);
			setShowCropper(true);
		};
		reader.readAsDataURL(file);
	};

	const handleCropped = (croppedFile, croppedPreview) => {
		setImage(croppedFile);
		setPreview(croppedPreview);
		setTempImage(null);
		setShowCropper(false);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		if (image) formData.append("image", image);

		const tags = formData.get("tags");
		const formattedTags = formatTags(tags);
		formData.delete("tags");
		// formData.set("tags", JSON.stringify(formattedTags));
		formattedTags.forEach((tag) => {
			formData.append("tags", tag);
		});

		const error = validatePostForm(formData);
		if (error) return errorToast(error);

		const response = await createPost(formData);
		if (response?.success) {
			setTimeout(() => {
				navigate("/feeds");
			}, 500);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-8 w-full font-bold font-Gilroy text-foreground text-sm max-w-6xl"
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="flex flex-col gap-2">
					<label className="pl-1">Caption</label>
					<textarea
						name="caption"
						placeholder="🗽"
						className="resize-none min-h-[160px] md:min-h-[200px] bg-input/30 p-4 rounded-xl focus-visible:ring-2"
					/>
				</div>

				{/* Image Upload */}
				<div className="flex flex-col gap-2">
					{preview ? (
						<div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-xl overflow-hidden">
							<img
								src={preview}
								alt="Preview"
								className="w-full h-full object-contain bg-background"
							/>
							<button
								type="button"
								onClick={clearPreview}
								className="absolute top-1 right-3 bg-input px-2 backdrop-blur-md hover:text-third text-foreground text-xl rounded-full shadow-md cursor-pointer transition"
							>
								&times;
							</button>
						</div>
					) : (
						<div
							className="flex flex-col bg-input/30 items-center justify-center w-full aspect-[4/3] md:aspect-[16/9] border-2 border-dashed border-border rounded-xl cursor-pointer transition hover:bg-muted/20"
							onClick={() => fileInputRef.current?.click()}
						>
							<BadgePlus className="w-10 h-10 text-second" />
							<p className="mt-2 text-sm text-muted-foreground">
								Click to upload image
							</p>
						</div>
					)}
					<input
						type="file"
						ref={fileInputRef}
						onChange={handleImageSelect}
						accept="image/*"
						className="hidden"
					/>
				</div>

				{showCropper && (
					<ImageCropper
						image={tempImage}
						// aspect={3 / 4}
						onCancel={() => setShowCropper(false)}
						onCropComplete={handleCropped}
					/>
				)}
			</div>

			{/* Location */}
			<div className="flex flex-col gap-2">
				<label className="pl-1">Add Location</label>
				<Input
					type="text"
					name="location"
					placeholder="e.g. New York, USA"
					className="h-12 input px-4 border-0  placeholder:text-xs"
				/>
			</div>

			{/* Tags */}
			<div className="flex flex-col gap-2">
				<label className="pl-1">
					Add Tags
					<span className="text-muted-foreground/50 font-mono">
						{" "}
						comma-separated
					</span>
				</label>
				<Input
					type="text"
					name="tags"
					placeholder="Art, Expression, Learn"
					className="h-12 input px-4 border-0  placeholder:text-xs"
				/>
			</div>

			{/* Buttons */}
			<div className="flex gap-4 py-1 items-center justify-end">
				<Button
					variant="ghost"
					disabled={isPending}
					className="border"
					onClick={() => navigate(-1)}
				>
					Cancel
				</Button>
				<Button
					type="submit"
					disabled={isPending}
					variant="ghost"
					className=" text-black/80 rounded-xl border  bg-emerald-400 cursor-pointer  transition-all duration-200 font-semibold min-w-28 flex items-center justify-center disabled:bg-neutral-900 disabled:cursor-progress"
				>
					{isPending ? (
						<Spinner color="emerald-400" size="5" />
					) : (
						<span className="flex items-center gap-1">
							<SiSparkpost className="inline" /> Upload
						</span>
					)}
				</Button>
			</div>
		</form>
	);
};

export default CreatePostForm;
