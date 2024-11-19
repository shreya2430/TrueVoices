import mongoose from "mongoose";

//Defining the Credit Transaction Schema for individual credit transactions
const CreditTransactionSchema = new mongoose.Schema({
    transactionId: {type: String, required: true, unique: true}, 
    //the amount of credit for the transaction
    amount: { type: Number, required: true}, 
    type: {type: String, required: true, enum: ['purchase', 'refund']},
    //the date of the transaction and setting the default value to the current date and time
    date: {type: Date, required: true, default: Date.now},
});

//Defining the credit details schema for the user credit details, incuding balance and transcactions
const CreditDetailsSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    balance: { type: Number, required: true, default: 0 }, 
    //To store all credit-related transactions for the user
    transactions: [CreditTransactionSchema], //Embedding the transaction schema
});

//Defining the Credit purchase request schema for the user credit purchase requests
const CreditPurchaseRequestSchema = new mongoose.Schema({
    userId: { type: String, required: true }, 
    amount: {type: Number, required: true, min: 1},  //1 to ensure a positive amount 
    //The STRIPE payment method id used for the transaction
    paymentMethodId: {type: String, required: true},
    // The STRIPE payment intent id used for the transaction
    paymentIntentId: { type: String, required: true}, 
    status: {type: String, required: true, enum: ['pending', 'completed', 'failed'], default: 'pending'},
    createdAt: {type: Date, default: Date.now},
});

//Defining the Credit purchase response schema for the user credit purchase responses
const CreditPurchaseResponseSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    transactionId: {type: String, required: true, unique: true},
    amount: {type: Number, required: true},
    newBalance: {type: Number, required: true},
    purchaseDate: { type: Date, required: true, default: Date.now },
});

//Defining the Error Responses schema for the error responses
const ErrorResponsesSchema = new mongoose.Schema({
    code: { type: String, required: true },
    message: { type: String, required: true },
});

const CreditTransaction = mongoose.model('CreditTransaction', CreditTransactionSchema);
const CreditDetails = mongoose.model('CreditDetails', CreditDetailsSchema);
const CreditPurchaseRequest = mongoose.model('CreditPurchaseRequest', CreditPurchaseRequestSchema);
const CreditPurchaseResponse = mongoose.model('CreditPurchaseResponse', CreditPurchaseResponseSchema);
const ErrorResponses = mongoose.model('ErrorResponses', ErrorResponsesSchema);

export default { CreditTransaction, CreditDetails, CreditPurchaseRequest, CreditPurchaseResponse, ErrorResponses };

//Each schema is introduced for a specific part of the data model
//separated it to make it easier to manage and maintain the code

