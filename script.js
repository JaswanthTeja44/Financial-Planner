    const form = document.getElementById('financeForm');
    const goalInput = document.getElementById('goal');
    const expenseInput = document.getElementById('expense');
    const errorDiv = document.getElementById('error');

    const goalAmountDisplay = document.getElementById('goalAmount');
    const totalExpensesDisplay = document.getElementById('totalExpenses');
    const remainingDisplay = document.getElementById('remaining');

    let savingsGoal = 0;
    let totalExpenses = 0;

    const ctx = document.getElementById('progressChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Saved', 'Remaining'],
        datasets: [{
          label: 'Progress',
          data: [0, 0],
          backgroundColor: ['#22c55e', '#f3f4f6'],
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          }
        }
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      errorDiv.textContent = '';

      const goalValue = parseFloat(goalInput.value);
      const expenseValue = parseFloat(expenseInput.value || 0);

      if (isNaN(goalValue) || goalValue <= 0) {
        errorDiv.textContent = 'Please enter a valid savings goal.';
        return;
      }

      if (isNaN(expenseValue) || expenseValue < 0) {
        errorDiv.textContent = 'Please enter a valid expense amount.';
        return;
      }

      if (savingsGoal !== goalValue) {
        savingsGoal = goalValue;
        totalExpenses = 0;
      }

      totalExpenses += expenseValue;

      const remaining = Math.max(savingsGoal - totalExpenses, 0);

      goalAmountDisplay.textContent = `$${savingsGoal.toFixed(2)}`;
      totalExpensesDisplay.textContent = `$${totalExpenses.toFixed(2)}`;
      remainingDisplay.textContent = `$${remaining.toFixed(2)}`;

      chart.data.datasets[0].data = [Math.min(totalExpenses, savingsGoal), remaining];
      chart.update();

      goalInput.value = '';
      expenseInput.value = '';
    });
