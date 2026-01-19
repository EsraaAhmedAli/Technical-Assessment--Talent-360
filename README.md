# Department Management System

A full-stack application for managing department information with employee assignments. Built with NestJS (GraphQL) backend and React (TypeScript) frontend.

## Features

- **Department View**: Display department information including name, description, manager, location, and assigned employees
- **Department Edit**: Edit department details with form validation
- **Employee Management**: View and delete assigned employees
- **GraphQL API**: Efficient data fetching and mutations
- **Responsive Design**: Modern UI using Material-UI and Tailwind CSS

## Tech Stack

### Backend
- **NestJS**: Progressive Node.js framework
- **GraphQL**: Query language for APIs
- **TypeScript**: Type-safe JavaScript

### Frontend
- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **Material-UI (MUI)**: React component library
- **Tailwind CSS**: Utility-first CSS framework
- **React Hook Form**: Form state management
- **Apollo Client**: GraphQL client
- **Vite**: Fast build tool

## Project Structure

```
assigment-talent360/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── department/     # Department module
│   │   │   ├── entities/   # GraphQL entities
│   │   │   ├── dto/        # Data transfer objects
│   │   │   ├── department.resolver.ts
│   │   │   ├── department.service.ts
│   │   │   └── department.module.ts
│   │   ├── data/           # Static data
│   │   │   └── department.json
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   │   ├── DepartmentView.tsx
│   │   │   └── DepartmentEdit.tsx
│   │   ├── graphql/       # GraphQL queries and mutations
│   │   ├── apollo/        # Apollo Client configuration
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
└── README.md
```

## Prerequisites

- **Node.js**: v18 or higher
- **npm** or **yarn**: Package manager

## Installation & Setup

### Quick Start (Install All Dependencies)

From the root directory, install all dependencies:
```bash
npm run install:all
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run start:dev
```

The GraphQL server will be running on `http://localhost:4000/graphql`

You can access the GraphQL Playground at `http://localhost:4000/graphql` to test queries and mutations.

**Note**: Make sure the backend is running before starting the frontend.

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be running on `http://localhost:5173` (or another port if 5173 is occupied)

### Running Both Servers

You can run both servers from the root directory using separate terminals:

**Terminal 1 (Backend):**
```bash
npm run dev:backend
```

**Terminal 2 (Frontend):**
```bash
npm run dev:frontend
```

## Usage

### Viewing Department Information

1. Open the application in your browser (default: `http://localhost:5173`)
2. The department view page displays all department information
3. You can see:
   - Department name (with localized version)
   - Description (with localized version)
   - Code, Manager, Location
   - Employee count and status
   - List of assigned employees

### Editing Department Information

1. Click the "Edit" button on the department view page
2. Modify the fields you want to change:
   - Department Name
   - Description
   - Manager
   - Location
   - Status (Active/Inactive)
   - Localized fields (Arabic)
3. Click "Save" to update the department
4. You'll be redirected back to the view page

### Managing Employees

1. On the department view page, scroll to the "Assigned Employees" section
2. To delete an employee:
   - Click the delete icon (trash) next to the employee
   - Confirm the deletion
   - The employee will be removed from the list

## GraphQL API

### Queries

#### Get Department
```graphql
query GetDepartment($id: ID!) {
  department(id: $id) {
    id
    name
    description
    localization {
      name
      description
    }
    code
    manager
    location
    employeesNumber
    status
    parentDepartment {
      id
      name
    }
    createdAt
    employees {
      id
      name
      role
      contact
    }
  }
}
```

#### Get Employees
```graphql
query GetEmployees($departmentId: ID!) {
  employees(departmentId: $departmentId) {
    id
    name
    role
    contact
  }
}
```

### Mutations

#### Update Department
```graphql
mutation UpdateDepartment($id: ID!, $input: UpdateDepartmentInput!) {
  updateDepartment(id: $id, input: $input) {
    id
    name
    description
    localization {
      name
      description
    }
    code
    manager
    location
    employeesNumber
    status
  }
}
```

#### Delete Employee
```graphql
mutation DeleteEmployee($departmentId: ID!, $employeeId: ID!) {
  deleteEmployee(departmentId: $departmentId, employeeId: $employeeId) {
    success
    message
  }
}
```

## Development

### Backend Commands

```bash
# Start development server with hot reload
npm run start:dev

# Build for production
npm run build

# Start production server
npm run start:prod

# Run tests
npm test

# Lint code
npm run lint
```

### Frontend Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Performance Optimizations

1. **React.memo**: Components are memoized to prevent unnecessary re-renders
2. **Apollo Client Caching**: GraphQL queries are cached for better performance
3. **Code Splitting**: Routes are lazy-loaded where applicable
4. **Optimized Re-renders**: Using React Hook Form for efficient form state management

## Code Quality

- **TypeScript**: Full type safety across the application
- **ESLint**: Code linting for consistency
- **Clean Code**: Well-structured, readable, and maintainable code
- **Component Architecture**: Reusable and modular components

## Notes

- The backend uses static data from `department.json` (no database required)
- Department ID is currently hardcoded as "1" for this task
- All changes are stored in memory and will reset on server restart
- CORS is enabled on the backend to allow frontend connections

## Troubleshooting

### Backend Issues

- **Port 4000 already in use**: Change the port in `backend/src/main.ts`
- **Module not found**: Run `npm install` again
- **GraphQL schema errors**: Delete `src/schema.gql` and restart the server

### Frontend Issues

- **Cannot connect to backend**: Ensure backend is running on port 4000
- **CORS errors**: Check that CORS is enabled in `backend/src/main.ts`
- **Port conflicts**: Vite will automatically use the next available port

## License

MIT

<img width="1920" height="1946" alt="screencapture-localhost-5173-2026-01-19-12_15_26" src="https://github.com/user-attachments/assets/a659160a-9a1a-4eb6-a663-79c21322b92f" />
<img width="1920" height="1946" alt="screencapture-localhost-5173-2026-01-19-12_15_47" src="https://github.com/user-attachments/assets/1e7cfc30-ec97-4ae7-b079-1bd9776db2a8" />
<img width="1920" height="922" alt="screencapture-localhost-5173-2026-01-19-12_16_19" src="https://github.com/user-attachments/assets/2905cc27-a660-4261-bf2b-3313ae01b71d" />
<img width="1920" height="922" alt="screencapture-localhost-5173-2026-01-19-12_16_30" src="https://github.com/user-attachments/assets/5718e0ea-5238-426e-9b9a-4fd2839f64a6" />






