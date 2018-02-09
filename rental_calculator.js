import Customer from "./customer";

export function statement(customer, movies) {
  const c = new Customer({ name: customer.name });
  let totalAmount = 0;
  let result = `Rental Record for ${c.name}\n`;
  for (let r of customer.rentals) {
    let movie = movies[r.movieID];
    let thisAmount = 0;

    // determine amount for each movie
    switch (movie.code) {
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
        throw new Error("Invalid move type:" + movie.code);
    }

    //add frequent renter points
    c.incrementRentalPoints();
    // add bonus for a two day new release rental
    if (movie.code === "new" && r.days > 2) c.incrementRentalPoints();

    //print figures for this rental
    result += `\t${movie.title}\t${thisAmount}\n`;
    totalAmount += thisAmount;
  }
  // add footer lines
  result += `Amount owed is ${totalAmount}\n`;
  result += `You earned ${c.frequentRenterPoints} frequent renter points\n`;

  return result;
}
