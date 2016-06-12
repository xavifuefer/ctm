class Line {
  constructor(lineString = '00|00|00|00|00|00|00|00|00|00||') {
    this.lineString = lineString
    this.frames = this.getFrames(lineString)
    this.bonusFrames = this.getBonusFrames(lineString)
  }

  /**
   * Calculates the scoring for an entire line
   * @return {Integer}   Line score
   */
  getScore() {
    let lineScore = 0

    this.frames.forEach((frame, index, allFrames) => {
      lineScore += this.getFrameScore(frame, allFrames[index + 1])
    })

    // gets the final score including the bonus frame
    return lineScore + this.getFrameScore(this.bonusFrames)
  }

  /**
   * Gets the normal (not bonus) frames from a string
   * @param  {String}   lineString   Definition of the game
   * @return {Array}                 Frames that compose the normal (not bonus) rolls
   */
  getFrames(lineString) {
    const frames = lineString.split('||')[0].split('|') // split normal frames from the bonus ones

    // 10 is for the 2 bonus rounds
    if (frames.length > 10) throw Error('The max number of frames is 10')

    // split throws (turns 2 characters into an array)
    return frames.map((frame) => frame.split(''))
  }

  /**
   * Gets the bonus frames from a string
   * @param  {String}   lineString   Definition of the game
   * @return {Array}                 Frames that compose the bonus rolls
   */
  getBonusFrames(lineString) {
    return lineString.split('||')[1].split('')
  }

  /**
   * Calculates the scoring for a single frame
   * @param  {Array}     frame       Array of strings representing the number of pins for each throw
   * @return {Integer}               Frame score
   */
  getFrameScore(frame = [0,0], nextFrame = [0,0]) {
    return frame
      .reduce((prev, curr) => {
        if (curr === 'X') return 10 + Number(nextFrame[0]) + Number(nextFrame[1])
        if (curr === '/') return 10 + Number(nextFrame[0])

        return Number(prev) + Number(curr)
      }, 0)
  }
}

module.exports = Line
