function getMovie(movies, rental) {
  return movies[rental.movieID];
}

export function billForRental(movies, r) {
  let thisAmount = 0;

  // determine amount for each movie
  switch (getMovie(movies, r).code) {
    case "regular":
      thisAmount = 2;
      if (r.days > 2) {
        thisAmount += (r.days - 2) * 1.5;
      }
      break;
    case "new":
      thisAmount = r.days * 3;
      break;
    case "children":
      thisAmount = 1.5;
      if (r.days > 3) {
        thisAmount += (r.days - 3) * 1.5;
      }
      break;
    default:
      throw new Error("Invalid move type:" + getMovie(movies, r).code);
  }
  return thisAmount;
}

function statement(customer, movies) {
  let totalAmount = 0;
  let frequentRenterPoints = 0;
  let result = `Rental Record for ${customer.name}\n`;
  for (let r of customer.rentals) {
    let thisAmount = billForRental(movies, r);

    //add frequent renter points
    frequentRenterPoints++;
    // add bonus for a two day new release rental
    if (getMovie(movies, r).code === "new" && r.days > 2)
      frequentRenterPoints++;

    //print figures for this rental
    result += `\t${getMovie(movies, r).title}\t${thisAmount}\n`;
    totalAmount += thisAmount;
  }
  // add footer lines
  result += `Amount owed is ${totalAmount}\n`;
  result += `You earned ${frequentRenterPoints} frequent renter points\n`;

  return result;
}

export { statement };