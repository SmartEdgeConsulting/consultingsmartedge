# Smartedge Consulting & Analytics

SmartEdge Consulting & Analytics is a data-driven consulting firm helping organizations make smarter decisions through Research, Analytics, and Technology.

## 🚀 Features

- **Modern UI/UX** - Built with shadcn/ui components for a polished, professional interface
- **Type Safety** - Full TypeScript implementation for robust, maintainable code
- **Responsive Design** - Mobile-first approach ensuring great experience across all devices
- **Performance Optimized** - Leveraging Next.js App Router for optimal loading times
- **Icon System** - Comprehensive icon library with Lucide React
- **Accessible** - WCAG compliant components from shadcn/ui

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:**  [GSAP](https://gsap.com/)
- **Content Management:** [Sanity](https://www.sanity.io/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.17 or later
- npm, yarn, or pnpm package manager

## 🔧 Installation

1. Clone the repository:

```bash
git clone git@github.com:SmartEdgeConsulting/WebsiteDev.git
cd WebsiteDev
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
DATABASE_URL=your_database_url
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
├── app/                  # Next.js App Router pages
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   └── ...              # Custom components
├── lib/                 # Utility functions and configurations
├── public/              # Static assets
├──                      # Global styles
└── types/               # TypeScript type definitions
```

## 🎨 Adding shadcn/ui Components

To add new shadcn/ui components:

```bash
npx shadcn-ui@latest add [component-name]
```

Example:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dialog
```

## 🚀 Building for Production

Create an optimized production build:

```bash
npm run build
npm run start
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Oloniyo Bolaji - [https://github.com/Oloniyo-Bolaji](https://github.com/Oloniyo-Bolaji)

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Sanity](https://www.sanity.io/)

## 📧 Contact

For questions or support, please contact [ayoolabolaji12@yahoo.com]

---

Made with ❤️ using Next.js and TypeScript

