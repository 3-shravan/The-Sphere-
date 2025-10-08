import { X } from "lucide-react";
import { CgVercel } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DateOfBirth from "./DateOfBirth";
import ProfileImageUploader from "./ProfileImageUploader";
import SelectGender from "./SelectGender";

const EditProfileForm = ({
	user,
	dob,
	setDob,
	gender,
	setGender,
	previewImage,
	clearProfileImage,
	handleImageChange,
	handleSubmit,
	isPending,
	drawerRef,
}) => {
	return (
		<form
			onSubmit={handleSubmit}
			className="grid grid-cols-1 font-Poppins md:grid-cols-2 gap-2 md:gap-3 "
		>
			{/* Left Column */}
			<div className="flex flex-col items-center justify-center gap-4 md:px-8">
				<ProfileImageUploader
					previewImage={previewImage}
					clearProfileImage={clearProfileImage}
					profilePicture={user?.profilePicture}
					handleImageChange={handleImageChange}
				/>
				<div className="w-full md:w-3/4">
					<label htmlFor="name" className="update-input-label">
						Username
					</label>
					<Input name="name" defaultValue={user?.name} required />
				</div>
			</div>

			{/* Right Column */}
			<div className="space-y-4 mt-2 flex flex-col justify-start items-center w-full">
				<div className="w-full md:w-3/4">
					<label htmlFor="fullName" className="update-input-label">
						Full Name
					</label>
					<Input id="fullName" name="fullName" defaultValue={user?.fullName} />
				</div>

				<div className="flex gap-2 flex-col md:items-center  md:flex-row w-full md:w-3/4">
					<DateOfBirth dob={dob} setDob={setDob} />
					<SelectGender gender={gender} setGender={setGender} />
				</div>

				<div className="w-full md:w-3/4">
					<label htmlFor="bio" className="update-input-label">
						Bio
					</label>
					<Textarea
						name="bio"
						defaultValue={user?.bio}
						placeholder="🗽"
						className="resize-none h-24 p-2 font-mono text-sm"
					/>
				</div>
			</div>

			{/* Submit Button */}
			<div className="col-span-1 md:col-span-2 font-Poppins flex justify-center mt-2">
				<Button
					type="submit"
					disabled={isPending}
					variant="ghost"
					className="w-full md:w-[30%] flex gap-1 rounded-xl border mx-auto bg-emerald-400 text-black font-bold text-xs cursor-pointer"
				>
					<CgVercel className="w-4 h-4" />
					{isPending ? "Updating..." : "Update Profile"}
				</Button>
			</div>

			{/* Cancel Button */}
			<DrawerClose asChild>
				<div className="col-span-1 md:col-span-2 flex font-Poppins justify-center ">
					<Button
						type="button"
						ref={drawerRef}
						variant="outline"
						className="w-full md:w-[30%] mx-auto text-xs cursor-pointer"
					>
						<X className="w-4 h-4" />
						Cancel
					</Button>
				</div>
			</DrawerClose>
		</form>
	);
};

export default EditProfileForm;
