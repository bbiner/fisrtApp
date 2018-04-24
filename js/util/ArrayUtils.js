export default class ArrayUtils{
    /**
     * 更新数组,若item已存在则将其从数组中删除,若不存在则将其添加到数组
     * **/
    static updateArray(array,item){
        for (let i = 0, len = array.length; i < len; i++) {
            let temp = array[i];
            if (item=== temp) {
                array.splice(i, 1);
                return;
            }
        }
        array.push(item);
    }

    static clone(from) {
        if (!from) return [];
        let newArray = [];
        for (let i=0, len=from.length;i<len;i++) {
            newArray[i]=from[i]
        }
        return newArray;
    }

    static isEqual(arr1, arr2){
        if (!(arr1&&arr2)) return false;
        if (arr1.length!==arr2.length) return false;
        for (let i=0,l=arr2.length;i<l;i++) {
            if (arr1[i]!==arr2[i]) return false;
        }
        return true;
    }


}