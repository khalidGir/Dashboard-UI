# Magentic-UI Dashboard Template

A modern, feature-rich dashboard template built with React, TypeScript, and Tailwind CSS. Designed to be highly customizable, accessible, and performant, perfect for enterprise applications and SaaS products.

## Key Features

- 📱 Responsive Design: Fully adaptive layout that works seamlessly on mobile, tablet, and desktop
- 🌙 Theming: Dark/Light mode toggle with automatic system preference detection and persistence
- 🎨 Advanced Primary Color Customization: Runtime selection and persistence of accent colors
- 👤 User Authentication: Complete secure authentication flow including Login, Registration, Forgot Password, and Protected Routes
- 📊 Dynamic Data Integration: Simulated API calls with client-side caching, loading states, and error handling for dashboard data
- 🗂️ Powerful Data Table: Advanced table with search, multi-column filtering, pagination, and responsive column handling
- ♿ High Accessibility (A11y): WCAG 2.1 AA compliant with keyboard navigation, ARIA attributes, and proper color contrast
- ⚡ Optimized Performance: Code splitting, lazy loading, efficient data fetching, and component memoization
- 🧪 Comprehensive Testing: Extensive unit tests covering all critical components and hooks
- 📚 Component Library (Storybook): Isolated component development and documentation environment

## Technologies Used

- React & TypeScript
- Vite (Build Tool)
- Tailwind CSS (Styling)
- Zustand (State Management)
- React Router DOM (Navigation)
- React Hook Form (Form Handling)
- TanStack React Table (Data Tables)
- Recharts (Interactive Charts)
- Vitest & React Testing Library (Testing)
- Storybook (Component Documentation)
- Framer Motion (Animations)
- React Icons (Icons)

## Getting Started

### Prerequisites

- Node.js (>=18.0.0)
- npm (comes with Node.js) or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/magentic-ui-dashboard.git
cd magentic-ui-dashboard
```

2. Install dependencies:
```bash
npm install
```
Or with yarn:
```bash
yarn install
```

### Running the Development Server

```bash
npm run dev
```

Or with yarn:
```bash
yarn dev
```

Visit `http://localhost:5173` in your browser to see the application.

### Building for Production

```bash
npm run build
```

Or with yarn:
```bash
yarn build
```

### Running Tests

```bash
npm run test
```

Or with yarn:
```bash
yarn test
```

### Running Storybook

```bash
npm run storybook
```

Or with yarn:
```bash
yarn storybook
```

## Project Structure

```
src/
├── components/           # Reusable UI components
├── pages/               # Page-level components
├── hooks/               # Custom React hooks
├── store/               # Zustand state management
├── data/                # Static data files
├── styles/              # Global styles and themes
├── utils/               # Utility functions
├── assets/              # Images and other assets
└── App.tsx              # Main application component
```

## Theming & Customization

### Dark/Light Mode

The dashboard supports dark and light themes with automatic system preference detection. Users can toggle between themes using the theme toggle button in the header. Themes are persisted in localStorage.

### Primary Color Customization

The template allows runtime customization of the primary accent color through the settings page. Users can select any primary color they prefer, and the change is immediately reflected across all components and persisted in localStorage.

## Testing

The project includes comprehensive unit tests for all components and hooks:

- Component tests cover rendering, interactions, and accessibility
- Hook tests validate state management and side effects
- Store tests verify authentication and theme management logic

To run all tests:
```bash
npm run test
```

## Component Documentation (Storybook)

The project includes a Storybook environment for developing and documenting components in isolation:

- View components in isolation with different props
- Test component variations and interactions
- Access live documentation and code examples

To launch Storybook:
```bash
npm run storybook
```

## Contributing

We welcome contributions to the project! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the established patterns and includes appropriate tests where applicable.

## License

MIT License. See the [LICENSE](./LICENSE) file for more information.

---

This comprehensive dashboard template provides everything needed to start building modern, data-driven applications with professional-grade UI components, authentication, and advanced theming capabilities.