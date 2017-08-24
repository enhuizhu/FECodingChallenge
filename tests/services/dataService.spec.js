'use strict';

var dataService = require('../../src/services/dataService');
var chai = require('chai');
var expect = chai.expect;

describe('dataService', () => {
    var sections  = require('../../data/sections.json');
    var qas = require('../../data/4,5,6,7,8,11,12,15,16,17.json');
    var states = require('../../data/states.json');

    it('getTree', () => {
        let tree = dataService.getTree(sections, qas);

        console.log(tree);
    });

    it('putQaIntoSections', () => {
        let sectionObj = dataService.putQaIntoSections(sections, qas);         
    });

    it('convertArrToObj', () => {
        let arr = [{
                "id": -1,
                "title": "Chapters",
                "parentId": -2
            }, {
                "id": 1,
                "title": "COMPANY DEALINGS",
                "parentId": -1
            }];

        let newObj = dataService.convertArrToObj(arr);

        expect(newObj).to.deep.equal({ 
            '1': 
                { 
                    id: 1, 
                    title: 'COMPANY DEALINGS', 
                    parentId: -1 
                },
            '-1': 
                { 
                    id: -1, 
                    title: 'Chapters', 
                    parentId: -2 
                } 
            });        
    });

    it('getUniqueStateArr', () => {
        let newStates = dataService.getUniqueStateArr(states);
        expect(newStates).to.deep.equal(newStates);
    });
});