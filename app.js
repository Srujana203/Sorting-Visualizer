var array = document.getElementById("generate_array");
var rangeslider = document.getElementById("sliderRange");
var output = document.getElementById("demo");
output.innerHTML = rangeslider.value;
var v = rangeslider.value;

let values = [];
let w = 10;
let states = [];

function setup() {
  createCanvas(v * 10, 600);
  values = new Array(Number(v));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
    states[i] = -1;
  }
  array.onclick = function() {
    createCanvas(v * 10, 600);

    values = new Array(Number(v));
    for (let i = 0; i < values.length; i++) {
      values[i] = random(height);
      states[i] = -1;
    }
  };
  rangeslider.oninput = function() {
    output.innerHTML = this.value;
    v = this.value;
    createCanvas(v * 10, 500);
    values = new Array(Number(v));
    for (let i = 0; i < values.length; i++) {
      values[i] = random(height);
      states[i] = -1;
    }
  };
  let quick_sort = document.getElementById("quick_sort");
  quick_sort.onclick = function() {
    quickSort(values, 0, values.length - 1);
  };
  let heap_sort = document.getElementById("heap_sort");
  heap_sort.onclick = function() {
    heapSort(values);
  };
  let bubble_sort = document.getElementById("bubble_sort");
  bubble_sort.onclick = function() {
    bubbleSort(values);
  };
  let merge_sort = document.getElementById("merge_sort");
  merge_sort.onclick = function() {
    mergeSort(values);
  };
  let selection_sort = document.getElementById("selection_sort");
  selection_sort.onclick = function() {
    selectionSort(values);
  };
  let insertion_sort = document.getElementById("insertion_sort");
  insertion_sort.onclick = function() {
    insertionSort(values);
  };
}

async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let index = await partition(arr, start, end);
  states[index] = -1;

  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  ]);
}

async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }

  let pivotValue = arr[end];
  let pivotIndex = start;
  states[pivotIndex] = 0;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }
  await swap(arr, pivotIndex, end);

  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }

  return pivotIndex;
}

function draw() {
  background(0, 100, 0);

  for (let i = 0; i < values.length; i++) {
    noStroke();
    if (states[i] == 0) {
      fill("#E0777D");
    } else if (states[i] == 1) {
      fill("#D6FFB7");
    } else {
      fill(255);
    }
    rect(i * w, height - values[i], w, values[i]);
  }
}

async function swap(arr, a, b) {
  await sleep(50);

  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

async function mergeSort(array) {
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  await mergeSortHelper(array, 0, array.length - 1, auxiliaryArray);
}

async function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  await sleep((endIdx - startIdx) * 4);
  await mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray);
  await mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray);
  await doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray);
}

async function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray) {
  for (let i = startIdx; i <= endIdx; i++) {
    states[i] = 1;
  }
  let z = startIdx;
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    states[z++] = 0;
    await sleep(20);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    states[z++] = 0;
    await sleep(20);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    states[z++] = 0;
    await sleep(20);
    mainArray[k++] = auxiliaryArray[j++];
  }
  for (let i = startIdx; i <= endIdx; i++) {
    states[i] = -1;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort(arr) {
  var len = arr.length;

  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - i - 1; j++) {
      states[j] = 1;
    }
    for (var j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        states[j] = 0;
        await sleep(1);
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
      states[j] = -1;
    }
  }
}
async function selectionSort(items) {
  var length = items.length;
  for (var i = 0; i < length - 1; i++) {
    var min = i;
    for (var j = i + 1; j < length; j++) {
      if (items[j] < items[min]) {
        min = j;
      }
    }
    if (min != i) {
      let start = i;
      let end = min;
      for (let x = start; x < end; x++) {
        states[x] = 1;
      }
      states[i] = 0;
      states[min] = 0;
      await sleep(100);
      let tmp = items[i];
      items[i] = items[min];
      items[min] = tmp;
      states[min] = -1;
      states[i] = -1;
      for (let x = start; x < end; x++) {
        states[x] = -1;
      }
    }
  }
  for (var i = 0; i <= length - 1; i++) {
    states[i] = -1;
  }
}

async function insertionSort(unsortedList) {
  var len = unsortedList.length;
  for (var i = 1; i < len; i++) {
    states[i] = 1;
  }
  states[0] = 0;
  for (var i = 1; i < len; i++) {
    states[i] = 0;
    await sleep(50);
    var tmp = unsortedList[i];
    for (var j = i - 1; j >= 0 && unsortedList[j] > tmp; j--) {
      unsortedList[j + 1] = unsortedList[j];
    }
    unsortedList[j + 1] = tmp;
  }
  for (var i = 0; i < len; i++) {
    states[i] = -1;
  }
}
async function max_heapify(a, i, length) {
  while (true) {
    var left = i * 2 + 1;
    var right = i * 2 + 2;
    var largest = i;
    if (left < length && a[left] > a[largest]) {
      largest = left;
    }
    if (right < length && a[right] > a[largest]) {
      largest = right;
    }
    if (i == largest) {
      break;
    }
    states[i] = 0;
    states[largest] = 0;
    for (let z = i + 1; z < largest; z++) {
      states[z] = 1;
    }
    await sleep(10);
    await swap(a, i, largest);
    for (let z = i + 1; z < largest; z++) {
      states[z] = -1;
    }
    states[i] = -1;
    states[largest] = -1;
    i = largest;
  }
}

async function heapify(a, length) {
  for (var i = Math.floor(length / 2); i >= 0; i--) {
    await max_heapify(a, i, length);
  }
}

async function heapSort(a) {
  await heapify(a, a.length);

  for (var i = a.length - 1; i > 0; i--) {
    await swap(a, 0, i);

    await max_heapify(a, 0, i);
  }
}
