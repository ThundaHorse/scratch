/**
 * You are designing a system to manage elements, each with a unique content (string) and an associated integer score.
 * The system should support the following two operations:
 *
 * addElement(content, score)
 *
 * Inserts a new element with the given content and score.
 * All contents are guaranteed to be unique at insertion time.
 * Scores can be positive, zero, or negative.
 *
 * getElement()
 * Returns the content of the element with the highest score.
 * Constraint: The same element cannot be returned in consecutive calls.
 *
 * This restriction only lasts for one turn — if no other element is available, the same element may be returned again.
 *
 * If the current highest score element is blocked by the "no consecutive" rule, return the next-highest score element.
 * After an element is returned, its score is decreased by 1, and it remains in the system.
 *
 * Additional Details & Constraints
 * All contents are unique — no duplicates in the system.
 * Returning an element with a lower score is acceptable if the highest score element is blocked due to the "no consecutive" rule.
 *
 * Scores can become negative after decrements.
 * The system must always return some element if any exist.
 * If there are no elements in the system, getElement() returns an empty string.
 */

/**
 * Element interface with content and score
 */
interface Element {
  content: string;
  score: number;
}

/**
 * Optimized ElementManager class that efficiently manages and retrieves elements
 * based on their scores while respecting the "no consecutive returns" constraint.
 */
class ElementManager {
  // Store elements by their content for O(1) lookup and update
  private elements: Map<string, Element>;

  // Track the most recently returned element
  private lastReturned: string | null;

  // Use a custom data structure for score tracking
  private scoreTracker: ScoreTracker;

  constructor() {
    this.elements = new Map<string, Element>();
    this.lastReturned = null;
    this.scoreTracker = new ScoreTracker();
  }

  /**
   * Adds a new element with the given content and score.
   * Time Complexity: O(log n) due to inserting into the score tracker
   *
   * @param content Unique string identifier for the element
   * @param score Initial score value (can be positive, zero, or negative)
   */
  addElement(content: string, score: number): void {
    const element = { content, score };
    this.elements.set(content, element);
    this.scoreTracker.insert(element);
  }

  /**
   * Returns the content of the highest-scoring element that wasn't returned in the previous call.
   * After an element is returned, its score is decreased by 1.
   * Time Complexity: O(log n) for retrieving and updating the heap
   *
   * @returns The content of the selected element, or empty string if no elements exist
   */
  getElement(): string {
    // Base case: If there are no elements, return an empty string
    if (this.elements.size === 0) return '';

    // Find the highest scoring element that isn't blocked by the "no consecutive" rule
    const selectedElement = this.scoreTracker.getHighestNotMatching(
      this.lastReturned
    );
    if (!selectedElement) return ''; // Safeguard (should never happen if elements exist)

    // Update the last returned element
    this.lastReturned = selectedElement.content;

    // Decrease the score by 1
    selectedElement.score -= 1;
    this.scoreTracker.update(selectedElement);

    return selectedElement.content;
  }
}

/**
 * ScoreTracker maintains elements in a way that makes it efficient to find
 * the highest scoring elements.
 */
class ScoreTracker {
  // Maps score -> set of elements with that score, for O(1) lookups by score
  private scoreToElements: Map<number, Set<Element>>;

  // Keep track of scores in descending order for quick access to highest scores
  private scores: number[];

  constructor() {
    this.scoreToElements = new Map<number, Set<Element>>();
    this.scores = [];
  }

  /**
   * Inserts a new element or updates an existing one
   * Time Complexity: O(log n) due to maintaining sorted scores
   */
  insert(element: Element): void {
    this.remove(element); // Remove if it exists already

    const { score } = element;

    // Add to the score map
    if (!this.scoreToElements.has(score)) {
      this.scoreToElements.set(score, new Set<Element>());

      // Add the score to our sorted list
      this.insertScore(score);
    }

    this.scoreToElements.get(score)!.add(element);
  }

  /**
   * Updates an element after its score changes
   */
  update(element: Element): void {
    this.insert(element);
  }

  /**
   * Removes an element from the tracker
   */
  remove(element: Element): void {
    // Check all scores for this element (inefficient but necessary since we don't track
    // element -> score mapping directly)
    for (const [score, elements] of this.scoreToElements.entries()) {
      if (elements.has(element)) {
        elements.delete(element);

        // If the set is empty, remove the score entry
        if (elements.size === 0) {
          this.scoreToElements.delete(score);
          this.removeScore(score);
        }

        break;
      }
    }
  }

  /**
   * Gets the highest scoring element that doesn't match the excluded content
   * Time Complexity: O(1) in best case, O(n) in worst case if we need to scan many elements
   */
  getHighestNotMatching(excludedContent: string | null): Element | null {
    // If no elements at all, return null
    if (this.scores.length === 0) return null;

    // Try each score in descending order
    for (const score of this.scores) {
      const elements = this.scoreToElements.get(score)!;

      // Find the first element that's not excluded
      for (const element of elements) {
        if (excludedContent === null || element.content !== excludedContent) {
          return element;
        }
      }
    }

    // If all elements are excluded (should only happen if there's just one element)
    // return the highest scoring one anyway
    if (this.scores.length > 0) {
      const highestScore = this.scores[0];
      const elementsSet = this.scoreToElements.get(highestScore);
      if (elementsSet && elementsSet.size > 0) {
        return Array.from(elementsSet)[0];
      }
    }

    return null;
  }

  /**
   * Inserts a score into the sorted scores array
   * Time Complexity: O(log n) using binary search insertion
   */
  private insertScore(score: number): void {
    // Binary search to find insertion point
    let left = 0;
    let right = this.scores.length - 1;

    // We want to insert in descending order
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (this.scores[mid] === score) return; // Already exists
      if (this.scores[mid] > score) left = mid + 1;
      else right = mid - 1;
    }

    // Insert at the correct position to maintain descending order
    this.scores.splice(left, 0, score);
  }

  /**
   * Removes a score from the sorted scores array
   * Time Complexity: O(log n) using binary search deletion
   */
  private removeScore(score: number): void {
    // Binary search to find deletion point
    let left = 0;
    let right = this.scores.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (this.scores[mid] === score) {
        this.scores.splice(mid, 1);
        return;
      }
      if (this.scores[mid] > score) left = mid + 1;
      else right = mid - 1;
    }
  }
}

// Example usage:
const manager = new ElementManager();
manager.addElement('apple', 5);
manager.addElement('banana', 3);
manager.addElement('cherry', 5);

console.log(manager.getElement()); // Expected: "apple" or "cherry" (both have score 5)
console.log(manager.getElement()); // Expected: The other element with score 5 (the first one is blocked)
console.log(manager.getElement()); // Expected: The first element again (its score is now 4, the other is 4 and blocked)
console.log(manager.getElement()); // Expected: The second element again (its score is now 4, the first is 3 and blocked)
console.log(manager.getElement()); // Expected: "banana" (both 'apple' and 'cherry' are at 3, but one is blocked)

console.log(manager.getElement()); // Expected: "apple" or "cherry" (whichever was not blocked last time)
