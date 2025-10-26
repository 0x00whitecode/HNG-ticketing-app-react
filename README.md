# HNG Collaboration Ticket Villa (HCTV)

A modern, responsive ticket management system built with React and Vite. HCTV provides an intuitive interface for creating, tracking, and managing tickets efficiently.

## 🚀 Features

- **Authentication System**
  - Secure user registration and login
  - Protected routes for authenticated users
  - Session management using localStorage (`ticketapp_session`)

- **Ticket Management**
  - Create, read, update, and delete tickets
  - Status tracking (Open, In Progress, Closed)
  - Priority levels
  - QR code generation for each ticket
  - Detailed ticket descriptions and metadata
  - Data persistence using localStorage (`ticketapp_tickets`)

- **Dashboard**
  - Real-time statistics
  - Quick overview of ticket status
  - Intuitive data visualization

- **Modern UI/UX**
  - Responsive design for all devices
  - Animated decorative elements
  - Smooth transitions and hover effects
  - Toast notifications for user feedback
  - Accessibility features

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Styling:** CSS3 with CSS Variables
- **Storage:** localStorage for data persistence
- **Utilities:** UUID for unique identifiers
- **QR Code:** qrcode library for ticket QR generation

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:5173 (or the port shown by Vite).

## 🎯 Usage

### Authentication
1. Navigate to `/auth/signup` to create a new account
2. Fill in required details (name, email, password)
3. Upon successful registration, you'll be redirected to the Dashboard
4. Use the same credentials for future logins

### Managing Tickets
- Create new tickets with title, status, priority, and description
- View all tickets in a responsive grid layout
- Edit or delete tickets using provided controls
- Track ticket status and priority
- Generate QR codes for easy ticket sharing

## 💻 Project Structure
```
ticket-app-react/
├── src/
│   ├── components/    # Reusable components
│   ├── services/     # Auth and ticket management
│   ├── pages/        # Page components
│   ├── assets/       # Static resources
│   ├── App.jsx       # Main application component
│   └── main.jsx      # Application entry point
├── public/           # Public assets
└── package.json      # Project dependencies
```

## 🎨 Design Features

- **Responsive Layout**
  - Max-width content (1440px)
  - Mobile-first approach
  - Adaptive components

- **Visual Elements**
  - Wavy SVG background
  - Floating decorative circles
  - Smooth animations
  - Clear visual hierarchy

## 🔒 Security & Data

- Protected routes using React Router
- Form validation and error handling
- Data persistence using localStorage
- Secure session management

## 🌟 Accessibility

- Semantic HTML structure
- Clear color contrast
- Keyboard navigation support
- Focus management
- ARIA attributes

## 🔧 Development Notes

### Current Limitations
- Data persistence limited to localStorage
- No backend integration
- Basic error simulation

### Future Improvements
- Backend API integration
- Unit test coverage
- Enhanced error handling
- Advanced QR code features
- Performance optimizations

## 🤝 Contributing

Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📱 Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers
- Responsive design for all screen sizes

---

Built with ❤️ for HNG Internship