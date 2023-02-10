/*
 输⼊: "the sky is blue"
输出: "blue is sky the" 

*/
//1.正则
var reverseWords = function (s) {
  return s.trim().replace(/\s+/g, " ").split(" ").reverse().join(" ");
};

const reverseWords3 = (s) => {
  const arr = s.split(" ");
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    res.push(arr[i].split("").reverse().join(""));
  }
  return res.join(" ");
};

console.log(reverseWords("the sky is blue"));
//双端队列
var reverseWords2 = function (s) {
  let left = 0;
  let right = s.length - 1;
  let queue = [];
  let word = "";
  while (s.charAt(left) === " ") left++;
  while (s.charAt(right) === " ") right--;
  while (left <= right) {
    let char = s.charAt(left);
    if (char === " " && word) {
      queue.unshift(word);
      word = "";
    } else if (char !== " ") {
      word += char;
    }
    left++;
  }
  queue.unshift(word);
  return queue.join(" ");
};
console.log(reverseWords2("the sky is blue"));
