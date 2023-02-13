/* 转换前：
source = [{
    id: 1,
    pid: 0,
    name: 'body'
}, {
    id: 2,
    pid: 1,
    name: 'title'
}, {
    id: 3,
    pid: 2,
    name: 'div'
}]
 转换为:
tree = [{
            id: 1,
            pid: 0,
            name: 'body',
            children: [{
                    id: 2,
                    pid: 1,
                    name: 'title',
                    children: [{
                        id: 3,
                        pid: 1,
                        name: 'div'
                    }]
                }
            }] */

const source = [{
    id: 1,
    pid: 0,
    name: 'body'
}, {
    id: 2,
    pid: 1,
    name: 'title'
}, {
    id: 3,
    pid: 2,
    name: 'div'
}]

function jsonToTree(data) {
    // 初始化结果数组，并判断输入数据的格式
    let result = []
    if (!Array.isArray(data)) {
        return result
    }
    // 使用map，将当前对象的id与当前对象对应存储起来
    /*
     {
       '1': { id: 1, pid: 0, name: 'body' },
       '2': { id: 2, pid: 1, name: 'title' },
       '3': { id: 3, pid: 2, name: 'div' }
     }
    */
    let map = {};

    data.forEach(item => {
        map[item.id] = item;
    });
    data.forEach(item => {
        let parent = map[item.pid];
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            result.push(item);
        }
    });
    return result;
}

console.log(jsonToTree(source));

//手写数组转树
// 例如将 input 转成output的形式
let input = [{
    id: 1,
    val: '学校',
    parentId: null
}, {
    id: 2,
    val: '班级1',
    parentId: 1
}, {
    id: 3,
    val: '班级2',
    parentId: 1
}, {
    id: 4,
    val: '学生1',
    parentId: 2
}, {
    id: 5,
    val: '学生2',
    parentId: 3
}, {
    id: 6,
    val: '学生3',
    parentId: 3
}]


let output = {
    id: 1,
    val: '学校',
    children: [{
        id: 2,
        val: '班级1',
        children: [{
                id: 4,
                val: '学生1',
                children: []
            },
            {
                id: 5,
                val: '学生2',
                children: []
            }
        ]
    }, {
        id: 3,
        val: '班级2',
        children: [{
            id: 6,
            val: '学生3',
            children: []
        }]
    }]
}

// 递归
function arrayToTree(array) {
    let root = array[0]
    array.shift()
    let tree = {
        id: root.id,
        val: root.val,
        children: array.length > 0 ? toTree(root.id, array) : []
    }
    return tree;
}

function toTree(parenId, array) {
    let children = []
    let len = array.length
    for (let i = 0; i < len; i++) {
        let node = array[i]
        if (node.parentId === parenId) {
            children.push({
                id: node.id,
                val: node.val,
                children: toTree(node.id, array)
            })
        }
    }
    return children
}


function jsonToTree2(data) {
    // 初始化结果数组，并判断输入数据的格式
    let result = []
    if (!Array.isArray(data)) {
        return result
    }
    // 使用map，将当前对象的id与当前对象对应存储起来
    let map = {};
    data.forEach(item => {
        map[item.id] = item;
    });
    console.log(map)
    //
    data.forEach(item => {
        let parent = map[item.parentId];
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            result.push(item);
        }
    });
    return result;
}

console.log(arrayToTree(input))
console.log(jsonToTree2(input))
