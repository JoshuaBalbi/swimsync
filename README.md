# SwimSync

## Cloud-Native Swim Team Management Platform

SwimSync is a full-stack cloud-native web application designed to modernize swim team management for coaches and athletes. The platform provides tools for practice management, meet coordination, swimmer progress tracking, attendance monitoring, AI-powered practice generation, and team communication workflows.

Built using AWS Amplify Gen 2 and modern React architecture, SwimSync combines scalable cloud infrastructure with an intuitive user experience tailored specifically for competitive swimming environments.

---

# Live Deployment

> [Amplify URL](https://main.dvm1jt503o71e.amplifyapp.com/)

```txt
https://main.dvm1jt503o71e.amplifyapp.com/
```

---

# Demo Video

> Add demo video link here.

```txt
https://youtube.com/...
```

---

# Screenshots

## Landing Page

*Add screenshot here*

---

## Coach Dashboard

*Add screenshot here*

---

## AI Practice Builder

*Add screenshot here*

---

## Meet Management

*Add screenshot here*

---

## Swimmer Profile

*Add screenshot here*

---

# Problem Statement

Most swim teams rely on fragmented systems such as spreadsheets, PDFs, messaging apps, handwritten attendance sheets, and disconnected meet management tools.

These approaches create several issues:

* Difficult communication between coaches and swimmers
* Manual attendance tracking
* Poor visibility into swimmer progression
* Inefficient practice creation workflows
* Complicated meet coordination
* Lack of centralized file sharing
* No structured team management system
* Limited accessibility for swimmers outside organized teams

SwimSync was created to solve these issues through a centralized cloud-native platform built specifically for swim teams.

---

# Core Features

# Authentication & User Roles

* AWS Cognito authentication
* Secure sign up / login
* Coach and swimmer role separation
* Protected routes
* Role-based access control
* Persistent user sessions

---

# Team Management

## Coaches Can:

* Create teams
* Manage swimmers
* Approve/reject join requests
* View roster members
* Track swimmer progress
* Manage attendance

## Swimmers Can:

* Join teams using join requests
* View team practices
* Access meet information
* Track personal progress

---

# Practice Management

## Coaches Can Create Practices Using:

### 1. Text Practice Builder

Traditional free-form practice writing.

### 2. Structured Set Builder

Section-based workout generation including:

* Warmup
* Pre-set
* Main Set
* Post-set
* Warmdown

Automatic yardage calculation included.

### 3. AI Practice Generator (Amazon Bedrock)

AI-generated swim practices powered by Amazon Bedrock and Anthropic Claude.

Coaches can specify:

* Practice type
* Focus area
* Skill level
* Yardage / duration
* Coach notes

The AI generates:

* Structured swim practices
* Realistic intervals
* Organized workout formatting
* Coach notes and recommendations

Generated practices can be edited before saving.

---

# Attendance Tracking

## Coaches Can:

* Mark swimmer attendance
* Track attendance history
* Monitor participation trends

## Swimmers Can:

* View attendance history
* Monitor consistency

---

# Meet Management

## Coaches Can:

* Create meets
* Upload meet files
* Attach important links
* Add meet descriptions
* Set course type:

  * SCY
  * SCM
  * LCM

### Supported Meet Resources:

* Meet info
* Psych sheets
* Timelines
* Warmup assignments
* Hotel/travel documents
* Entry lists
* External links

---

# Meet Event Requests

## Swimmers Can:

* Indicate meet attendance availability
* Request multiple events
* Automatically attach best times
* View all submitted events

## Coaches Can:

* View swimmer attendance status
* Expand swimmer entries
* See requested events
* See swimmer best times
* Review meet participation

---

# Swimmer Profiles

Each swimmer has a centralized profile displaying:

* Personal best times
* Attendance history
* Meet participation
* Requested meet events
* Progress tracking
* Race history

---

# Race Time Management

## Features Include:

* Add/edit/delete race times
* Course filtering
* Best time tracking
* Time history
* Progression analysis

---

# Public vs Private Practices

## Public Practices

Visible to:

* Independent swimmers
* Non-team users

## Private Practices

Visible only to:

* Approved team members
* Assigned team coaches

---

# AWS Services Used

# AWS Amplify Gen 2

Used for:

* Backend infrastructure
* Deployment
* CI/CD pipeline
* Data schema management
* Authentication integration

---

# AWS Cognito

Used for:

* User authentication
* Secure login/signup
* Session management
* Protected routes
* Role-based user access

---

# AWS AppSync

Used for:

* GraphQL API
* Real-time backend communication
* Model operations
* Data synchronization

---

# AWS DynamoDB

Used for storing:

* Users
* Teams
* Practices
* Attendance records
* Meets
* Event requests
* Race times
* Meet files

---

# AWS Lambda

Used for:

* Backend business logic
* AI practice generation
* Bedrock integration

---

# AWS Bedrock

Used for:

* AI-powered practice generation
* Structured workout creation
* Swim-specific coaching assistance

Model Used:

```txt
Anthropic Claude Haiku 4.5
```

---

# AWS S3

Used for:

* Meet file uploads
* Document storage
* File retrieval

---

# AWS Amplify Hosting

Used for:

* Frontend deployment
* Continuous deployment
* GitHub integration
* Production hosting

---

# Architecture Overview

```txt
React Frontend
        ↓
AWS Amplify Hosting
        ↓
AWS Amplify Gen 2 Backend
        ↓
 ┌─────────────────────────────┐
 │ AWS Cognito                 │
 │ AWS AppSync                 │
 │ AWS DynamoDB                │
 │ AWS Lambda                  │
 │ AWS S3                      │
 │ AWS Bedrock                 │
 └─────────────────────────────┘
```

---

# Tech Stack

## Frontend

* React
* React Router
* Bootstrap 5
* Vite
* JavaScript

---

## Backend

* AWS Amplify Gen 2
* GraphQL
* AWS Lambda

---

## Cloud Services

* AWS Cognito
* AWS DynamoDB
* AWS AppSync
* AWS S3
* AWS Bedrock
* AWS Amplify Hosting

---

# Folder Structure

```txt
frontend/
│
├── amplify/
│   ├── auth/
│   ├── data/
│   ├── storage/
│   └── functions/
│
├── src/
│   ├── components/
│   │   └── ui/
│   │
│   ├── features/
│   │   ├── attendance/
│   │   ├── meets/
│   │   ├── team/
│   │   ├── times/
│   │   ├── aiPractice/
│   │   └── createPractice/
│   │
│   ├── pages/
│   └── routes/
│
└── package.json
```

---

# Installation & Setup

# 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/swimsync.git
```

---

# 2. Navigate to Frontend

```bash
cd swimsync/frontend
```

---

# 3. Install Dependencies

```bash
npm install
```

---

# 4. Start Amplify Sandbox

```bash
npx ampx sandbox
```

---

# 5. Run Development Server

```bash
npm run dev
```

---

# Deployment

SwimSync is deployed using AWS Amplify Hosting.

## Deployment Workflow

```txt
GitHub Push
      ↓
Amplify CI/CD Pipeline
      ↓
Backend Deployment
      ↓
Frontend Build
      ↓
Production Deployment
```

---

# Challenges Faced

## 1. Role-Based Authorization

Implementing separate coach and swimmer workflows while maintaining secure access control.

---

## 2. Team Approval Logic

Ensuring swimmers could not access private team practices before coach approval.

---

## 3. AWS Bedrock Integration

Integrating Bedrock with Amplify Gen 2 using Lambda functions and custom GraphQL queries.

---

## 4. File Upload Management

Handling secure meet file uploads and retrieval through AWS S3.

---

## 5. Production Deployment

Resolving Linux case-sensitive import issues during Amplify deployment.

---

# Future Improvements

* Mobile app version
* Push notifications
* Calendar integration
* Team messaging system
* AI interval recommendations
* Advanced swimmer analytics
* Meet scoring system
* Workout sharing marketplace
* Coach collaboration tools
* Dark mode support
* Wearable integration
* Real-time chat

---

# Educational Value

This project demonstrates:

* Full-stack web development
* Cloud-native architecture
* AWS infrastructure deployment
* Authentication systems
* Role-based authorization
* Serverless backend development
* AI integration using AWS Bedrock
* Scalable database design
* CI/CD deployment pipelines
* Production debugging workflows

---

# Author

## Joshua Balbi

Master of Science in Computer Engineering
Florida Atlantic University

* Full-stack development
* Cloud computing
* AWS architecture
* Mobile development
* Competitive swimming technology

GitHub: [GitHub Link](https://github.com/JoshuaBalbi)


LinkedIn: [LinkedIn Link](https://www.linkedin.com/in/joshua-balbi-4407981b3)

---

# Acknowledgements

Special thanks to:

* AWS Amplify documentation
* Amazon Bedrock documentation
* Anthropic Claude models
* Florida Atlantic University
* Swim coaches and athletes who inspired the platform

---

# License

This project was created for educational and demonstration purposes.

---

# Final Notes

SwimSync was designed to bridge the gap between competitive swimming and modern cloud-native software systems. By combining scalable AWS infrastructure with AI-powered tooling and real-world team workflows, the platform demonstrates how cloud computing can be applied to solve practical challenges in athletics and team management.
