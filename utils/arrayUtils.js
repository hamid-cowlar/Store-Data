function generateIntegerArray(start, end) {
  if (start > end) {
    return []
  }

  return Array.from(Array(end - start + 1).keys(), (i) => i + start)
}

module.exports = { generateIntegerArray }
