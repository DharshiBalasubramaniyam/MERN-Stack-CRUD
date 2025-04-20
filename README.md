# CRUD in MERN stack

<p>
  <img alt="Static Badge" src="https://img.shields.io/badge/Node.js-darkgreen?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/React.js-blue?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/MongoDB-red?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/Tailwind.css-purple?style=for-the-badge">
</p>

This is a simple todo web application to demonstrate CRUD operations in MERN stack.

The full form of CRUD is Create, Read, Update, and Delete. These four basic operations can be performed on data in a database or any persistent storage system.


- **Create**: This operation adds new data to the database. For example, adding a new record in a table.

- **Read**: This operation retrieves data from the database. For example, fetching records from a table.

- **Update**: This operation modifies existing data in the database. For example, changing values of an existing record.

- **Delete**: This operation removes data from the database. For example, deleting a record from a table.

These operations are fundamental to managing and manipulating data in a database, ensuring that users can interact with the data effectively.



| Task | HTTP Method | Route Path |
|----------|----------|----------|
| Get all tasks  | ![GET](https://img.shields.io/badge/GET-blue)     | `/todo/all`   |
| Get task by id | ![GET](https://img.shields.io/badge/GET-blue)     | `/todo/{id}`   |
| Create a task  | ![POST](https://img.shields.io/badge/POST-green)  | `/todo/new`   |
| Edit a task    | ![PUT](https://img.shields.io/badge/PUT-yellow)   | `/todo/{id}`   |
| Delete a task  | ![DELETE](https://img.shields.io/badge/DELETE-red)| `/todo/{id}`   |



## How to run the app?

1. Fork the repository.

2. Clone the Repository.

```bash
git clone https://github.com/<your_username>/MERN-Stack-CRUD.git
```

3. Go to root of the project directory.

```bash
cd MERN-Stack-CRUD
```

4. Navigate to server

```bash
cd server/
```

5. Install server dependencies

```bash
npm install
```

6. Run the server

```bash
npm start
```

7. Navigate to client

```bash
cd ../client/
```

8. Install client dependencies

```bash
npm install
```

9. Run the client

```bash
npm run dev
```

Check out the detailed implementation explanation [here](https://medium.com/@dharshib.8/getting-started-with-the-mern-stack-6b79d12626f0).

Find the demo [here](https://youtube.com/shorts/lVmchuyQdJg).
