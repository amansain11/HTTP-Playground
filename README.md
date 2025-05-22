# 🧪 HTTP Playground

A React-based tool to test HTTP requests directly from your browser. Built with `axios`, `react-hook-form`, and Tailwind CSS for a responsive and clean UI. Ideal for developers who want a lightweight Postman-like experience in the browser.

## 🚀 Features

- Supports HTTP methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`
- Send custom request headers and body (JSON format)
- Displays:
  - HTTP response body
  - HTTP response headers
  - Status indicator (color-coded)
- Auto-preview image responses
- Error handling with detailed messages
- Realtime JSON validation for headers and body inputs

## 🖼️ UI Overview

- **Left Panel:** Form to input URL, method, headers, and body
- **Right Panel:** Displays the response, headers, and errors (if any)
- **Image Support:** If response is an image, it will be previewed

## 🛠️ Technologies Used

- React
- Axios
- react-hook-form
- Tailwind CSS

## 📝 Usage

1. Enter the URL you want to test.
2. Select an HTTP method (GET, POST, PUT, PATCH, DELETE).
3. Optionally, add request headers in JSON format (e.g., {"Authorization": "Bearer xyz"}).
4. If the method supports a request body (POST, PUT, PATCH), enter the body as raw JSON.
5. Click "Submit".
6. View the response:
   - JSON/text will be shown formatted
   - Image responses will be displayed as a preview
7. Check headers and status code in the response panel

## 🐞 Troubleshooting

- Invalid JSON in headers or body:
  A red validation message will appear under the field.

- If the API fails:
  The right panel will display the error message (e.g., Network Error, 404 Not Found).

- Empty or malformed responses:
  Check the response headers or try changing the Content-Type and inspecting the raw body.
