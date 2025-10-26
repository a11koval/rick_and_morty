# Rick and Morty Project - AI Agent Instructions

## Project Overview
This is a web application built with Vite, featuring a modular structure for displaying Rick and Morty content. The project uses Bootstrap 5 for styling and component frameworks.

## Architecture

### Core Structure
- `/src/` - Main source directory
  - `index.html` - Entry point using HTML partial loading
  - `index.js` - JavaScript entry point with Bootstrap integration
  - `partials/` - HTML components loaded into main page
  - `js/` - Component-specific JavaScript
  - `sass/` - SCSS styles organized by component
  - `img/` - Image assets

### Key Patterns
1. **HTML Partials**: Components are split into partial HTML files loaded via Vite's HTML injection
   ```html
   <load ="partials/component.html" />
   ```

2. **Component Organization**: Each feature has matching files across directories:
   - `partials/{component}.html` - HTML structure
   - `js/{component}.js` - Component logic
   - `sass/sections/{component}.scss` - Component styles

3. **Bootstrap Integration**: Uses Bootstrap 5 for UI components and modals
   - Modal triggers use data attributes: `data-bs-toggle="modal" data-bs-target="#exampleModal"`

## Development Workflow

### Build Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production (outputs to /dist)
- `npm run preview` - Preview production build

### Project Configuration
- Vite is configured for HTML injection and full page reloads
- Source maps enabled for debugging
- Vendor dependencies are chunked separately

## Common Tasks
1. **Adding New Components**:
   - Create HTML in `/src/partials/`
   - Add matching JS in `/src/js/`
   - Create SCSS in `/sass/sections/`
   - Import JS module in `index.js`
   - Add HTML partial reference in `index.html`

2. **Styling**:
   - Use SCSS in component-specific files
   - Global styles go in `sass/main.scss`
   - Follow Bootstrap class naming conventions

## Dependencies
- Bootstrap 5.3.3 - UI framework
- Sass 1.77.2 - Styling
- Vite 4.5.2 - Build tool and development server