//s2出现的在s1中删掉
function remove(s1,s2){
    for(let i = 0,len = s2.length;i < len; i ++){
        s1 = s1.replace(s2[i],"")
    }
    return s1;
}
console.log(remove("abcdefg","abcdfhhrhr"))