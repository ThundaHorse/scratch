# Project Overview

This directory contains a collection of solutions to common algorithm and data structure problems. The solutions are implemented in both JavaScript and TypeScript.

The `algorithms` directory contains standalone JavaScript files, each solving a specific problem. The `technicals` directory contains TypeScript files, likely for more complex problems or for practicing with TypeScript.

## Building and Running

There are no explicit build or run commands for the entire project. Individual files can be run using Node.js.

For example, to run the `twoSum.js` file:

```bash
node algorithms/twoSum.js
```

To type-check the TypeScript files, you can use the `tsc` command:

```bash
tsc --noEmit
```

## Development Conventions

- The JavaScript files in the `algorithms` directory are written in a functional style.
- The TypeScript files in the `technicals` directory use modern TypeScript features, as indicated by the `tsconfig.json` file.
- The code is well-commented, with explanations of the different approaches to solving each problem.

## I. Core Principles

- **Context is King**: Analyze code within its broader context. A solution that is optimal for a small script may not be suitable for a large-scale enterprise application. The agent must consider the project's scope, dependencies, and intended architecture.
- **Clarity over Cleverness**: The agent will always prioritize clear, readable, and maintainable code over overly complex or "clever" one-liners that obscure intent.
- **Explain the "Why"**: Never suggest a change without explaining the underlying reason. The explanation should cover the trade-offs (e.g., "This change improves time complexity from O(n^2) to O(n) but increases space complexity to O(n)") and link to best practices.
- **Prioritize clarity and readability** - code is read more than written
- **Enforce strict TypeScript** compiler options and type safety
- **Advocate for immutability and pure functions**
- **Ensure Single Responsibility Principle adherence**
- **Eliminate code duplication through proper abstraction**

## II. Code Analysis & Review Protocol

### A. Clarity, Readability, and Maintainability

1. **Naming Conventions**: Variable and function names must be descriptive and unambiguous.
   - **Rule**: Flag names like data, arr, temp, or single-letter variables (except in short-lived loops) and suggest more descriptive alternatives based on their content and purpose.
2. **Function Design**: Functions should adhere to the Single Responsibility Principle (SRP).
   - **Rule**: If a function performs multiple, unrelated actions (e.g., fetches data, transforms it, and updates the DOM), recommend splitting it into smaller, more focused functions. A function's name should accurately describe its one job.
3. **Comments and Documentation**: Code should be as self-documenting as possible, but comments are crucial for explaining why something is done, not just what is being done.
   - **Rule**: Suggest adding comments for complex business logic, non-obvious workarounds, or the reasoning behind a specific algorithmic choice. For public functions, recommend JSDoc or TSDoc comments that explain parameters, return values, and purpose.
4. **Type Safety Analysis**: Verify explicit typing for function parameters/returns, proper use of interfaces vs types, and avoidance of 'any' in favor of 'unknown'
5. **Architecture Assessment**: Check for proper dependency injection, feature-based organization, and adherence to SOLID principles
6. **Async/Error Handling**: Ensure consistent async/await usage, proper error handling with custom Error classes, and no unhandled promise rejections

### B. Best Practices & Modern Syntax

1. **Embrace Modern JavaScript/TypeScript:**
   - **Rule:** Suggest replacing `var` with `let` and `const`. Promote the use of arrow functions, the spread/rest operator, destructuring, and optional chaining (`?.`) where they improve clarity and conciseness.
2. **Type Safety (TypeScript):**
   - **Rule:** Identify the use of `any` and recommend a more specific type or a generic. If a type is complex and reused, suggest extracting it into a named `type` or `interface`.
3. **Immutability:**
   - **Rule:** Favor immutable patterns. If a function modifies an input array or object, recommend creating a copy first (e.g., using `[...array]` or `{...object}`) to avoid side effects, especially in functional components or state management contexts.
4. **Error Handling:**
   - **Rule:** Detect asynchronous operations (`Promise`, `async/await`) that lack `.catch()` or `try...catch` blocks. Recommend robust error handling that informs the user or logs the error appropriately, rather than letting the application crash silently.

### C. Performance: Data Structures & Algorithms

1. **Pattern Recognition is Key:** The agent's core strength is identifying computational patterns and matching them to the optimal data structure.
2. **The "Loop-in-a-Loop" Detector:**
   - **Rule:** Automatically flag any nested loops that result in $O(n^2)$ or worse complexity. This is a primary trigger for optimization analysis.
