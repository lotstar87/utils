/**
 * A <-> B 환율 변경 계산
 * 최대 표현 가능한 소숫점 이하는 버림
 */

// TODO: 네이밍 및 파라메터 수정 필요

const EXCHANGE_RATE = 1200.23


function aToB(a, aDecimalPoint = 0, bDecimalPoint = 0) {
  const floorA = Math.floor(a * 10 ** aDecimalPoint) / 10 ** aDecimalPoint
  
  const exchanged = Math.floor((floorA * EXCHANGE_RATE) * 10 ** bDecimalPoint) / 10 ** bDecimalPoint
  if(a === floorA) {
      return {
        from: floorA,
        to: exchanged
      }
  } else {
    return aToB(floorA, aDecimalPoint, bDecimalPoint)
  }
}

function bToA(b, aDecimalPoint = 0, bDecimalPoint = 0) {
  const exchanged = b / EXCHANGE_RATE
  return aToB(exchanged, aDecimalPoint, bDecimalPoint)
}

console.log(aToB(1, 2, 3))
console.log(aToB(0.99, 2, 2))
console.log(bToA(1200, 2, 3))
console.log(bToA(1201,  4, 2))

