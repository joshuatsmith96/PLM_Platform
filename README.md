# Project Lifecycle Hub

A full-stack application for tracking and managing project lifecycles through various stages, from initiation to closeout.

## 📋 Overview

Project Lifecycle Hub is a project management system that allows teams to track projects through predefined stages, monitor critical status, attach documentation, and maintain detailed stage-specific notes. The system provides a comprehensive view of all projects with pagination, filtering, and search capabilities.

## 🎨 Design Resources

- **Original Database Design**: [Lucidchart ERD](https://lucid.app/lucidchart/1acfe1ac-b2b2-4713-971d-75b5451a0ca1/edit?viewport_loc=-991%2C-141%2C3068%2C1503%2C0_0&invitationId=inv_ed2c261e-1d65-48c8-bec8-79d147a95e2c)
- **Original Frontend Design**: [Figma Mockup](https://www.figma.com/design/QEVMT6MFV4qgri72Ocramw/Project-Lifecycle-Hub?node-id=0-1&t=12nMkrJV8x9Modwi-1)

## 🏗️ Architecture

### Tech Stack

**Backend:**
- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres)

**Frontend:**
- React with TypeScript
- Material-UI (MUI)
- Custom hooks for data fetching

## 📊 Database Schema

### STAGE_MASTER
Defines the standard project lifecycle stages.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| stage_id | VARCHAR(20) | PRIMARY KEY | Unique identifier (e.g., `S01_INIT`) |
| stage_name | VARCHAR(100) | NOT NULL | Display name (e.g., 'Initiation & Planning') |
| sequence_order | INTEGER | NOT NULL | Numeric sort order (10, 20, 30...) |

**Default Stages:**
- `S01_INIT` - Initiation/Planning
- `S02_BUILD` - Execution/Development
- `S03_TEST` - Testing/Quality Assurance
- `S04_DEPLOY` - Deployment/Launch
- `S05_CLOSE` - Closeout/Review

### PROJECT
Core project information and current status.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| project_id | VARCHAR(20) | PRIMARY KEY | Unique project ID (e.g., `P116`) |
| project_name | VARCHAR(100) | NOT NULL | Project name |
| project_creation_date | TIMESTAMP WITH TIME ZONE | NOT NULL | Auto-set to NOW() |
| project_team_lead | VARCHAR(100) | | Team lead name |
| project_lead_department | VARCHAR(50) | | Department |
| project_poc_email | VARCHAR(100) | | Point of contact email |
| project_poc_phone | VARCHAR(20) | | Point of contact phone |
| project_current_stage | VARCHAR(20) | NOT NULL, FK | Current stage (defaults to `S01_INIT`) |
| project_critical_status | VARCHAR(50) | | Health status |
| project_lifecycle_type | VARCHAR(50) | | Project type |
| project_next_required_action | TEXT | | Next immediate task |

### STAGE_DETAILS
Historical record of stage transitions and notes.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| stage_detail_id | VARCHAR(50) | PRIMARY KEY | Unique ID (e.g., `P116_S01`) |
| project_id | VARCHAR(20) | NOT NULL, FK | Parent project |
| stage_id | VARCHAR(20) | NOT NULL, FK | Stage reference |
| project_stage_status | VARCHAR(50) | | Stage status |
| project_stage_notes | TEXT | | Detailed notes |
| project_stage_attachment_links | TEXT[] | | Array of attachment URLs |
| timestamp | TIMESTAMP WITH TIME ZONE | NOT NULL | Record creation time |

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project-lifecycle-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   DBUSER=your_db_user
   HOST=localhost
   DATABASE=your_database_name
   DBPASSWORD=your_db_password
   PORT=3000
   ```

4. **Initialize the database**
   
   Run the following SQL to create tables:
   ```sql
   -- Create STAGE_MASTER table
   CREATE TABLE STAGE_MASTER (
     stage_id VARCHAR(20) PRIMARY KEY,
     stage_name VARCHAR(100) NOT NULL,
     sequence_order INTEGER NOT NULL
   );

   -- Insert default stages
   INSERT INTO STAGE_MASTER (stage_id, stage_name, sequence_order) VALUES
   ('S01_INIT', 'Initiation & Planning', 10),
   ('S02_EXEC', 'Execution & Development', 20),
   ('S03_TEST', 'Testing & Review', 30),
   ('S04_CLOS', 'Closing & Handover', 40);

   -- Create PROJECT table
   CREATE TABLE PROJECT (
     project_id VARCHAR(20) PRIMARY KEY,
     project_name VARCHAR(100) NOT NULL,
     project_creation_date TIMESTAMP WITH TIME ZONE NOT NULL,
     project_team_lead VARCHAR(100),
     project_lead_department VARCHAR(50),
     project_poc_email VARCHAR(100),
     project_poc_phone VARCHAR(20),
     project_current_stage VARCHAR(20) NOT NULL REFERENCES STAGE_MASTER(stage_id),
     project_critical_status VARCHAR(50),
     project_lifecycle_type VARCHAR(50),
     project_next_required_action TEXT
   );

   -- Create STAGE_DETAILS table
   CREATE TABLE STAGE_DETAILS (
     stage_detail_id VARCHAR(50) PRIMARY KEY,
     project_id VARCHAR(20) NOT NULL REFERENCES PROJECT(project_id),
     stage_id VARCHAR(20) NOT NULL REFERENCES STAGE_MASTER(stage_id),
     project_stage_status VARCHAR(50),
     project_stage_notes TEXT,
     project_stage_attachment_links TEXT[],
     timestamp TIMESTAMP WITH TIME ZONE NOT NULL
   );
   ```

5. **Start the server**
   ```bash
   npm start
   ```
   
   Server runs on `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## 📡 API Endpoints

### Projects

#### Get All Projects
```
GET /api/v1/projects?page=1&limit=10
```

**Response:**
```json
{
  "message": "Projects retrieved successfully",
  "count": 10,
  "data": [...]
}
```

#### Get Project by ID
```
GET /api/v1/projects/:id
```

#### Create Project
```
POST /api/v1/projects
```

**Required Fields:**
- `project_id`
- `project_name`
- - `project_team_lead`
- `project_lead_department`
- `project_poc_email`
- `project_poc_phone`
- `project_critical_status`
- `project_lifecycle_type`
- `project_next_required_action`

**Auto-Generated:**
- `project_creation_date` (set to NOW())
- `project_current_stage` (defaults to `S01_INIT`)
- Initial `STAGE_DETAILS` record

**Example Request:**
```json
{
  "project_id": "P123",
  "project_name": "New Project",
  "project_team_lead": "John Doe",
  "project_critical_status": "Green",
  "project_lifecycle_type": "Agile"
}
```

#### Delete Project
```
DELETE /api/v1/projects/:id
```
*Note: Cascades to delete associated STAGE_DETAILS records*

### Stage Details

#### Create Stage Detail
```
POST /api/v1/stages
```

**Required Fields:**
- `stage_detail_id`
- `project_id`
- `stage_id`

**Optional Fields:**
- `project_stage_status` (defaults to "Started")
- `project_stage_notes`
- `project_stage_attachment_links` (array)

#### Update Stage Detail
```
PATCH /api/v1/stages/:id
```

**Updatable Fields:**
- `project_stage_status`
- `project_stage_notes`
- `project_stage_attachment_links`

**Example Request:**
```json
{
  "project_stage_notes": "Completed initial design phase",
  "project_stage_attachment_links": [
    "https://example.com/design-doc.pdf",
    "https://example.com/wireframes.pdf"
  ]
}
```

## 🎯 Key Features

### Automatic Stage Creation
When a new project is created, the system automatically:
1. Sets `project_creation_date` to the current timestamp
2. Sets `project_current_stage` to `S01_INIT`
3. Creates an initial `STAGE_DETAILS` record with:
   - `stage_detail_id`: `{project_id}_S01`
   - `project_stage_status`: "Started"
   - `timestamp`: Current timestamp

### Array Support for Attachments
The `project_stage_attachment_links` field is a PostgreSQL TEXT[] array, allowing multiple attachment URLs per stage.

### Pagination
The projects list endpoint supports server-side pagination with customizable page size (5, 10, 25, or 50 items per page).

### Custom Hooks
Frontend uses a custom `useProjects` hook that:
- Fetches projects with pagination
- Handles loading and error states
- Provides a `refetch` function for manual data refresh
- Returns pagination metadata

## 📁 Project Structure

```
project-lifecycle-hub/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── projectController.js  # Project route handlers
│   │   └── stageController.js    # Stage route handlers
│   ├── models/
│   │   ├── projectModel.js       # Project database queries
│   │   └── stageModel.js         # Stage database queries
│   ├── routes/
│   │   ├── projectRoutes.js      # Project endpoints
│   │   └── stageRoutes.js        # Stage endpoints
│   ├── server.js                 # Express app entry point
│   ├── .env                      # Environment variables
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── OverviewTable/
    │   │       ├── OverviewTable.tsx
    │   │       └── Parts/
    │   │           ├── TRow.tsx
    │   │           └── TableColumns.tsx
    │   ├── hooks/
    │   │   └── useProjects.ts    # Custom data fetching hook
    │   └── App.tsx
    └── package.json
```

## 🔧 Configuration

### Database Connection (db.js)
```javascript
const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.DBPASSWORD,
  port: 5433,
});
```

### API Base URL
Update the base URL in `useProjects.ts` if deploying to production:
```typescript
const response = await fetch(
  `http://localhost:3000/api/v1/projects?page=${page}&limit=${limit}`
);
```

## 🐛 Troubleshooting

### Common Issues

**Error: "Could not create project. Check data integrity and constraints."**
- Ensure all required fields are provided
- Verify `project_id` is unique
- Check that `project_current_stage` references a valid stage in `STAGE_MASTER`

**Stage Details Not Creating**
- Verify column name is `project_stage_attachment_links` (plural) not `project_stage_attachment_link`
- Check that the stage_id exists in STAGE_MASTER

**CORS Errors**
- Add CORS middleware to Express if frontend and backend are on different domains:
```javascript
const cors = require('cors');
app.use(cors());
```

## 🚦 Best Practices

1. **Project IDs**: Use a consistent naming convention (e.g., `P001`, `P002`)
2. **Stage Detail IDs**: Follow the pattern `{project_id}_{stage_sequence}` (e.g., `P001_S01`)
3. **Critical Status**: Use standardized values (e.g., "Green", "Yellow", "Red")
4. **Error Handling**: Always check API responses for errors before proceeding
5. **Data Validation**: Validate user input on both frontend and backend

## 📝 Future Enhancements

- User authentication and authorization
- Role-based access control
- Real-time notifications for stage transitions
- Advanced search and filtering
- Export functionality (CSV, PDF)
- Stage transition workflow automation
- File upload integration for attachments
- Activity audit log
- Dashboard with analytics and charts

## 📧 Contact

For questions or support, please contact Joshua.

---

**Built with ❤️ using Node.js, Express, PostgreSQL, React, and TypeScript**
