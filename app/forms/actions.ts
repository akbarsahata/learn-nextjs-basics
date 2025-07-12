"use server";

export async function handleFormSubmission(formData: FormData) {
  const exampleInput = formData.get("example");

  // Simulate processing the form data
  console.log("Form submitted with input:", exampleInput);
}

export async function actionWithAdditionalArgument(
  userId: string,
  userCode: string,
  formData: FormData
) {
  const exampleInput = formData.get("example");

  // Simulate processing the form data with additional arguments
  console.log("User ID:", userId);
  console.log("User Code:", userCode);
  console.log("Form submitted with input:", exampleInput);
}

export async function actionWithSimulatedDelay(
  initialState: {
    example: string;
    message?: string;
  },
  formData: FormData
) {
  const exampleInput = formData.get("example");

  // Simulate a delay to mimic server processing
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("Form submitted with input after delay:", exampleInput);

  return {
    ...initialState,
    example: exampleInput as string,
    message: "Form processed successfully!",
  };
}
