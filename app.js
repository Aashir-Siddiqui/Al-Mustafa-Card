import { collection, addDoc, db } from "./firebase.js";

async function uploadCloudImg(file) {
    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dlv1mgbfm/image/upload";
    const cloudinaryPreset = "Card_data";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinaryPreset);

    try {
        const response = await fetch(cloudinaryUrl, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to upload image to Cloudinary");
        }

        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const imageInput = document.getElementById("img");
    const imagePreview = document.getElementById("imagePreview");

    if (!form) {
        console.error("Form not found!");
        return;
    }

    // Image preview
    imageInput.addEventListener("change", () => {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                imagePreview.style.display = "block";
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.src = "";
            imagePreview.style.display = "none";
        }
    });

    // Form submission
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        try {
            let imageUrl = "";
            const file = imageInput.files[0];

            if (file) {
                imageUrl = await uploadCloudImg(file);
            }

            const docRef = await addDoc(collection(db, "data"), {
                country: document.getElementById("country").value,
                city: document.getElementById("city").value,
                course: document.getElementById("course").value,
                proficiency: document.getElementById("proficiency").value,
                name: document.getElementById("name").value,
                fname: document.getElementById("fname").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("Phone").value,
                CNIC: document.getElementById("CNIC").value,
                fCNIC: document.getElementById("fCNIC").value,
                date: document.getElementById("date").value,
                gender: document.getElementById("gender").value,
                address: document.getElementById("Address").value,
                image: imageUrl,
            });

            console.log("Document written with ID: ", docRef.id);
            alert("Form submitted successfully!");
            form.reset();
            imagePreview.src = "";
            imagePreview.style.display = "none";
        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Error submitting form: " + e.message);
        }
    });
});