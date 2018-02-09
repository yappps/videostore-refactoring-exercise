import Customer from "./customer";
import Rental from "./rental";

function getTotalBill(rentals) {
  let totalBill = 0;
  for (let r of rentals) {
    let bill = r.getBill();
    totalBill += bill;
  }
  return totalBill;
}

function incrementRenterPointsForCustomer(rentals, c) {
  for (let r of rentals) {
    c.incrementRentalPoints();
    if (r.qualifiedForBonusRenterPoints()) c.incrementRentalPoints();
  }
}

function statement(customer, movies) {
  const c = new Customer({ name: customer.name });
  const rentals = customer.rentals.map(
    rental => new Rental({ movie: movies[rental.movieID], days: rental.days })
  );
  let result = `Rental Record for ${c.name}\n`;

  const totalBill = getTotalBill(rentals);

  for (let r of rentals) {
    let bill = r.getBill();
    result += `\t${r.movie.title}\t${bill}\n`;
  }

  incrementRenterPointsForCustomer(rentals, c);

  // add footer lines
  result += `Amount owed is ${totalBill}\n`;
  result += `You earned ${c.frequentRenterPoints} frequent renter points\n`;

  return result;
}

export { statement };
