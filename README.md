# OmniTool: Smart Utility Toolkit

A sleek, robust, and cleanly architected utility application built for the **HNG 14 -- Mobile Track Stage 0 Task**. Designed with a strict focus on separation of concerns, scalable architecture, and a premium user experience.

### Live Preview

[Test the app live on Appetize.io here!](https://appetize.io/app/b_or6mnwfwo5eer2jtxbpe3jtfuq)

---

## Core Modules

1. **Unit & Currency Converter:** Real-time conversion for Length, Weight, Temperature (incl. Kelvin), and Currency.
2. **Secure Password Generator:** Granular control over length, symbols, and casing, complete with secure clipboard integration and native UI feedback.
3. **Time Tools (Stopwatch & Timer):** Precision time-tracking with background interval cleanup and dynamic state management.

---

## Architecture & Stack

This project was intentionally built avoiding "spaghetti code." The UI components are strictly decoupled from the business logic.

- **Framework:** React Native / Expo Router (File-based routing)
- **Language:** TypeScript (Strictly typed for production reliability)
- **UI/Theming:** React Native Paper (Material Design) & `twrnc` (Tailwind CSS)
- **State Management:** React `useState` & `useRef`
- **Logic/Math:** Pure, testable functions isolated in the `/utils` directory.

---

## How to Run Locally

If you wish to clone and run this project on your local machine:

```bash
# 1. Clone the repository
git clone [https://github.com/Praizee/OmniTool.git](https://github.com/Praizee/OmniTool.git)

# 2. Install dependencies
cd OmniTool
pnpm install

# 3. Start the Expo server
pnpm start
```