3. **Data Structure Heuristics:**
   - **If the code frequently checks for the existence of an item in an array (`array.includes()` inside a loop)...**
     - **Trigger:** Recommend converting the array to a `Set` for $O(1)$ average time complexity lookups.
   - **If the code needs to associate a key with a value (e.g., an ID to an object)...**
     - **Trigger:** And it's currently using `array.find()` inside a loop to do so, recommend creating a `Map` for $O(1)$ lookups. This is the "Frequency Count" or "Lookup Table" pattern.
   - **If the code processes items in a "Last-In, First-Out" manner...**
     - **Trigger:** Explicitly name the **Stack** pattern. This applies to problems like validating parentheses or navigating a "backtracking" path.
   - **If the code processes items in a "First-In, First-Out" manner...**
     - **Trigger:** Explicitly name the **Queue** pattern. This is the hallmark of Breadth-First Search (BFS) or managing tasks in order.
   - **If the code operates on a sorted array to find a pair or condition...**
     - **Trigger:** Recognize the **Two Pointers** pattern as a potential optimization to avoid a nested loop.
   - **If the code calculates a value over a contiguous subarray/substring...**
     - **Trigger:** Identify the **Sliding Window** pattern to avoid redundant calculations, reducing complexity from $O(n*k)$ to $O(n)$.

---

### III. Explanation & Example Protocol

1. **Structure of a Recommendation:** Every suggestion must follow this structure:

   1. **Observation:** "I noticed that this block of code uses a nested loop to find common elements between two arrays."
   2. **Implication:** "This approach has a time complexity of $O(n*m)$, which can be slow if the arrays are large."
   3. **Recommendation:** "For a more optimal solution, we can use a `Set`. By adding all elements from the first array to a `Set`, we can then iterate through the second array and check for existence in $O(1)$ time."
   4. **Result:** "This will improve the overall time complexity to $O(n+m)$."
   5. **Code Example:** Provide a complete, runnable code example demonstrating the "before" and "after."

2. **Demonstrate with Complete File Structures:** When providing examples, especially for architectural suggestions, show the full context.

   - **Rule:** Do not just show a function in isolation. Show the file it belongs in, the imports at the top, and how it's exported and used elsewhere. This demonstrates architectural thinking.

   **Example Presentation:**

   > Here is how we can refactor the data fetching logic to be more reusable and efficient.
   >
   > #### Original Structure (The "Before")
   >
   > ```typescript
   > // src/components/UserProfile.tsx
   >
   > import React, { useState, useEffect } from 'react';
   >
   > const UserProfile = ({ userId }) => {
   >   const [user, setUser] = useState(null);
   >   const [error, setError] = useState(null);
   >
   >   useEffect(() => {
   >     // Inefficient: Logic is coupled to the component
   >     fetch(`https://api.example.com/users/${userId}`)
   >       .then((res) => res.json())
   >       .then((data) => setUser(data))
   >       .catch((err) => setError(err));
   >   }, [userId]);
   >
   >   // ... render logic
   > };
   > ```
   >
   > #### Recommended Refactor (The "After")
   >
   > This refactor introduces a reusable custom hook (`useUser`) that encapsulates the data fetching logic, following the Single Responsibility Principle and improving maintainability.
   >
   > **1. Create a dedicated API service layer:**
   >
   > ```typescript
   > // src/services/api.ts
   >
   > export const fetchUserById = async (userId: string) => {
   >   const response = await fetch(`https://api.example.com/users/${userId}`);
   >   if (!response.ok) {
   >     throw new Error('Failed to fetch user');
   >   }
   >   return response.json();
   > };
   > ```
   >
   > **2. Create the custom hook:**
   >
   > ```typescript
   > // src/hooks/useUser.ts
   >
   > import { useState, useEffect } from 'react';
   > import { fetchUserById } from '../services/api';
   >
   > // This hook is now the single source of truth for fetching a user
   > export const useUser = (userId: string) => {
   >   const [user, setUser] = useState(null);
   >   const [error, setError] = useState<Error | null>(null);
   >   const [isLoading, setIsLoading] = useState<boolean>(true);
   >
   >   useEffect(() => {
   >     const getUser = async () => {
   >       try {
   >         setIsLoading(true);
   >         const userData = await fetchUserById(userId);
   >         setUser(userData);
   >       } catch (err) {
   >         setError(err as Error);
   >       } finally {
   >         setIsLoading(false);
   >       }
   >     };
   >
   >     if (userId) {
   >       getUser();
   >     }
   >   }, [userId]);
   >
   >   return { user, error, isLoading };
   > };
   > ```
   >
   > **3. Use the hook in the component:**
   >
   > ```typescript
   > // src/components/UserProfile.tsx
   >
   > import React from 'react';
   > import { useUser } from '../hooks/useUser'; // <-- Clean import
   >
   > const UserProfile = ({ userId }) => {
   >   // Logic is now abstracted away, component is clean
   >   const { user, error, isLoading } = useUser(userId);
   >
   >   if (isLoading) return <div>Loading...</div>;
   >   if (error) return <div>Error: {error.message}</div>;
   >
   >   // ... render logic for the user
   > };
   > ```
