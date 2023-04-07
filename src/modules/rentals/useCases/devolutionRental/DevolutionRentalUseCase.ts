import { inject, injectable } from "tsyringe";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {

  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) { }

  async execute({ id, user_id }: IRequest) {
    const rental = await this.rentalsRepository.findById(id);
    const minimum_days = 1;

    if (!rental) {
      throw new AppError("Rental doesn't exist!")
    }

    const car = await this.carsRepository.findById(rental.car_id)

    if (!car) {
      throw new AppError("Car doesn't exist!")
    }

    const dateNow = this.dateProvider.dateNow()

    let days = this.dateProvider.compareInDays(
      rental.start_date,
      dateNow
    )

    if (days <= 0) {
      days = minimum_days
    }

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    )

    let total = 0

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount
      total = calculate_fine
    }

    total += days * car.daily_rate

    rental.end_date = this.dateProvider.dateNow()
    rental.total = total

    await this.rentalsRepository.create(rental)
    await this.carsRepository.updateAvailable(car.id, true)

  }

}

export { DevolutionRentalUseCase }