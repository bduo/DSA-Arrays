var Memory = require('./memory.js');
var memory = new Memory();

class Array {
    constructor() {
        console.log(memory.allocate)
        this.length = 0;
        this._capacity = 0;
        this.ptr = memory.allocate(this.length);
    }
    
    push(value) {
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        memory.set(this.ptr + this.length, value);
        this.length++;
    }

    pop() {
        if (this.length == 0) {
            throw new Error('Index error');
        }
        const value = memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }
    
    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = memory.allocate(size);
        if (this.ptr === null) {
            throw new Error('Out of memory');
        }
        memory.copy(this.ptr, oldPtr, this.length);
        memory.free(oldPtr);
        this._capacity = size;
    }
    remove(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
        this.length--;
    }

    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        return memory.get(this.ptr + index);
    }

    threshold(maxValue) {
        for (let i = 0; i < this.length; i++) {
            if (this.get(i) < maxValue) {
                this.remove(i)                
            }
        }
    }

    print() {
        const tempArr = [];
        for(let i = 0; i < this.length; i++) {
            tempArr.push(this.get(i))
        }
        console.log(tempArr)
        // declare a temporary array variable
        // loop through the current array which is this
        // get the value out of memory storage and push it to the temporary array
        // console.log temporary array
    }
}

function main() {

    Array.SIZE_RATIO = 3;

    // Create an instance of the Array class
    let arr = new Array();
    
    arr.push(5)
    arr.push(2)
    arr.push(4)
    arr.push(7)
    arr.push(6)
    // Add an item to the array
    // console.log(arr);
    // arr.push('Tauhida');
    // console.log(arr)
    arr.threshold(5)
    arr.print()
    console.log(arr)
    
}

main()

// function replaceSpace(str) {
    
//     for(let i = 0; i < str.length; i++) {
//        str[i].replace(' ','%20');
//     }
// }
 
// replaceSpace('www.thinkful.com /tauh ida parv een')


// function replaceSpace(str) {
//     return encodeURI(str);
// }

// console.log(replaceSpace('www.thinkful.com /tauh ida parv een'))

// function removeBelowFive() {
//     var array = [2, 6, 4, 9, 1]
//     array.threshold(5)
// }

// let arr = [9, 6, 5, 1, 3];


