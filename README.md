````
# DMS_FlowDocs

**Document Management System (DMS) Frontend**

DMS_FlowDocs is a web-based Document Management System (DMS) frontend built using **React JS**, **Tailwind CSS**, and **ShadCN UI components**. This system allows users to **upload, view, tag, search, preview, and download documents** efficiently. It integrates with a backend API for authentication and document management.

---

## 📂 Features

- **User Authentication via OTP**
  - Login using a mobile number.
  - OTP validation for secure login.
- **Document Management**
  - Upload documents.
  - Search and filter documents.
  - Preview and download documents.
  - Tag documents for easy categorization.
- **Responsive UI**
  - Works seamlessly on desktop and mobile.
- **Lightweight & Fast**
  - Built with React and Tailwind for speed and flexibility.

---

## 🛠️ Technology Stack

- **Frontend:** React JS, Tailwind CSS, ShadCN UI
- **State Management:** React Hooks
- **Routing:** React Router v6
- **HTTP Requests:** Axios
- **Cookie Handling:** js-cookie
- **Icons:** Lucide-react

---

## ⚡ Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/SauravkuSingh/DMS_FlowDocs.git
cd DMS_FlowDocs
````

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file at the root of the project with the following variable:

```
VITE_SERVER_URL=<YOUR_BACKEND_API_URL>
```

### 4. Run the application

```bash
npm run dev
```

Open your browser at [http://localhost:5173](http://localhost:5173) to view the application.

---

## 👤 Login Details

You can use the following mobile number to login:

```
Mobile Number: 7415727270
```

> Note: OTP will be sent to this number (use backend API simulation if needed).

---

## 🔗 API Endpoints

* **Generate OTP:** `POST /generateOTP`

  ```json
  {
    "mobile_number": "7415727270"
  }
  ```

* **Validate OTP:** `POST /validateOTP`

  ```json
  {
    "mobile_number": "7415727270",
    "otp": "<ENTER_OTP>"
  }
  ```

---

## 📝 Folder Structure

```
DMS_FlowDocs/
├─ public/
├─ src/
│  ├─ components/    # Reusable components
│  ├─ pages/         # Page-level components
│  ├─ services/      # API service functions
│  ├─ ui/            # ShadCN UI wrapper components
│  └─ App.jsx        # Root component
├─ package.json
└─ vite.config.js
```

---

## 📌 Notes

* Ensure your backend API is running and accessible via `VITE_SERVER_URL`.
* The login is OTP-based, so simulate OTP if backend is unavailable.
* This project is strictly frontend-focused; backend uses .NET and MySQL.

---

## ✅ Author

**Saurav Singh**
GitHub: [https://github.com/SauravkuSingh](https://github.com/SauravkuSingh)

---

## 📄 License

This project is licensed under the MIT License.

```

---

If you want, I can also **create a super user-friendly “Manual” section** inside this README with step-by-step screenshots of **logging in, uploading, and previewing documents**—so anyone can use it like an actual manual.  

Do you want me to do that?
```
