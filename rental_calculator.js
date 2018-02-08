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

function printBillForRental(movies, rental, bill) {
  return `\t${getMovie(movies, rental).title}\t${bill}\n`;
}

function qualifiedForBonusPoint(movies, rental) {
  return getMovie(movies, rental).code === "new" && rental.days > 2;
}

function getTotalBill(customer, movies) {
  let totalBill = 0;
  for (let rental of customer.rentals) {
    const bill = billForRental(movies, rental);
    totalBill += bill;
  }
  return totalBill;
}

function calculateFrequentRenterPoints(customer, movies) {
  let frequentRenterPoints = 0;
  for (let rental of customer.rentals) {
    frequentRenterPoints++;
    if (qualifiedForBonusPoint(movies, rental)) frequentRenterPoints++;
  }
  return frequentRenterPoints;
}

function statement(customer, movies) {
  let result = `Rental Record for ${customer.name}\n`;
  for (let rental of customer.rentals) {
    const bill = billForRental(movies, rental);
    result += printBillForRental(movies, rental, bill);
  }

  const totalBill = getTotalBill(customer, movies);
  const frequentRenterPoints = calculateFrequentRenterPoints(customer, movies);

  // add footer lines
  result += `Amount owed is ${totalBill}\n`;
  result += `You earned ${frequentRenterPoints} frequent renter points\n`;

  return result;
}

export { statement };
