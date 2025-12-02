GM Pro Solution — Final (React + Tailwind + Framer Motion)

How to run locally:
1. unzip the package and open the folder in terminal
2. run: npm install
3. run: npm run dev
4. open http://localhost:5173

Configuration:
- Edit src/config.js and replace GETFORM_URL with your real Getform endpoint (it currently contains YOUR_KEY).
- The Zapier URL is already set to the webhook you provided.
- Each form sends a JSON POST to both Zapier and Getform. If your Getform requires form-encoded POST, you can adjust FormTemplate to send FormData instead.

Notes:
- This is a starter project; Tailwind build is required for full styling. If you don't want to install Tailwind, the app still renders with basic styles.

