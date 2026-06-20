# SOFTWARE PROJECT REPORT
## MOMENTRY – A React Based Instagram Clone Social Media Application

---

## Project Report By
**Name :** __Nameet_Mandwal__ \
**Designation :** __MERN_Stack_Trainner__/__Senior_Software_Engineer  
**Batch :** __Mindcoders_MERN_Stack_batch_5_PM__  
**Project Level :** __React_Frontend_Major_project__  
**Institute_Name :** __Mindcoders__________________


---




# ABSTRACT

Social media applications have become one of the most important communication and content-sharing platforms in the digital era. Applications such as Instagram provide users with a rich ecosystem for sharing posts, stories, reactions, comments, and personal interactions. Inspired by this concept, the project **MOMENTRY** has been developed as a frontend-focused Instagram clone that simulates the behavior of a real-world social networking platform.

MOMENTRY is developed using **React.js** as the primary frontend library with **Vite** as the build tool for faster development and optimized production builds. For application styling, **Tailwind CSS** has been used to create a clean and responsive user interface. The project uses **Redux Toolkit** for centralized state management, ensuring efficient handling of user authentication, posts, notifications, chats, follow requests, and saved content. Since the objective of this project was to focus on frontend architecture without implementing a dedicated backend server, **json-server** has been used to simulate a REST API through a local `database.json` file.

The application provides major social media functionalities such as user registration and login, image post creation, likes, comments, follow requests, notifications, stories, saved posts, and one-to-one messaging. Although real-time synchronization is not implemented, data consistency is maintained through REST-based fetching and page refresh mechanisms. The project demonstrates practical implementation of component-based architecture, asynchronous API communication, reusable custom hooks, and modular Redux feature slices.

This report has been further extended with diagrams, testing methodology, planning charts, and software engineering analysis to satisfy complete academic project submission standards.

---

# TABLE OF CONTENTS

1. Introduction  
2. Problem Statement  
3. Objectives of the Project  
4. Existing System  
5. Proposed System  
6. Feasibility Study  
7. System Requirements  
8. Technology Stack  
9. System Architecture  
10. Data Flow Diagram  
11. Use Case Diagram  
12. ER Diagram  
13. Module Description  
14. API Design and Data Flow  
15. Database Schema Overview  
16. Implementation Details  
17. Testing Methodology  
18. Gantt Chart / Project Planning  
19. Advantages of the System  
20. Limitations  
21. Future Enhancements  
22. Viva Questions with Answers  
23. Conclusion  
24. References

---

# 1. INTRODUCTION

The rapid growth of social media has transformed the way individuals communicate, share memories, and interact digitally. Instagram is one of the most influential social networking applications that allows users to upload photos, create stories, communicate via direct messages, and engage with content through likes and comments.

The purpose of this project is to build a simplified but functionally rich clone of Instagram named **MOMENTRY**. This application reproduces major social media workflows while emphasizing frontend engineering concepts such as state management, API simulation, reusable business logic, and responsive UI development.

The system has been designed as a Single Page Application (SPA) where users can navigate seamlessly between the home feed, profile pages, stories, notifications, and messaging screens without full browser reloads.

---

# 2. PROBLEM STATEMENT

To design and develop a modern social networking frontend application that simulates a real Instagram-like user experience using only frontend technologies and a mock REST API.

---

# 3. OBJECTIVES OF THE PROJECT

- To develop a responsive social media web application.
- To implement user authentication and profile management.
- To allow users to create and share image posts.
- To implement social interactions such as likes, comments, and saved posts.
- To build follow request and follow acceptance workflows.
- To create a notification system for user activities.
- To implement story sharing functionality.
- To create a one-to-one messaging module.
- To manage global application state efficiently using Redux Toolkit.
- To simulate REST API communication using json-server.

---

# 4. EXISTING SYSTEM

Commercial social media systems like Instagram and Facebook provide complete cloud-based backend infrastructure, secure authentication, media processing, recommendation systems, and real-time messaging. However, such systems require distributed backend architecture and significant deployment cost.

Academic learners often struggle to understand these workflows because of backend complexity.

---

# 5. PROPOSED SYSTEM

MOMENTRY solves this by simulating the social networking lifecycle entirely on frontend architecture. It uses json-server to expose backend-like REST endpoints from `database.json`, enabling realistic CRUD communication through Axios. fileciteturn0file0

---

# 6. FEASIBILITY STUDY

## Technical Feasibility
React ecosystem and json-server provide all required tools to build and test the system efficiently.

## Economic Feasibility
The project is open-source based and requires zero paid infrastructure.

## Operational Feasibility
The system can run on any standard laptop with Node.js installed.

---

# 7. SYSTEM REQUIREMENTS

## Hardware Requirements
- Intel i3/i5 Processor
- 4 GB RAM or above
- 500 MB storage

## Software Requirements
- Node.js
- npm
- VS Code
- Browser
- json-server

---

# 8. TECHNOLOGY STACK

| Technology | Purpose |
|------------|---------|
| React.js | Frontend component architecture |
| Vite | Development bundler |
| Tailwind CSS | Styling |
| Redux Toolkit | Global state management |
| React Router DOM | SPA routing |
| Axios | REST communication |
| React Hook Form | Form handling |
| json-server | Mock API |
| Custom Hooks | Reusable feature logic |

---

# 9. SYSTEM ARCHITECTURE

User Interface Layer → React Components  
Business Logic Layer → Custom Hooks + Redux Async Thunks  
Global State Layer → Redux Store  
Service Layer → Axios API Collections  
Mock Backend Layer → json-server REST resources  
Persistent Data Layer → database.json

