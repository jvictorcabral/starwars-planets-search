function OrderFilter(filter, order) {
  const NEGATIVE = -1;

  filter.sort((a, b) => {
    switch (order.sort) {
    case 'ASC':
      if (Number(a[order.column] === 'unknown')) return 1;
      if (Number(a[order.column]) < Number(b[order.column])) return NEGATIVE;
      if (Number(a[order.column]) > Number(b[order.column])) return 1;
      return 0;
    case 'DESC':
      if (Number(a[order.column] === 'unknown')) return 1;
      if (Number(b[order.column] === 'unknown')) return NEGATIVE;
      if (Number(b[order.column]) > Number(a[order.column])) return 1;
      if (Number(b[order.column]) < Number(a[order.column])) return NEGATIVE;
      return 0;
    default:
      return 0;
    }
  });
}

export default OrderFilter;
