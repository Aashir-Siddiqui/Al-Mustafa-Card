import { collection, addDoc, db, getDocs } from "./firebase.js";

const showError = (title, text) => Swal.fire({ icon: "error", title, text });
const showSuccess = (title, text) =>
  Swal.fire({ icon: "success", title, text });

async function uploadCloudImg(file) {
  const cloudinaryUrl =
    "https://api.cloudinary.com/v1_1/dlv1mgbfm/image/upload";
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

      showSuccess("Success", "Form submitted successfully!");
      form.reset();
      imagePreview.src = "";
      imagePreview.style.display = "none";
    } catch (e) {
      showError(
        "Error",
        "Failed to submit the form. Please try again." + e.message
      );
    }
  });
});

document.getElementById("downloadCard").addEventListener("click", async () => {
  const cardContainer = document.querySelector(".container");
  const cardCNIC = document.getElementById("cardCNIC").value;
  querySnapshot.forEach((doc) => {
    const card = document.data()
    if(doc.CNIC === card.CNIC) {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.innerHTML = `
        <img src="${card.image}" alt="Card Image" class="card-image">
        <h2>${card.name}</h2>
        <p>Course: ${card.course}</p>
        <p>Proficiency: ${card.proficiency}</p>
        <p>CNIC: ${card.CNIC}</p>
      `;
      cardContainer.appendChild(cardElement);
    }
  });
}
)
