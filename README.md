# 🚀 PathPulse – Roadmap Feedback App

PathPulse is a full-stack web application that allows users to view, upvote, and comment on roadmap items. It is designed to foster community engagement by allowing feedback through comments and replies, up to three levels deep.


## 🔗 Live Preview

https://roadmap-930ff.web.app/

## 🛠️ Tech Stack

### Frontend:
 **React.js**
 **React Router**
 **Tailwind CSS**
 **Firebase Authentication**

### Backend:
 **Express.js**
 **MongoDB**
 **Node.js**

## 🔐 Features

### 🔓 Authentication
1. Register and login using Firebase Auth
2. Protects routes to ensure only logged-in users can interact

### 🧭 Roadmap Items
1. View all roadmap items with filters for:
    Category: Feature, Improvement, Goal
    Status: Planned, In Progress, Completed
    Sorting: Most Popular, Newest
2. View details of any item (restricted to authenticated users)

### 📈 Upvoting
  Users can upvote a roadmap item once
  Votes are counted and displayed

### 💬 Commenting System
  Add comments and replies (up to 3 nested levels)
  Edit and delete own comments
  Threaded comment structure for better discussions

### 🌐 Navigation
  Smooth client-side routing
  Responsive navigation bar and footer


## Developer Notes

### Thinking Process
Feature Design
Authentication System:Ensures only registered users can access sensitive pages like roadmap details and commenting.Used Firebase Authentication to handle registration, login, logout, and session persistence.
Chose Firebase for simplicity and speed over setting up.

Roadmap Item Listing & Filtering:To let users easily browse and sort roadmap features.Implemented filtering by category, status, and sorting by upvotes/date using client-side logic.Chose client-side filtering for simplicity since the dataset is small. For large data, server-side filtering would be ideal.

Roadmap Details Page:To allow users to engage with individual feature requests.Includes upvoting, commenting, and threaded replies (up to 3 levels).Allowed upvotes per user using email tracking; a more secure solution would involve token-based verification.

Upvoting & Commenting:To allow community engagement and feedback collection. Used MongoDB updates with PATCH/POST requests and comment nesting logic.Reloading the page after actions.

### Architecture Decisions
Frontend: React.js : Chose React due to its component-based structure, which allowed for a clean and modular UI. It also has a strong ecosystem and is widely used in production apps.Easy state management with hooks, reusable components, and community support.

Backend: Express.js with MongoDB : Lightweight, minimal, and very suitable for REST API development.MongoDB Ideal for flexible data structures like comments with nested replies. 


### Code Style
Component Structure

Followed modular components: Navbar, Footer, RoadmapItems, RoadmapDetails, Login, Register, etc., each separated for reusability and clarity.

1.Naming Conventions

Used camelCase for variables and functions.

Components are named in PascalCase for consistency with React standards.

2.API Patterns

Followed RESTful principles:

GET for fetching items and comments.

POST for adding comments or users.

PATCH for upvoting or editing.

DELETE for comment deletion.

3.Folder Organization

Kept components, pages, context (AuthProvider), and styles organized.

Used provider/AuthProvider.js to manage global user state.

4.Best Practices

Used useEffect for side effects (fetching data).

Used controlled forms for login and register.

Disabled upvote button after voting to improve UX.



