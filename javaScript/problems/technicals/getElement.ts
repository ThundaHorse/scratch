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

type Element = {
  content: string;
  score: number;
};

class ElementManager {
  private elements: Map<string, Element>;
  private lastReturned: string | null;

  constructor() {
    this.elements = new Map<string, Element>();
    this.lastReturned = null;
  }

  addElement(content: string, score: number): void {
    this.elements.set(content, { content, score });
  }

  getElement(): string {
    // Base case: if there are no elements, return an empty string
    if (this.elements.size === 0) return '';

    // Find the element with the highest score that is not the last returned element
    let highestElement: Element | null = null;

    for (const elem of this.elements.values()) {
      // Skip the last returned element
      if (elem.content === this.lastReturned) {
        // this.lastReturned = null; // Reset last returned to allow it to be returned again after one turn
        // If the last returned element is blocked, we skip it

        console.log(`Skipping blocked element: ${elem.content}`);
        continue;
      }

      // If we haven't found a highest element yet or this one has a higher score, update it
      if (!highestElement || elem.score > highestElement.score) {
        highestElement = elem;
        this.lastReturned = null;
      }
      // If scores are equal, prefer the one that was added first (which is the first one we encounter)
      else if (elem.score === highestElement.score) {
        console.log(
          `Equal score found: ${elem.content} & ${highestElement.content} with score ${elem.score} & ${highestElement.score}`
        );

        if (elem.content === this.lastReturned) {
          console.log(`Skipping equal element: ${elem.content} (blocked)`);
          this.lastReturned = null; // Reset last returned to allow it to be returned again after one turn
          continue; // Skip if it's the last returned element
        }

        highestElement.score--;
        highestElement = elem; // Update to the current element with the same score
        this.lastReturned = elem.content; // Update last returned to the current element

        // If the current element has the same score as the highest, we can still return it
        // but we need to ensure we don't return the same element consecutively
        if (highestElement.content !== this.lastReturned) {
          this.lastReturned = highestElement.content; // Update last returned to the current element
          highestElement.score--; // Decrease the score of the highest element

          continue; // Skip to the next iteration
        }

        // If the current element has the same score as the highest and is not blocked, we can return it
        if (
          highestElement.content === elem.content &&
          this.lastReturned !== elem.content
        ) {
          this.lastReturned = elem.content;
          elem.score--; // Decrease the score of the equal element
        }

        this.lastReturned = highestElement.content;
        highestElement.score--; // Decrease the score of the highest element
      }
      // If the score is zero, we can still return it
      else if (elem.score === 0 && elem.content !== this.lastReturned) {
        this.lastReturned = elem.content;
        elem.score--; // Decrease the score of the zero-score element
      }
      // If the score is negative
      else if (elem.score < 0) {
        // If the current highest element is blocked, we can still return it if no other valid element is found
        if (highestElement && this.lastReturned === highestElement.content) {
          this.lastReturned = elem.content;
          elem.score--;
        } else {
          // If the current element has a score less than zero, we can skip it
          console.log([elem.content, elem.score]);
          continue;
        }
      }
    }

    // If we found a valid highest element, return its content
    if (highestElement) {
      this.lastReturned = highestElement.content;
      highestElement.score--;
      // console.log([highestElement.content, highestElement.score]);
      return highestElement.content;
    }

    // If no valid element was found, return an empty string
    return '';
  }
}

// Example usage:
const manager = new ElementManager();
manager.addElement('apple', 5);
manager.addElement('banana', 3);
manager.addElement('cherry', 5);

console.log(manager.getElement()); // Output: "apple" (highest score 5)
console.log(manager.getElement()); // Output: "cherry" (next highest score 5, apple blocked)
console.log(manager.getElement()); // Output: "apple" (block expired, score now 3. cherry was blocked)
console.log(manager.getElement()); // Output: "cherry" (block expired, score now 3)
console.log(manager.getElement()); // Output: "banana" (highest score apple blocked, banana also has 3)
