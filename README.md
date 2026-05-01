# ThrftCity

ThrftCity is a modern, responsive e-commerce web application dedicated to thrift shopping. Built with React and Vite, this platform provides a seamless shopping experience allowing users to browse products, manage their cart, and securely place orders.

## Features

- **Product Catalog:** Browse a curated collection of thrifted fashion and accessories.
- **Shopping Cart:** Add, remove, and update items in your cart.
- **Wishlist:** Save your favorite items for later.
- **User Authentication:** Secure login and profile management using Supabase.
- **Order Tracking:** View order history and checkout smoothly.
- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Animations:** Smooth transitions and micro-animations powered by Framer Motion.
- **Notifications:** Real-time toast notifications for user interactions.

## Tech Stack

- **Frontend Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Backend & Database:** [Supabase](https://supabase.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Styling:** Vanilla CSS (Responsive & Modern Aesthetics)
- **Toasts:** [React Hot Toast](https://react-hot-toast.com/)

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed on your local machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aksaiype2-a11y/thrftcity-a-e-commerce-thrift-website.git
   ```
2. Navigate to the project directory:
   ```bash
   cd thrftcity-a-e-commerce-thrift-website
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the development server, run:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Environment Variables

This project connects to Supabase. To configure your own Supabase instance, create a `.env` file in the root directory and add the following variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to open a pull request or file an issue.

## License

This project is open-source and available under the MIT License.
