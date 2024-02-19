import React, { useState } from 'react'

/**
 * Calculates the total expense based on the given expense array.
 * @param expenseArray - An array of expenses.
 * @returns The total expense.
 */

export default function expenseTotal(expenseArray: any[]) {

    console.log(expenseArray)

    let expenseTotal = 0;
    
    for (let i = 0; i < expenseArray.length; i++) {
        if (expenseArray[i].frequency === 'Weekly') {
        expenseTotal += expenseArray[i].amount * 4
        } else if (expenseArray[i].frequency === 'Bi-Weekly') {
        expenseTotal += expenseArray[i].amount * 2
        } else if (expenseArray[i].frequency === 'Monthly') {
        expenseTotal += expenseArray[i].amount 
        }
    }
    

    return expenseTotal
}