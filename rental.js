class Rental {
  constructor({ movie, days }) {
    this.movie = movie;
    this.days = days;
  }

  getBill() {
    let bill = 0;

    // determine amount for each movie
    switch (this.movie.code) {
      case "regular":
        bill = 2;
        if (this.days > 2) {
          bill += (this.days - 2) * 1.5;
        }
        break;
      case "new":
        bill = this.days * 3;
        break;
      case "children":
        bill = 1.5;
        if (this.days > 3) {
          bill += (this.days - 3) * 1.5;
        }
        break;
      default:
        throw new Error("Invalid move type:" + this.movie.code);
    }
    return bill;
  }
}

export default Rental;
