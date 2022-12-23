var abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "task",
				"type": "string"
			}
		],
		"name": "add_task",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "task",
				"type": "string"
			}
		],
		"name": "remove_task",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "get_tasks",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
var address = "0xBB8d941f4dA87FFD97e05c01c3F30983f0793a6D";

var tasks =[];

var contract;
$(document).ready(function(){
    var web3 = new Web3(Web3.givenProvider);
    contract = new web3.eth.Contract(abi,web3.utils.toChecksumAddress(address));
        contract.methods.get_tasks().call().then(function(value){
        tasks=value;
        for(let i=0;i<tasks.length;i++){
            $('#alltasks').append(
                ` <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" onclick='remove("${tasks[i]}")' id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                ${tasks[i]}
                </label>
                </div>`
            );
        }
    })
})


function remove(task){
    window.ethereum.request({method: "eth_requestAccounts"}).then(function(accounts){
        var account = accounts[0];
        return contract.methods.remove_task(task).send({from:account});
    }).then(function(tx){
        contract.methods.get_tasks().call().then(function(value){
            tasks=value;
            $('#alltasks').html('');
            for(let i=0;i<tasks.length;i++){
                $('#alltasks').append(
                    ` <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" onclick='remove("${tasks[i]}")' id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                    ${tasks[i]}
                    </label>
                    </div>`
                );
        }
        })
})}

$(document).on('submit', '#add', function() {
    var new_task = String($('#taskinput').val());
    console.log(new_task);
    window.ethereum.request({method: "eth_requestAccounts",}).then(function(accounts){
        var account = accounts[0];
        return contract.methods.add_task(new_task).send({from:account});
    }).then(function(tx){
        contract.methods.get_tasks().call().then(function(value){
            tasks=value;
            $("input[type=text]").val("")
            $('#alltasks').html('');
            for(let i=0;i<tasks.length;i++){
                $('#alltasks').append(
                    ` <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" onclick='remove("${tasks[i]}")' id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                    ${tasks[i]}
                    </label>
                    </div>`
                );
        }
    })
}
)
return false;
}
)