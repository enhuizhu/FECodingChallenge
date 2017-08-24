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

    static getTree(sections, qas) {
        let sectionsObj = this.putQaIntoSections(sections, qas);
        
        Object.keys(sectionsObj).map(k => {
            let parent = sectionsObj[sectionsObj[k].parentId]
            
            if (parent) {
                if (!parent.children) {
                    parent.children = [];
                }

                parent.children.push(sectionsObj[k]);
            }
        });

        return sectionsObj['-1'];
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

    static getTreeDoms(tree, states) {
        let container = '<div class="node">';
        
        container += `<h4>${tree.title}</h4>`;

        if (tree.qas) {
            container += '<ul class="qas">';
                tree.qas.map(v => {
                    container += '<li class="qas-wrapper' + (states.indexOf(v.tocId) !== -1 ? ' active' : '') + '">';
                        container += v.question;
                        container += v.answer;
                    container += '</li>';
                });
            container += '</ul>'
        }

        if (tree.children) {
            tree.children.map(v => {
                container += this.getTreeDoms(v, states);
            });
        }

        container += '</div>';

        return container;
    }

    static getUniqueStateArr(states) {
        let arr = [];
        
        states.map(v => {
            v.expanded.map(v2 => {
                if (arr.indexOf(v2) === -1) {
                    arr.push(v2);
                }
            });
        });

        return arr;
    }
}

module.exports = dataService;

// export default dataService;