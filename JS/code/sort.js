// 冒泡排序
function bubbleSort(arr) {
  if (!Array.isArray(arr)) {
    return false
  }
  let len = arr.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}

// 选择排序 
function selectionSort(arr) {
  if (!Array.isArray(arr)) {
    return false
  }
  let len = arr.length
  let minIndex, temp
  for (let i = 0; i < len - 1; i++) {
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  return arr
}

// 插入排序
function insertionSort(arr) {
  if (!Array.isArray(arr)) {
    return false
  }
  let len = arr.length
  let preIndex, current
  for (let i = 0; i < len; i++) {
    preIndex = i - 1
    current = arr[i]
    while(preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex]
      preIndex--
    }
    arr[preIndex + 1] = current
  }
  return arr
}

// 归并排序
function mergeSort(arr) {
  if (!Array.isArray(arr)) {
    return false
  }
  let len = arr.length
  if (len < 2) {
    return arr
  }
  let middle = Math.floor(len / 2)
  let left = arr.slice(0, middle)
  let right = arr.slice(middle)
  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  let result = []
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  while (left.length) {
    result.push(left.shift())
  }

  while (right.length) {
    result.push(right.shift())
  }

  return result
}

// 快速排序
function quickSort(arr, low, high) {
  if (!Array.isArray(arr) || low > high) {
    return false
  }
  let piovt = arr[low]
  let i = low
  let j = high
  while (i < j) {
    while (arr[j] >= piovt && j > i) {
      j--
    }
    arr[i] = arr[j]
    while (arr[i] < piovt && j > i) {
      i++
    }
    arr[j] = arr[i]
  }

  arr[i] = piovt
  quickSort(arr, low, i - 1)
  quickSort(arr, i + 1, high)
  return arr
}
