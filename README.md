### Morent (Rental E-Commerce Marketplace)

## Project Overview

# Introduction

This project focuses on building a rental e-commerce marketplace with robust technical foundations, efficient performance optimization, and seamless deployment processes. Below is an overview of the project folder structure, development activities, deployment steps, and results.

# Technologies Used

- Next.js: Comprehensive framework for building modern, efficient web applications by handling both frontend and backend functionalities seamlessly.

- Sanity: A headless CMS for content management.

- Tailwind CSS: Utility-first CSS framework for styling.

## Folder Structure

# documentation/

Contains essential technical documentation and planning resources:

- Marketplace Technical Foundation:

- CompleteTechnicalPlanning.svg - A complete overview of technical planning.

- Day-2-Tech-Plan-Image.png - Technical planning snapshot.

- Schemas-&-API-Endpoints.svg - Visual representation of schemas and API endpoints.

- SystemArchitecture.svg - System architecture diagrams.

- TechnicalRoadmap.svg - High-level roadmap of project milestones.

- schema.js - Schema definitions.

- Performance Lighthouse Results:

-performance-results.png and performance-results2.png - Performance metrics captured.

- Reports:

- API integration, frontend development, testing, and deployment reports.

- Marketplace Business Goals-Morent by FF - Business goals alignment.

- Test Case Report.csv - Test cases and execution results.

# morent/

Main application directory containing code implementations:

- app/

- actions/: Reusable actions.

- api/: Backend communication APIs.

- car-rent/: Business logic for car rental.

- components/: Reusable UI components:

- car-rent-carGrids.tsx - Display grids of available car rentals.

- favIcon.tsx - Favicon component.

- filters.tsx - Search and sort filters.

- pickNdrop-form.tsx - Pick-up and drop-off form.

- popular-car.tsx - List of popular cars.

- recommendation-car.tsx - Car recommendation system.

- searchBar.tsx - Search bar component.

- sideBar.tsx - Sidebar for navigation or filtering.

- Dynamic Routes:

- detail-car-rent/[slug]/page.tsx - Displays detailed information about a car rental.

- Global Components:

footer/, header/, navbar/ - Website layout components.

- payment/: Payment processing logic and components.

- wishlist/ - Wishlist page component for small devices.

- sanity/

- scripts/: Contains a file ‘importData.ts’ having a script for migrating fetched data from API to Sanity CMS.

- cars.ts - Contains Schema for cars.

Root Level Files:

- page.tsx - Default page.

## Project Milestones

# Day 1: Business Alignment

- Analyzed and aligned the project goals with marketplace business requirements.

- Defined aims and purpose of the marketplace.

# Day 2: Technical Planning

- Analyzed system architecture and documented API endpoints.

- Defined the technical roadmap and schemas.

# Day 4: Frontend Development

- Built dynamic frontend components and integrated APIs.

Day 5: Testing, Error Handling and Backend Integration Refinement

- Debugged backend logic and validated business requirements.

- Conducted performance testing using Lighthouse.

- Wrote and executed test cases.

Day 6: Deployment

- Set up the deployment environment and deployed the application.

- Verified alignment with business goals and performance benchmarks.

## Testing Summary

- # Functional Testing:

- Verified product listing, wishlist operations, and user interactions.

- # Error Handling:

-Displayed fallback UI elements for empty API responses.

- # Performance Testing:

- Used Lighthouse for performance metrics.

- Optimized images and implemented lazy loading to improve load times.

- # Cross-Browser Compatibility:

Tested on Chrome, Firefox, Safari, and Edge.

Ensured responsiveness across various screen sizes.

- # Security Testing:

- Ensured sensitive API keys are not exposed in front-end code.

- # User Acceptance Testing (UAT):

- Confirmed all features meet end-user expectations.

For further details or inquiries, please refer to the documentation folder.