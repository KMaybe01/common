const dateFormat = (dateInput, format) => {
    const day = dateInput.getDate().toString().padStart(2,'0');
    const month = (dateInput.getMonth() + 1).toString().padStart(2,'0')
    const year = dateInput.getFullYear()
    format = format.replace(/yyyy/, year)
    format = format.replace(/MM/, month)
    format = format.replace(/dd/, day)
    return format
}

const d1 = dateFormat(new Date('2020-12-01'), 'yyyy/MM/dd') // 2020/12/01
const d2 = dateFormat(new Date('2020-04-01'), 'yyyy/MM/dd') // 2020/04/01
const d3 = dateFormat(new Date('2020-04-01'), 'yyyy年MM月dd日') // 2020年04月01日

console.log(d1)
console.log(d2)
console.log(d3)


