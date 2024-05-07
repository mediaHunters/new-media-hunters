const contactForm = document.getElementById("contact-form");
const successMsgTimeout = 5000;

let lastSubmissionTime = 0;
const submissionRateLimit = 5000;

contactForm.onsubmit = async function (event) {
  event.preventDefault();

  if (isRateLimited()) {
    handleFormError(
      new Error("Submission rate limit exceeded. Please try again later."),
    );
    return;
  }

  try {
    const formData = new FormData(contactForm);

    if (isBotSubmission(formData)) {
      throw new Error("Possible bot submission");
    }

    const sanitizedData = sanitizeFormData(formData);
    validateFormData(sanitizedData);

    await sendEmail(sanitizedData);

    showMessage("Email został wysłany pomyślnie!", "success-msg");
    contactForm.reset();
  } catch (error) {
    handleFormError(error);
  }
};

function isRateLimited() {
  const currentTime = new Date().getTime();
  const timeSinceLastSubmission = currentTime - lastSubmissionTime;
  return timeSinceLastSubmission < submissionRateLimit;
}

function isBotSubmission(formData) {
  // Implement more robust bot detection here (e.g., using AI-based solutions).
  // For simplicity, we'll only check the honeypot field and submission time for now.
  const honeypotField = formData.get("honeypot");
  return honeypotField !== "" || isSubmittedTooQuickly();
}

function isSubmittedTooQuickly() {
  const currentTime = new Date().getTime();
  const timeSinceLastSubmission = currentTime - lastSubmissionTime;
  return timeSinceLastSubmission < submissionRateLimit;
}

function sanitizeFormData(formData) {
  const sanitizedData = {};
  formData.forEach((value, key) => {
    sanitizedData[key] = dataCleaningHelper(value);
  });
  return sanitizedData;
}

function dataCleaningHelper(value) {
  return value.trim();
}

function validateFormData(formData) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(formData["contact-email"])) {
    throw new Error("Invalid email format");
  }

  const maxMessageLength = 1000;
  if (formData["contact-message"].length > maxMessageLength) {
    throw new Error("Message length exceeds the maximum limit");
  }
}

async function sendEmail(data) {
  console.log(data)
  const templateParams = {
    from_name: data["contact-name"],
    from_email: data["contact-email"],
    to_name: "Media Hunters",
    message: data["contact-message"] + `nr tel: ${data['contact-company']}` + `email: ${data["contact-email"]}`,
  };
  console.log(templateParams)
  await emailjs.send("service_x1s6ekh", "template_5ak7u1h", templateParams);

  lastSubmissionTime = new Date().getTime();
}

function showMessage(message, className) {
  const msgElement = document.createElement("div");
  msgElement.className = className;
  msgElement.innerHTML = `<p>${message}</p>`;
  contactForm.appendChild(msgElement);

  setTimeout(function () {
    msgElement.style.display = "none";
  }, successMsgTimeout);
}

function handleFormError(error) {
  // You can customize the error handling here based on the specific error.
  // For now, we'll display a generic error message on the form.
  showError("Internal server error. Please try again later.");
  console.error("Error:", error);
}

function showError(message) {
  const errorElement = document.createElement("div");
  errorElement.className = "error-msg";
  errorElement.innerHTML = `<p>${message}</p>`;
  contactForm.appendChild(errorElement);
}
