# Inventory Management App 

This Inventory Management App is built using Node.js and Express. It employs the Pug templating engine for rendering views. The application supports full CRUD operations on products and categories, with data stored in MongoDB using the Mongoose ODM. Additionally, basic user authentication is implemented.

### Features:-

#### a.) CRUD Operations: Manage products and categories with Create, Read, Update, and Delete functionalities.
#### b.) Templating: Utilizes Pug for clean and efficient templating.
#### c.) Database: Data is stored in MongoDB, and managed through Mongoose.
#### d.) User Authentication: Basic user authentication is in place for secure access.

### Technologies Used
Node.js
Express.js
Pug
MongoDB
Mongoose
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/regularGuyOnGit/Node_inventoryAPP_backend.git

Navigate to the project directory:

bash
Copy code
cd inventory-management-app
Install the dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root directory and add your MongoDB URI and any other necessary environment variables:

makefile
Copy code
MONGODB_URI=your-mongodb-uri
SECRET=your-secret-key
Start the application:

bash
Copy code
npm start
Access the app:

Open your web browser and go to http://localhost:3000.

Usage
Products Management: Add, edit, view, and delete products.
Categories Management: Add, edit, view, and delete categories.
User Authentication: Register and log in to access the app securely.
Contributing
Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

License
This project is licensed under the MIT License. See the LICENSE file for more details.
