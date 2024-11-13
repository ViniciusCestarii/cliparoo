/**
 * Generic binary search function
 * @param {Array<T>} array - The sorted array to search
 * @param {number} target - The target value to find
 * @param {(item: T) => number} selector - Function to select the property to compare
 * @param {boolean} isDesc - Whether the array is sorted in descending order
 * @returns {number} - The index of the target if found, otherwise -1
 */
export function binarySearch<T>(array: T[], target: number, selector: (item: T) => number, isDesc: boolean = false): number {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midValue = selector(array[mid]);

      if (!isDesc) {
          if (midValue === target) {
              return mid;
          } else if (midValue < target) {
              left = mid + 1;
          } else {
              right = mid - 1;
          }
      } 
      else {
          if (midValue === target) {
              return mid;
          } else if (midValue > target) {
              left = mid + 1;
          } else {
              right = mid - 1;
          }
      }
  }
  return -1;
}
