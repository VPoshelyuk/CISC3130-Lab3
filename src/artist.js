class Artist {
    constructor(name, appNum, next = null) {
        this.name = name;
        this.appNum = appNum;
        this.next = next;
    }
}

class TopStreamingArtists {
    constructor() {
        this.head = null
    }

    insertSorted (node) {
        if(!this.head || this.head.name >= node.name) {
            node.next = this.head 
            this.head = node 
        } else {
            let current = this.head
            while (current.next && current.next.name.localeCompare(node.name) < 0) {
                current = current.next; 
            }

            node.next = current.next; 
            current.next = node; 
        }
    }

    size() {
        let counter = 0
        if (this.head) {
            let check = this.head
            while(check){
                counter++
                check = check.next
            }
        }
        return counter
    }

    clear() {
        this.head = null
    }

    getAt(index){
        let counter = 0
        let check = this.head
        if (this.head) {
            while(counter < index){
                counter++
                check = check.next
            }
        }
        return check
    }

    forEach(_) {
        if (!this.head) return
        for (let i = 0; i < this.size(); i++) {
            _(this.getAt(i))
        }
    }
}

module.exports = {
    Artist : Artist,
    TopStreamingArtists : TopStreamingArtists
  }