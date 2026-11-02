# Contributing to Growlytics 🌾

Thank you for your interest in contributing to Growlytics! We welcome community contributions to help improve this AI-driven agricultural platform. 

Please take a moment to review this document before submitting your first pull request.

---

## 📋 Code of Conduct

By participating in this project, you agree to maintain a respectful, welcoming, and inclusive environment for everyone.

## 🐛 How to Report Bugs

If you find a bug or unexpected behavior:
1. **Search existing issues** to make sure it hasn't already been reported.
2. **Open a new issue** if it's a new bug.
3. **Provide clear details**, including:
   - A clear, descriptive title.
   - Steps to reproduce the problem.
   - Expected vs. actual behavior.
   - Screenshots or screen recordings (if applicable).
   - Your environment details (Node version, OS, Expo version).

## 💡 How to Suggest Features

We love new ideas! If you have a feature request:
1. Open a new issue.
2. Choose the **Feature Request** template (if available) or explicitly state that it is a proposal.
3. Explain the problem this feature solves and how it benefits users.

## 🛠️ Local Development Setup

To set up the project locally for development:

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/growlytics
   cd growlytics
   ```
3. **Install the dependencies**:
   ```bash
   npm install
   ```
4. **Create a local environment file**:
   Duplicate the `.env` configuration template and fill in any required development keys.
5. **Start the local development server**:
   ```bash
   npm run dev
   ```

## 🎨 Coding Standards & Style

To keep the codebase clean and maintainable, please follow these rules:

* **Code Linting:** We use ESLint and Prettier. Run the linter or ensure your IDE auto-formats code before committing.
* **TypeScript:** Write strongly typed code. Avoid using `any` wherever possible.
* **Testing:** If you introduce new logic or helpers, please write unit tests using Jest. Run existing tests with:
   ```bash
   npm test
   ```

## 🚀 Submitting a Pull Request (PR)

Ready to submit your changes? Follow this process:

1. **Create a new branch** from `main` for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Commit your changes** with clear, descriptive commit messages.
3. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
4. **Open a Pull Request** against our `main` branch.
5. **Describe your changes** in the PR description and link it to any relevant issues (e.g., `Closes #12`).

Once submitted, a maintainer will review your code. We might request a few changes before merging. Thank you for your time and contribution!
