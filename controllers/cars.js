// const { v4: uuid } = require("uuid");

const carsData = [
  {
    id: 0,
    imgs: [
      "https://i.ibb.co/NYzg8vk/bmw1.jpg",
      "https://i.ibb.co/5B2vbfL/bmw2.jpg",
      "https://i.ibb.co/89Qz47D/bmw3.jpg",
    ],
    date: "2020-01-24",
    describle:
      "W nasze ręce trafiło piękne BMW M2 Competition. Standardowy czarny lakier przykryliśmy folią 3M Satin Dark – proces ten wykonaliśmy we wszystkich wnękach aby całość prezentowała się niczym prawdziwy lakier!",
    title: "BMW M2 Competition",
  },
  {
    id: 1,
    imgs: [
      "https://i.ibb.co/wccRPH9/merc1.jpg",
      "https://i.ibb.co/jgQXscb/merc3.jpg",
      "https://i.ibb.co/88ZX9hp/merc3.jpg",
    ],
    date: "2020-05-15",
    describle:
      "Prezentowane państwu auto trafiło do nas w dniu odbioru z salonu. Zajęliśmy się nim w pełni kompleksowo, realizując usługi z zakresu detailingu oraz wrappingu.",
    title: "Mercedes-AMG S 63",
  },
  {
    id: 2,
    imgs: [
      "https://i.ibb.co/2MMfq05/seat1.jpg",
      "https://i.ibb.co/09jwKmP/seat2.jpg",
      "https://i.ibb.co/fSkg6XG/seat3.jpg",
    ],
    date: "2020-07-30",

    describle:
      "Nowy Seat Cupra Leon dotrał do nas prosto z salonu, z dokładnie określoną wizją jego wyglądu przez klienta. Jeszcze przed odebraniem z salonu samochód miał zmienić swoje oblicze dzięki folii 3M Satin Grey Aluminium.",
    title: "Seat Cupra Leon",
  },
  {
    id: 3,
    imgs: [
      "https://i.ibb.co/mhVg3hb/golf1.jpg",
      "https://i.ibb.co/b3R6bw4/golf2.jpg",
      "https://i.ibb.co/DG0znsF/gofl3.jpgg",
    ],
    date: "2020-12-04",
    describle:
      "Wyjątkowy kolor lakieru Misanorot Rosse Perleffect na wyjątkowym Golfie GTI wymagał równie wyjątkowej opieki. Aby jazda nie niosła ryzyka uszkodzeń lakieru, w całości został przez nas zabezpieczony bezbarwną folią ochronną!",
    title: "VW Golf GTI",
  },
  {
    id: 4,
    imgs: [
      "https://i.ibb.co/9ggZNbc/golfR.jpg",
      "https://i.ibb.co/R6wpY7m/golf22.jpg",
      "https://i.ibb.co/t8FFdt1/golf33.jpg",
    ],
    date: "2021-01-24",
    describle:
      "Im wcześniej... wiadomo, tym lepiej! Mówimy oczywiście o zabezpieczeniu lakieru przed wszelkimi uszkodzeniami, jeszcze przed wyjazdem na drogi. Tym razem padło na Golfa R",
    title: "VW Golf R",
  },
];

exports.getCars = (request, response, next) => {
  try {
    response.status(200).json({
      cars: carsData,
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /cars",
    });
  }
};

exports.getCar = (request, response, next) => {
  try {
    const { id } = request.params;

    const carToSend = carsData.find((car) => car.id === id);

    if (!carToSend) {
      response.status(404).json({
        message: "Nie znaleziono samochodu o podanym id",
      });

      return;
    }

    response.status(200).json({
      car: carToSend,
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /cars/:id",
    });
  }
};

exports.postCar = (request, response, next) => {
  try {
    const { describle, imgs, date, title } = request.body;
    if (!describle || !date || !title) {
      response.status(400).json({
        message: "Nie podano wszystkich wymaganych informacji",
      });

      return;
    }

    const isCarExist = carsData.some(
      ({ title: currentTitle }) => currentTitle === title
    );
    if (isCarExist) {
      response.status(409).json({
        message: `Istnieje już w bazie samochód ${title}`,
      });

      return;
    }

    const newCar = {
      describle,
      id: carsData.length,
      imgs,
      date,
      title,
    };

    carsData.push(newCar);

    response.status(201).json({
      cars: carsData,
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie POST w endpointcie /cars",
    });
  }
};

exports.putCar = (request, response, next) => {
  try {
    const { describle, id, date, title } = request.body;
    if (!describle || !id || !date || !title) {
      response.status(400).json({
        message: "Nie podano wszystkich wymaganych informacji",
      });

      return;
    }

    const indexCarToUpdate = carsData.findIndex((car) => car.id === id);
    if (indexCarToUpdate === -1) {
      response.status(404).json({
        message: "Nie znaleziono samochodu o podanym id",
      });

      return;
    }

    carsData.splice(indexCarToUpdate, 1, request.body);

    response.status(202).json({
      cars: carsData,
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie PUT w endpointcie /cars",
    });
  }
};

exports.deleteCar = (request, response, next) => {
  try {
    const { id } = request.params;

    const indexCarToDelete = carsData.findIndex((car) => car.id == id);

    if (indexCarToDelete === -1) {
      response.status(404).json({
        message: "Nie znaleziono samochodu o podanym id",
      });

      return;
    }

    carsData.splice(indexCarToDelete, 1);
    response.status(200).end();
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie DELETE w endpointcie /cars/:id",
    });
  }
};

exports.carsData = carsData;
