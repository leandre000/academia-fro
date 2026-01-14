# Academia FRO - Enterprise LMS

A world-class enterprise Learning Management System (LMS) built with React, TypeScript, and Tailwind CSS. This is a comprehensive multi-portal application designed for students, trainers, mentors, administrators, and companies.

## Features

### Multi-Portal Architecture
- **Student Portal**: Roadmap visualization, schedule management, attendance tracking
- **Trainer Portal**: Availability management, student tracking, roadmap builder, wallet
- **Master Mentor Portal**: Roadmap review, progression control, checkup logs
- **Wing Administrator Portal**: Capacity management, student activity, wallet overview
- **Umbrella Administrator Portal**: Global analytics, wing performance, system rules
- **Company Portal**: Student progress tracking, program overview

### Key Features
- ✅ Role-based authentication and routing
- ✅ Comprehensive roadmap builder with visual preview
- ✅ Task progression system with lock/unlock states
- ✅ Session scheduling and attendance tracking
- ✅ Wallet and payment management
- ✅ Analytics and reporting dashboards
- ✅ Black and white professional UI design
- ✅ Fully mocked data (ready for backend integration)

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Zustand** for state management
- **React Hook Form + Zod** for form validation
- **Radix UI Icons** for iconography

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/leandre000/acadmia-fro.git
cd acadmia-fro
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Login Credentials (Mock)

The application uses mock authentication. You can log in with any of these roles:

- **Student**: `student@example.com`
- **Trainer**: `trainer@example.com`
- **Master Mentor**: `mentor@example.com`
- **Wing Admin**: `wingadmin@example.com`
- **Umbrella Admin**: `admin@example.com`
- **Company**: `company@example.com`

Or use the quick login buttons on the login page.

## Project Structure

```
src/
├── components/       # Reusable components (Sidebar, ProtectedRoute, etc.)
├── pages/           # Portal-specific pages
│   ├── student/     # Student portal pages
│   ├── trainer/     # Trainer portal pages
│   ├── master-mentor/ # Master mentor portal pages
│   ├── wing-admin/  # Wing admin portal pages
│   ├── umbrella-admin/ # Umbrella admin portal pages
│   └── company/     # Company portal pages
├── store/           # Zustand state management
├── types/           # TypeScript type definitions
├── data/            # Mock data
└── App.tsx          # Main app component with routing
```

## Design Principles

- **Dark-first, professional UI**: Black and white color scheme
- **Strong hierarchy**: Clear typography and spacing
- **Minimal animations**: Only where meaningful
- **Enterprise-grade**: Designed for real-world SaaS usage
- **Production-ready**: Not AI-generated looking

## Roadmap Builder

The roadmap builder allows trainers to:
- Create custom learning paths for students
- Define phases, tasks, and learning goals
- Set weekly hours and monthly pricing
- Add review checkpoints
- Preview roadmap before submission

## Task Progression System

- Tasks have three states: `pending`, `completed`, `blocked`
- Phases can be locked/unlocked by mentors
- Completion ≠ progression (requires mentor approval)
- Visual indicators for locked/unlocked states

## Development

### Build for production:
```bash
npm run build
```

### Preview production build:
```bash
npm run preview
```

### Lint:
```bash
npm run lint
```

## Contributing

This is a professional enterprise application. When contributing:
- Follow the existing code style
- Maintain the black and white design theme
- Ensure all portals are fully functional
- Add comprehensive mock data for new features

## License

Private project - All rights reserved

## Future Enhancements

- Backend API integration
- Real authentication system
- Payment processing
- Real-time notifications
- Advanced analytics
- Mobile responsive optimizations
