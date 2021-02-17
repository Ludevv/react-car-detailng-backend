const { carsData } = require("./cars");

const usersData = [
  {
    accessLevel: 1,
    budget: 1000000,
    cars: [carsData.map((car) => car.id)],
    login: "Admin",
    password: "123456",
  },
];

exports.postUser = (request, response, next) => {
  try {
    const { login, password } = request.body;

    const user = usersData.find((u) => u.login === login);
    if (!user) {
      response.status(404).json({
        message: "Użytkownik o podanym loginie nie istnieje",
      });

      return;
    }

    const isPasswordCorrect = user.password === password;
    if (!isPasswordCorrect) {
      response.status(401).json({
        message: "Hasło lub login się nie zgadza",
      });

      return;
    }

    response.status(200).json({
      user,
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie POST w endpointcie /users",
    });
  }
};

exports.patchUser = (request, response, next) => {
  try {
    const { login, carId } = request.body;

    const car = carsData.find((car) => car.id === careId);
    const user = usersData.find((user) => user.login === login);

    if (!car) {
      response.status(404).json({
        message: "Nie znaleziono kursu o podanym Id",
      });

      return;
    } else if (!user) {
      response.status(404).json({
        message: "Nie znaleziono uzytkownika o podanym loginie",
      });

      return;
    }

    const hasUserCarAlready = user.cars.some((id) => id === carId);
    if (hasUserCarAlready) {
      response.status(200).json({
        user,
      });

      return;
    }

    const hasUserEnoughtMoney = user.budget - car.price >= 0;
    if (!hasUserEnoughtMoney) {
      response.status(403).json({
        message: "Uzytkownik nie posiada wystarczających funduszy",
      });

      return;
    }

    user.budget = Number((user.budget - car.price).toFixed(2));
    user.cars.push(carId);
    response.status(202).json({
      user,
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie PATCH w endpointcie /users",
    });
  }
};