---

# 10. DATA FLOW DIAGRAM (DFD)

## Level 0 DFD

User → Momentry Application → json-server Database

User sends requests such as login, upload post, like, comment, message. Application processes state and communicates with REST API. API updates database.json and returns updated data.

## Level 1 DFD

- Authentication Process
- Post Management Process
- Notification Process
- Follow Management Process
- Messaging Process

Each process exchanges data with corresponding JSON resources.

---

# 11. USE CASE DIAGRAM

### Primary Actor: Registered User

Use Cases:
- Sign Up / Login
- Upload Post
- View Feed
- Like Post
- Comment on Post
- Save Post
- Send Follow Request
- Accept Follow Request
- Upload Story
- Send Message
- View Notifications
- Edit Profile

---

# 12. ER DIAGRAM

Entities involved:

- USER
- POST
- STORY
- MESSAGE
- FOLLOWREQUEST
- FOLLOW
- NOTIFICATION
- SAVEDPOST

Relationships:
- One user can create many posts.
- One user can create many stories.
- One user can send many messages.
- One user can receive many notifications.
- Users can follow many users.

---

# 13. MODULE DESCRIPTION

## Authentication Module
Handles registration, credential verification, localStorage session.

## Feed Module
Displays all public content and stories.

## Post Module
Handles upload, likes, comments, delete, save.

## Follow Module
Handles pending requests and accepted follow relations.

## Notification Module
Tracks every social interaction.

## Story Module
Displays followed users' stories.

## Messaging Module
Provides one-to-one communication.

---

# 14. API DESIGN AND DATA FLOW

The application communicates with json-server running at localhost:8000. Resources include `/users`, `/posts`, `/notifications`, `/savedPosts`, `/followRequests`, `/follows`, `/stories`, and `/messages`. CRUD operations are wrapped through Axios service files and feature-based APIs. fileciteturn0file0

---

# 15. DATABASE SCHEMA OVERVIEW

`database.json` acts as the central repository.

Collections:
- users
- posts
- notifications
- savedPosts
- followRequests
- follows
- stories
- messages

Each collection stores structured records representing application entities.

---

# 16. IMPLEMENTATION DETAILS

The software uses feature-sliced Redux Toolkit reducers for predictable state management. Async thunks manage API calls and update store snapshots. Custom hooks encapsulate feature-specific UI behavior such as conversation generation, story feed filtering, notification fetching, and message thread control.

React Router DOM manages all application page navigation, while Tailwind CSS provides responsive Instagram-inspired layouts.

---

# 17. TESTING METHODOLOGY

| Test Case | Input | Expected Output | Result |
|-----------|-------|----------------|--------|
| User Login | Correct Email/Password | Dashboard Opened | Pass |
| Create Post | Valid Image + Caption | Post Added in Feed | Pass |
| Like Post | Click Like Button | Like Count Updated | Pass |
| Comment Post | Enter Comment | Comment Visible | Pass |
| Send Follow Request | Click Follow | Request Stored | Pass |
| Accept Request | Accept Action | Follow Relation Added | Pass |
| Send Message | Enter Text | Message Appears in Thread | Pass |
| Upload Story | Select Story Image | Story Added | Pass |

---

# 18. GANTT CHART / PROJECT PLANNING

Week 1 – Requirement Analysis  
Week 2 – UI Design  
Week 3 – React Routing Setup  
Week 4 – Authentication Module  
Week 5 – Post & Feed Module  
Week 6 – Follow & Notification Module  
Week 7 – Story & Messaging Module  
Week 8 – Redux Refactoring  
Week 9 – Testing & Bug Fixing  
Week 10 – Documentation

---

# 19. ADVANTAGES OF THE SYSTEM

- Scalable frontend architecture
- Easy maintenance through feature-based coding
- Simulated backend without server complexity
- Professional UI/UX
- Strong academic demonstration of SPA engineering

---

# 20. LIMITATIONS

- No JWT authentication
- No WebSocket real-time updates
- Local JSON data only
- Limited concurrency support

---

# 21. FUTURE ENHANCEMENTS

- MERN backend integration
- MongoDB Atlas deployment
- Socket.IO live chat
- Reels/video upload
- Search and recommendation engine
- Public cloud hosting

---

# 22. VIVA QUESTIONS WITH ANSWERS

### Q1. Why did you use json-server?
To simulate backend REST APIs without building Node.js server code.

### Q2. Why Redux Toolkit instead of Context API?
Redux Toolkit provides scalable centralized state and async thunk support.

### Q3. Why custom hooks?
To separate reusable feature logic from UI components.

### Q4. Is this a full stack project?
No, it is a frontend-dominant project with mock backend simulation.

### Q5. What is the biggest challenge?
Managing interconnected social modules while keeping state synchronized.

---

# 23. CONCLUSION

MOMENTRY is a comprehensive React-based Instagram clone that successfully demonstrates advanced frontend application engineering. It integrates authentication, social posting, notifications, follow workflows, stories, and messaging inside a single modular architecture. Through Redux Toolkit, custom hooks, and json-server based API simulation, the application delivers a realistic social media experience suitable for both academic submission and portfolio presentation.

---

# 24. REFERENCES

1. React Documentation  
2. Redux Toolkit Documentation  
3. Tailwind CSS Docs  
4. Vite Docs  
5. json-server GitHub  
6. Internal README + API Documentation fileciteturn0file0

