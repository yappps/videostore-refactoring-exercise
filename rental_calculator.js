import Customer from "./customer";
import Rental from "./rental";


function statement(customer, movies) {
  const c = new Customer({ name: customer.name });
  const rentals = customer.rentals.map(
    rental => new Rental({ movie: movies[rental.movieID], days: rental.days })
  );
  let totalBill = 0;
  let result = `Rental Record for ${c.name}\n`;
  for (let r of rentals) {
    let bill = r.getBill();

    c.incrementRentalPoints();
    if (r.qualifiedForBonusRenterPoints()) c.incrementRentalPoints();

    //print figures for this rental
    result += `\t${r.movie.title}\t${bill}\n`;
    totalBill += bill;
  }
  // add footer lines
  result += `Amount owed is ${totalBill}\n`;
  result += `You earned ${c.frequentRenterPoints} frequent renter points\n`;

  return result;
}

export { statement };
