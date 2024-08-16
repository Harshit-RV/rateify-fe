export const providerUrl = 'http://127.0.0.1:8545';
// export const providerUrl = 'https://kjl5p07l-7545.inc1.devtunnels.ms/';
// export const providerUrl = 'https://x2vrsp0j-8545.inc1.devtunnels.ms/';
// 
export const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "productId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "feedback",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "rating",
				"type": "string"
			}
		],
		"name": "addProductFeedback",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "productId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "originalPoster",
				"type": "string"
			}
		],
		"name": "downvoteProductFeedback",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "feedbacks",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totalRating",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ratingCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFeedbacksByUser",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "feedbackText",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "rating",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "upvotes",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "downvotes",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "productId",
						"type": "string"
					}
				],
				"internalType": "struct TokenContract.Feedback[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "productId",
				"type": "string"
			}
		],
		"name": "getProductFeedbacks",
		"outputs": [
			{
				"components": [
					{
						"components": [
							{
								"internalType": "string",
								"name": "feedbackText",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "rating",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "upvotes",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "downvotes",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "user",
								"type": "address"
							},
							{
								"internalType": "string",
								"name": "productId",
								"type": "string"
							}
						],
						"internalType": "struct TokenContract.Feedback[]",
						"name": "feedbacks",
						"type": "tuple[]"
					},
					{
						"internalType": "uint256",
						"name": "totalRating",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "ratingCount",
						"type": "uint256"
					}
				],
				"internalType": "struct TokenContract.ProductFeedback",
				"name": "productFeedback",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUserDownvotes",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUserUpvotes",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "myAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "productId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "originalPoster",
				"type": "string"
			}
		],
		"name": "upvoteProductFeedback",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
export const contractAddress = '0xe0ec40828372c0affa2d7bb6acfeb5aece78c414';