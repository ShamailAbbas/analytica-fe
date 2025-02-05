
# React.js Frontend  

This application has two pages: one for managing items and another for generating responses using the OpenAI API.  

This app is deployed at: [https://tiny-moxie-df40e2.netlify.app/](https://tiny-moxie-df40e2.netlify.app/)  

## Pages  


- `/` - This route contains the item management page.  
- `/openai` - This page integrates OpenAI for generating responses.  

## Technologies  

- React.js  
- Material UI  
- Context API  

## Installation  

1. Clone the repository:  

   ```bash
   git clone https://github.com/ShamailAbbas/analytica-fe
   cd analytica-fe
   ```

2. Install dependencies:  

   ```bash
   npm install
   ```

3. Ensure the backend is up and running.  

4. Create a `.env` file in the root of the project and add the following:  

   ```bash
   REACT_APP_BACKEND_API=<your_backend_url>  # e.g., http://localhost:4000
   ```

5. Start the development server:  

   ```bash
   npm start
   ```
The frontend will be available at `http://localhost:3000`.  

