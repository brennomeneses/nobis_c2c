const reduceRating = (clientRating: any[]) => {
  const rating = clientRating.reduce((acc: number, curr: any) => {
    return acc + (curr.payment + curr.helpfulness + curr.respect) / 3
  }, 0);

  return (rating / clientRating.length).toFixed(2);
}

export default reduceRating;