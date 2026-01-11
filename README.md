
# Mundial 2026 Prode Challenge

This is a web application to predict the results of the 2026 World Cup group stage matches and compete with friends.

This project was built with **React, Vite, and TypeScript**, and styled with **TailwindCSS**. It is a frontend application that runs entirely in the browser.

**Important:** This is NOT a Python or Streamlit application. It cannot be deployed on Streamlit Cloud.

---

## How to Run Locally

1.  **Install Dependencies:**
    You need to have Node.js installed. Open a terminal in the project folder and run:
    ```bash
    npm install
    ```

2.  **Run the Development Server:**
    After installation, run the following command:
    ```bash
    npm run dev
    ```
    This will start a local server, and you can view your application at `http://localhost:5173` (the port might vary).

---

## How to Deploy (Share with Friends)

To deploy this application so anyone can access it via a URL, you must use a hosting service for static web applications like **Netlify** or **Vercel**. Do NOT use Streamlit.

### Step-by-Step Guide for Netlify:

1.  **Push your code to GitHub:**
    Make sure your entire project, including the `package.json` file, is in a GitHub repository.

2.  **Sign up for Netlify:**
    Go to [Netlify.com](https://www.netlify.com/) and create a free account. It's easiest to sign up using your GitHub account.

3.  **Import your Project:**
    - In your Netlify dashboard, click on **"Add new site"** -> **"Import an existing project"**.
    - Choose **"Deploy with GitHub"** and authorize Netlify to access your repositories.
    - Select the GitHub repository for this project.

4.  **Configure Build Settings:**
    Netlify should automatically detect that this is a Vite project. If it asks for settings, make sure they are correct:
    - **Build command:** `npm run build`
    - **Publish directory:** `dist`

5.  **Deploy the Site:**
    - Click the **"Deploy site"** button.
    - Netlify will now build your project and deploy it. This process might take a minute or two.
    - Once finished, Netlify will provide you with a public URL (e.g., `https://your-site-name.netlify.app`).

**That's it! You can now share this URL with your friends.**
