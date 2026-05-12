import customFetch from "@/lib/custom-fetch";

async function sendContactMessage({
  payload,
  params = {},
}: {
  params?: Record<string, string>;
  payload: {
    full_name: string;
    email: string;
    phone_number: string;
    message: string;
  };
}) {
  return await customFetch("/support/website-message/", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
    params,
  });
}

export { sendContactMessage };
