# Contributing to Socket Mellotron

Thank you for your interest in contributing to Socket Mellotron! This document provides guidelines and instructions for contributing.

## 🎯 Ways to Contribute

- 🐛 Bug reports and fixes
- ✨ New features and enhancements
- 📝 Documentation improvements
- 🎨 UI/UX improvements
- 🎵 Sound bank contributions
- 🧪 Tests and quality improvements

## 🚀 Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/socket-mellotron.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**
   - Follow the code style guidelines below
   - Add tests if applicable
   - Update documentation as needed

5. **Test your changes**
   ```bash
   npm run dev
   npm run lint
   ```

6. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```

7. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📝 Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper types/interfaces (avoid `any`)
- Use functional components with hooks
- Keep components focused and single-purpose

### Naming Conventions

- **Files**: PascalCase for components (`PianoKeyboard.tsx`), camelCase for utilities (`audioContext.ts`)
- **Components**: PascalCase (`function PianoKeyboard()`)
- **Functions**: camelCase (`function playNote()`)
- **Constants**: UPPER_SNAKE_CASE (`const MAX_VOLUME = 100`)
- **Types/Interfaces**: PascalCase (`interface AudioSettings`)

### Component Structure

```tsx
"use client"; // if needed

import { useState } from "react";
// ... other imports

interface ComponentProps {
  // props definition
}

/**
 * Component description
 *
 * Features:
 * - Feature 1
 * - Feature 2
 */
export function Component({ prop1, prop2 }: ComponentProps) {
  // hooks
  const [state, setState] = useState();

  // handlers
  const handleClick = () => {
    // ...
  };

  // render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add delay effect control
fix: resolve audio latency on mobile
docs: update installation instructions
refactor: simplify socket event handlers
```

## 🎵 Contributing Sound Banks

To contribute new Mellotron sound banks:

1. **Prepare samples**
   - Format: WAV (44.1kHz or 48kHz, 16-bit or 24-bit)
   - Naming: `C3.wav`, `D3.wav`, etc.
   - Coverage: At least 2 octaves

2. **Add to project**
   - Create directory: `public/samples/[bank-name]/`
   - Add all sample files
   - Update `src/lib/audio/soundBanks.ts`

3. **Update UI**
   - Add bank to `SoundBankSwitcher.tsx`
   - Choose appropriate icon

4. **Document**
   - Add bank description to README
   - Credit original sample sources

## 🐛 Reporting Bugs

When reporting bugs, please include:

- **Description**: Clear description of the issue
- **Steps to reproduce**: How to trigger the bug
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: Browser, OS, device type
- **Screenshots**: If applicable
- **Console errors**: Any error messages

Use this template:

```markdown
**Bug Description**
A clear description of the bug.

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
 - Browser: [e.g. Chrome 120]
 - OS: [e.g. macOS 14]
 - Device: [e.g. Desktop, iPhone 15]
```

## ✨ Feature Requests

Feature requests are welcome! Please provide:

- **Use case**: Why is this feature needed?
- **Proposed solution**: How should it work?
- **Alternatives**: Other approaches considered
- **Examples**: Similar implementations elsewhere

## 🧪 Testing

- Manually test your changes across different browsers
- Test audio functionality (ensure no clicks, pops, or latency issues)
- Test multiplayer features with multiple browser windows
- Verify mobile/touch functionality

## 📚 Documentation

- Update README.md for user-facing changes
- Update inline code comments for complex logic
- Update type definitions for API changes
- Add JSDoc comments for public functions/components

## 🎨 UI/UX Guidelines

- Follow existing design patterns
- Ensure accessibility (keyboard navigation, screen readers)
- Test on mobile devices
- Maintain responsive design
- Use Tailwind CSS utilities
- Stick to Shadcn/ui components when possible

## 🤝 Code Review Process

1. All PRs require at least one review
2. Address review comments
3. Ensure CI checks pass
4. Squash commits before merging (if requested)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## ❓ Questions?

Feel free to open an issue for questions or discussion!

---

Thank you for contributing to Socket Mellotron! 🎹🎵
