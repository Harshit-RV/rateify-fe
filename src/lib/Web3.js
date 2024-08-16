import {Web3} from 'web3';
import { providerUrl, abi, contractAddress } from './constants';

const web3 = new Web3(providerUrl);
const contract = new web3.eth.Contract(abi, contractAddress);

export const getBalance = async (address) => {
	try {
		const balance = await web3.eth.getBalance(address);
		console.log('Balance:', balance);
	} catch (error) {
		console.error('Error getting balance:', error);
	}
}

export const whatsMyAddress = async (address) => {
	try {
		const addressOutput= await contract.methods.myAddress().call({
			from: address
		});

		console.log('My address: ', addressOutput);
	} catch (error) {
		console.error('Error getting balance:', error);
	}
}

export const addProductFeedback = async (address, productId, feedback, rating) => {
	try {
		await contract.methods.addProductFeedback(
      productId, 
      feedback,
      rating
    ).send({
			from: address,
      gas: 20000000
		});
	} catch (error) {
		console.error('Error adding feedback:', error);
	}
}

export const getProductFeedback = async (address, productId) => {
	try {
		const feedbacks = await contract.methods.getProductFeedbacks(
      productId
    ).call({
			from: address,
      gas: 20000000
		});

		return feedbacks;

	} catch (error) {
		console.error('Error getting feedbacks:', error);
	}
}

export const getUserUpvotes = async (address) => {
	try {
		const upvotes = await contract.methods.getUserUpvotes().call({
			from: address,
      gas: 20000000
		});

		console.log('My upvotes: ', upvotes);
	} catch (error) {
		console.error('Error getting user upvotes:', error);
	}
}

export const getUserDownvotes = async (address) => {
	try {
		const downvotes = await contract.methods.getUserDownvotes().call({
			from: address,
      gas: 20000000
		});

		console.log('My downvotes: ', downvotes);
	} catch (error) {
		console.error('Error getting user downvotes:', error);
	}
}

export const upvoteFeedback = async (address, productId, op) => {
	try {
		await contract.methods.upvoteProductFeedback(
      productId,
      op.toLowerCase()
    ).send({
			from: address,
      gas: 2000000
		});

	} catch (error) {
		console.error('Error upvoting:', error);
	}
}

export const getReviewsOfCurrentUser = async (address) => {
	try {
		const feedbacks = await contract.methods.getFeedbacksByUser().call({
			from: address,
      gas: 200000000
		});
		console.log('My reviews:', feedbacks);
		return feedbacks;
	} catch (error) {
		console.error('Error upvoting:', error);
	}
}

export const downvoteProductFeedback = async (address, productId, op) => {
	try {
		await contract.methods.downvoteProductFeedback(
      productId,
      op.toLowerCase()
    ).send({
			from: address,
      gas: 2000000
		});

	} catch (error) {
		console.error('Error downvoting:', error);
	}
}