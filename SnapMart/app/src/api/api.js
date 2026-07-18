import config from "@/config";

const buildUrl = (url) => {
  if (!url) return config.apiUrl;
  if (/^https?:\/\//i.test(url)) return url;
  return `${config.apiUrl}${url.startsWith("/") ? "" : "/"}${url}`;
};

const getAuthHeaders = () => {
  const headers = {};

  if (typeof window !== "undefined") {
    const authToken = window.localStorage.getItem("authToken");
    if (authToken) headers.Authorization = `Bearer ${authToken}`;
  }

  return headers;
};

const request = async (method, url, data, requestConfig = {}) => {
  const headers = {
    ...getAuthHeaders(),
    ...(requestConfig.headers || {}),
  };

  if (!(data instanceof FormData) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(buildUrl(url), {
    method,
    headers,
    body: data == null ? undefined : data instanceof FormData ? data : JSON.stringify(data),
    credentials: "include",
  });

  const contentType = response.headers.get("content-type") || "";
  const rawText = await response.text();
  const parsedBody = rawText && contentType.includes("application/json") ? JSON.parse(rawText) : rawText;

  if (!response.ok) {
    const error = new Error(parsedBody?.message || parsedBody || "Request failed");
    error.response = { status: response.status, data: parsedBody };
    throw error;
  }

  return { data: parsedBody, status: response.status, headers: response.headers };
};

const api = {
  get: (url, config = {}) => request("GET", url, null, config),
  post: (url, data, config = {}) => request("POST", url, data, config),
  put: (url, data, config = {}) => request("PUT", url, data, config),
  patch: (url, data, config = {}) => request("PATCH", url, data, config),
  delete: (url, config = {}) => request("DELETE", url, null, config),
};

export default api;
