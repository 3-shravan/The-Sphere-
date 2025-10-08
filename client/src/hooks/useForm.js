import { useState } from "react";

export default function useForm(initialState = {}) {
	const [formData, setFormData] = useState(initialState);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};
	const resetForm = () => setFormData(initialState);

	return { formData, setFormData, handleChange, resetForm };
}
