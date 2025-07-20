# Design Document

## Overview

The wine blind tasting scoring system is a React-based web application that enables judges to evaluate wines across multiple criteria while maintaining anonymity. The system uses a card-based interface for wine selection and a detailed scoring form for individual wine evaluation. The application leverages the existing UI component library (shadcn/ui) with Tailwind CSS for consistent styling.

## Architecture

### Component Hierarchy

```
App
├── TastingSession
│   ├── WineList
│   │   └── WineCard (multiple instances)
│   └── WineScoring
│       ├── ScoringHeader
│       ├── CriteriaScoring (multiple instances)
│       └── ScoringSummary
```

### State Management

- **Session State**: Managed at the `TastingSession` level using React's `useState`
- **Wine Data**: Array of wine objects with scoring information
- **Current Wine**: Active wine being scored
- **Navigation State**: Current view (list vs scoring)

### Data Flow

1. Wine configuration data flows down from `TastingSession` to child components
2. Scoring updates bubble up from `CriteriaScoring` to `TastingSession`
3. Navigation state changes trigger view transitions
4. Score calculations happen at the wine object level and propagate to display components

## Components and Interfaces

### Core Data Types

```typescript
interface Wine {
  id: string;
  anonymousId: string;
  category: string;
  scores: Record<string, number>;
  totalScore: number;
  isComplete: boolean;
}

interface ScoringCriterion {
  id: string;
  name: string;
  maxScore: number;
  description?: string;
}

interface TastingConfig {
  wines: Wine[];
  criteria: ScoringCriterion[];
  sessionName: string;
}
```

### Component Specifications

#### WineList Component

- **Purpose**: Display grid of wine cards with scoring status
- **Props**: `wines: Wine[]`, `onWineSelect: (wineId: string) => void`
- **Features**:
  - Grid layout using CSS Grid (responsive: 2-3 columns on mobile, 4+ on desktop)
  - Visual status indicators (unscored, partial, complete)
  - Total score display for completed wines
  - Category badges

#### WineCard Component

- **Purpose**: Individual wine representation in the list
- **Props**: `wine: Wine`, `onClick: () => void`
- **Features**:
  - Anonymous ID prominently displayed
  - Category tag
  - Progress indicator (scored criteria count)
  - Total score (when complete)
  - Status-based styling

#### WineScoring Component

- **Purpose**: Detailed scoring interface for individual wine
- **Props**: `wine: Wine`, `criteria: ScoringCriterion[]`, `onScoreUpdate: (criterionId: string, score: number) => void`, `onBack: () => void`
- **Features**:
  - Header with wine info and navigation
  - Individual criterion scoring sections
  - Real-time total calculation
  - Save/update functionality

#### CriteriaScoring Component

- **Purpose**: Individual criterion scoring interface
- **Props**: `criterion: ScoringCriterion`, `currentScore: number`, `onScoreChange: (score: number) => void`
- **Features**:
  - Slider or numeric input for score entry
  - Visual feedback for score range
  - Criterion description display
  - Immediate score validation

## Data Models

### Wine Model

```typescript
class WineModel {
  constructor(
    public id: string,
    public anonymousId: string,
    public category: string,
    public scores: Record<string, number> = {},
    public criteria: ScoringCriterion[]
  ) {}

  updateScore(criterionId: string, score: number): void;
  calculateTotal(): number;
  getCompletionStatus(): "unscored" | "partial" | "complete";
  getScoredCriteriaCount(): number;
}
```

### Scoring Logic

- **Score Range**: 0-100 points per criterion (configurable)
- **Total Calculation**: Sum of all criterion scores
- **Validation**: Ensure scores are within valid range
- **Persistence**: Scores saved immediately on change

## Error Handling

### Input Validation

- Score values must be within defined ranges
- Required fields validation before saving
- Graceful handling of invalid numeric inputs

### State Management Errors

- Fallback states for missing wine data
- Error boundaries for component failures
- Local storage backup for session data

### User Experience Errors

- Clear error messages for validation failures
- Retry mechanisms for failed operations
- Progress preservation during navigation errors

## Testing Strategy

### Unit Testing

- **Wine Model**: Score calculations, validation logic
- **Individual Components**: Props handling, event firing
- **Utility Functions**: Score formatting, validation helpers

### Integration Testing

- **Navigation Flow**: List to scoring and back
- **Score Persistence**: Updates reflected across components
- **State Synchronization**: Consistent data across views

### User Acceptance Testing

- **Scoring Workflow**: Complete wine evaluation process
- **Progress Tracking**: Visual feedback accuracy
- **Score Modification**: Edit and update functionality
- **Session Completion**: Full tasting session flow

### Component Testing Approach

```typescript
// Example test structure
describe("WineScoring Component", () => {
  test("displays wine information correctly");
  test("updates scores on criterion change");
  test("calculates total score accurately");
  test("navigates back to wine list");
  test("preserves scores during navigation");
});
```

## UI/UX Design Patterns

### Visual Hierarchy

- **Primary Actions**: Prominent buttons for wine selection and scoring
- **Secondary Actions**: Navigation and editing controls
- **Status Indicators**: Color-coded progress states

### Responsive Design

- **Mobile First**: Touch-friendly scoring interfaces
- **Tablet Optimization**: Grid layouts for wine lists
- **Desktop Enhancement**: Multi-column layouts and keyboard shortcuts

### Accessibility

- **Keyboard Navigation**: Full functionality without mouse
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Color Contrast**: High contrast for status indicators
- **Focus Management**: Clear focus states and logical tab order

### Interaction Patterns

- **Progressive Disclosure**: Show details on demand
- **Immediate Feedback**: Real-time score updates
- **Confirmation Patterns**: Clear save/update states
- **Error Recovery**: Easy correction of input mistakes
