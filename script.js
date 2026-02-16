let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const list = document.getElementById("list");

function saveData() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction() {
    const text = document.getElementById("text").value.trim();
    const amount = +document.getElementById("amount").value;

    if (!text || !amount) return;

    const transaction = {
        id: Date.now(),
        text,
        amount
    };

    transactions.push(transaction);
    saveData();
    updateUI();

    document.getElementById("text").value = "";
    document.getElementById("amount").value = "";
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    saveData();
    updateUI();
}

function updateUI() {
    list.innerHTML = "";

    transactions.forEach(transaction => {
        const li = document.createElement("li");
        li.classList.add(transaction.amount > 0 ? "plus" : "minus");

        li.innerHTML = `
            ${transaction.text}
            <span>
                ₹${transaction.amount}
                <button onclick="deleteTransaction(${transaction.id})">x</button>
            </span>
        `;

        list.appendChild(li);
    });

    const amounts = transactions.map(t => t.amount);

    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2);
    const expense = (
        amounts
            .filter(item => item < 0)
            .reduce((acc, item) => acc + item, 0) * -1
    ).toFixed(2);

    balanceEl.textContent = `₹${total}`;
    incomeEl.textContent = `₹${income}`;
    expenseEl.textContent = `₹${expense}`;
}

updateUI();
