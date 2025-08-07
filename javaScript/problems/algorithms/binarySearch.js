const search2 = (nums, target) => {
  if (nums.length === 0) return -1;

  let mid = Math.floor(nums.length - 1 / 2);

  if (nums[mid] === target) return mid;
  if (target > nums[mid]) return search(nums.slice(mid + 1), target);
  if (target < nums[mid]) return search(nums.slice(0, mid), target);
};

const search = (nums, target) => {
  // Base case
  if (nums.length === 0) return -1;

  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return mid;
    if (target > nums[mid]) left = mid + 1;
    if (target < nums[mid]) right = mid - 1;
  }

  return -1;
};

console.log(search([-1, 0, 2, 4, 6, 8], 4)); // 3
console.log(search([-1, 0, 2, 4, 6, 8], 3)); // -1
