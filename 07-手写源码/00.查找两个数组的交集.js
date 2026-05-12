var intersection = function (nums1, nums2) {
  let map1 = new Set(nums1);
  let map2 = new Set(nums2);
  let res = [];
  map1.forEach((item) => {
    if (map2.has(item)) {
      res.push(item);
    }
  });
  return res;
};
const arr1 = [1, 2, 2, 1];
const arr2 = [1, 1, 5, 6];
console.log(intersection(arr1, arr2));
const fn = (n1, n2) => [...new Set(n1.filter((i) => n2.includes(i)))];
console.log(fn([1, 2, 2, 1], [0, 0]));

//两个数组交集
const intersect = (nums1, nums2) => {
  const map = {};
  const res = [];
  for (let n of nums1) {
    if (map[n]) {
      map[n]++;
    } else {
      map[n] = 1;
    }
  }
  for (let n of nums2) {
    if (map[n] > 0) {
      res.push(n);
      map[n]--;
    }
  }
  return res;
};
console.log(intersect([1, 4, 5], [4, 7]));

//多个数组交集
function intersect2(...args) {
  if (args.length === 0) {
    return [];
  }
  if (args.length === 1) {
    return args[0];
  }
  return args.reduce((result, arg) => {
    return result.filter((item) => arg.includes(item));
  });
}
console.log(intersect2([1, 4, 5], [4, 7], [5]));
