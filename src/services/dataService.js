'use strict';

class dataService {
    static loadData() {
        const promises = [];

        promises.push(this.loadQa1());
        promises.push(this.loadQa2());
        promises.push(this.loadSection());
        promises.push(this.loadState());

        return Promise.all(promises);
    }

    static loadQa1() {
        return this.get('/data/4,5,6,7,8,11,12,15,16,17.json');
    }

    static loadQa2() {
        return this.get('/data/44,45,46.json');
    }

    static loadSection() {
        return this.get('/data/sections.json');
    }

    static loadState() {
        return this.get('/data/states.json');
    }

    static get(path) {
        return new Promise((resolve, reject) => {
            fetch(path).then((response) => {
                return response.json();
            }).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    static putQaIntoSections(sections, qas) {
        let newSections = [].concat(sections);
        let sectionsObj = this.convertArrToObj(sections);
        let newQas = [].concat(qas);

        while(newQas.length > 0) {
            let qa = newQas.pop();
            
            if (!sectionsObj[qa.sectionId].qas) {
                sectionsObj[qa.sectionId].qas = [];
            }

            sectionsObj[qa.sectionId].qas.push(qa);
        }

        return sectionsObj;
    }


    static convertArrToObj(arr) {
        let obj  = {};

        arr.map(v => {
            obj[v.id] = v;
        });

        return obj;
    }
}

module.exports = dataService;

// export default dataService;