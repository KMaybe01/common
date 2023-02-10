function MyindexOf(string, target) {
    if (typeof string !== 'string') {
        throw new Error('string only');
    }
    let mt = string.match(new RegExp(target))
    return mt ? mt.index : -1;
}

const str = 'ssdffg'