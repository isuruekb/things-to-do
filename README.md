# ToDo App

A full-stack ToDo task management application built with:

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: .NET Core Web API
- **Database**: Microsoft SQL Server
- **Containerization**: Docker + Docker Compose

---

## Features

- Add tasks with title and description
- Only the latest 5 tasks are shown
- Mark tasks as complete (hides them from the UI)
- Responsive, clean UI
- Fully containerized with Docker Compose

## Bouns Features
- Delete tasks
- Show completed tasks 
- Undo completed tasks 

---

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) installed on your machine

### Environment Variables

Change `.env` file in the root directory credentials with the your onces:

```env
SA_PASSWORD=yourStrongPassword123
ACCEPT_EULA=Y
MSSQL_PID=Express
```

---

## Running the Application

1. **Clone the repository:**

```bash
git clone https://github.com/isuruekb/things-to-do.git
cd things-to-do
```

2. **Start all services using Docker Compose:**

```bash
docker-compose up --build
```

This will:
- Build and serve the React frontend at `http://localhost:5173`
- Start the .NET backend API at `http://localhost:5000`
- Launch a SQL Server instance on port `1433`

---

## API Endpoints

The backend exposes REST endpoints at `/api/TodoTasks`, e.g.:

- `GET /api/TodoTasks/GetNotCompletedToDoTasks` - Get the last 5 non-completed tasks
- `GET /api/TodoTasks/GetCompletedToDoTasks` - Get last completed tasks
- `DELETE /api/TodoTasks/RemoveToDoTask/${id}` - Delete task
- `PUT /api/TodoTasks/EditToDoTask/${task.id}` - Update task status
- `POST /api/TodoTasks/CreateToDoTask` - Create a new task

---

## Project Structure

```
root
├── frontend/
│   └── todo-app/
│       ├── Dockerfile
│       └── [React App Files]
├── backend/
│   └── ToDoAppApi/
│       ├── Dockerfile
│       └── [ASP.NET Core Project Files]
├── docker-compose.yml
└── README.md
```

---

## Docker Details

### Frontend Dockerfile
Located at: `frontend/todo-app/Dockerfile`

- Builds the Vite project
- Serves the `dist` folder using `serve`

### Backend Dockerfile
Located at: `backend/ToDoAppApi/Dockerfile`

- Restores and publishes .NET API
- Runs the built DLL

### Docker Compose

Defines and connects all three services:
- **frontend**: Depends on backend, uses `VITE_API_URL` to connect
- **backend**: Depends on SQL Server, uses connection string from env
- **db**: SQL Server container using secrets from `.env`

---

## Development Notes

- You can access the frontend at `http://localhost:5173`
- Backend API is available at `http://localhost:5000/api`
- SQL Server is running on `localhost:1433`

To connect to the SQL Server using **SQL Server Management Studio**, use:
- **Server**: `localhost,1433`
- **User**: `sa`
- **Password**: `yourStrongPassword123`

---

## Contact

For any questions, please contact [isuruekb@gmail.com].

---
