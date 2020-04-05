console.log('Playground');

/*
function bubbleSort(arr) {
  let len = arr.length;

  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }
  return arr;
}

function bubbleSortOpt(arr) {
  let len = arr.length;

  for (let i = 0; i < len - 1; i++) {
    let swapped = false;

    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[i] > arr[i + 1]) {
        let tmp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = tmp;
        swapped = true;
      }
    }

    if (!swapped) {
      break;
    }
  }


  return arr;
}

// console.log(bubbleSort([1, 7, 5, 13, 8]));
// console.log(bubbleSort([64, 34, 25, 12, 22, 11, 90]));

// console.log(bubbleSortOpt([1, 7, 5, 13, 8]));
// console.log(bubbleSortOpt([64, 34, 25, 12, 22, 11, 90]));


var combine = function (n, k) {
  var solution = [];
  var result = [];
  var used = [];	// [1,2,...,n] each element can only be used once

  var backTracking = function (n, m) {
    if (m == k) {

      result.push(solution.slice(0));	// !result.push(solution)
    } else {
      for (var i = 1; i <= n; ++i) {
        if (used[i]) { continue; }	// when true, express the element(used[i]) has been used
        if (m > 0 && solution[m - 1] > i) { continue; }	// elements can only small to large order
        used[i] = true;
        solution[m] = i;
        arguments.callee(n, m + 1);	// backTracking(n, m+1)
        used[i] = false;
      }
    }
  }

  backTracking(n, 0);

  return result;
};

console.log(combine(4, 2));
*/

class LinkedListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insert(node) {
    if (this.head == null) {
      this.head = node;
      return;
    }

    let tail = this.head;

    while (tail && tail.next !== null) {
      tail = tail.next
    }

    tail.next = node
  }
}

const list = new LinkedList();

list.insert(new LinkedListNode(1));
list.insert(new LinkedListNode(2));
list.insert(new LinkedListNode(5));
list.insert(new LinkedListNode(3));
list.insert(new LinkedListNode(4));
