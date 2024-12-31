🌟 Chat Application with Mistral AI
This is a chat application built with Next.js and Mistral AI's public API. It demonstrates the integration of generative AI into a modern web application with a clean and intuitive interface.

✨ Features
🗨️ Real-time Chat using Mistral AI's models.
🖼️ Elegant Design with Material-UI (MUI).
🔧 Built with Next.js for seamless server-side rendering.
📜 Modular Code Structure for ease of understanding and extension.

📋 Requirements
Node.js: Version 16.0.0 or higher.
A .env.local file containing your API key.

🚀 Getting Started

1️⃣ Clone the Repository
git clone https://github.com/MathisGit/demo-mistral.git
cd demo-mistral

2️⃣ Install Dependencies

npm install

3️⃣ Configure Environment Variables

Create a .env.local file in the root of the project with the following content:

MISTRAL_API_KEY=your_api_key_here

4️⃣ Run the Development Server

npm run dev

Open your browser and navigate to http://localhost:3000 to see the application.

🛠️ Deployment
To deploy the application for production, follow these steps:

Build the project:
npm run build

Start the server:
npm start
The application will now be accessible on the specified host and port.

📂 Project Structure
src/
├── components/          # Reusable React components
├── fonts/               # Custom fonts
├── pages/               # Next.js pages (API routes included)
├── styles/              # CSS modules for styling

📝 Additional Notes
If you encounter any issues, ensure that your Node.js version matches the requirements.
For detailed API usage, refer to the Mistral AI Documentation.
📧 Contact
Feel free to reach out if you have any questions or feedback:

Email: mathis.grosmaitre@etu.minesparis.psl.eu
GitHub: @MathisGit