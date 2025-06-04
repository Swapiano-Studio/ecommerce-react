function formatPrice(value) {
    try {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2
      }).format(value);
    } catch (error) {
      // Fallback manual formatting
      let formatted = value.toFixed(2);
      let parts = formatted.split('.');
      let integerPart = parts[0];
      let decimalPart = parts[1];
  
      let withThousands = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
      return `Rp ${withThousands},${decimalPart}`;
    }
  }
  
export default formatPrice