// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract ToDo {
    string[]  tasks;

    constructor() {
        tasks;
    }

    function get_tasks() public view returns(string[] memory) {
        return tasks;
    }

    function add_task(string memory task) public {
        tasks.push(task);
    }

    function remove_task(string memory task) public {
        uint index=0;
        while(index<tasks.length){
            if (keccak256(abi.encodePacked(tasks[index])) == keccak256(abi.encodePacked(task))){
                break;
            }
            index++;
        }
        
        for(uint i = index;i<tasks.length-1;i++){
            tasks[i] = tasks[i+1];
        }
        tasks.pop();
    }
}