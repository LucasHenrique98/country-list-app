const formatter = Intl.NumberFormat('pt-BR');

function formatNumber(number) {
  return formatter.format(number);
}

export { formatNumber };
