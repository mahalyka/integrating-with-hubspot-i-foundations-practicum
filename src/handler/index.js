function formatDate(dateInput) {
    if (!dateInput) return 'N/A';
  
    const date = new Date(dateInput);
  
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
  
    return date.toLocaleDateString('en-SG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  function formatCurrency(amount) {
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount)) return '-';
      
        return numericAmount.toLocaleString('en-SG', {
          style: 'currency',
          currency: 'SGD',
          minimumFractionDigits: 2,
        });
  }
  
  module.exports = {
    formatDate,
    formatCurrency
  };