// const { v4: uuid } = require("uuid");

const carsData = [
  {
    id: 0,
    imgs: [
      "https://mediapool.bmwgroup.com/cache/P9/201803/P90295640/P90295640-the-new-bmw-m2-coup-edition-black-shadow-03-2018-2371px.jpg",
      "https://2p2bboli8d61fqhjiqzb8p1a-wpengine.netdna-ssl.com/wp-content/uploads/2018/03/bmw_m2_black_shadow-5.jpg",
      "https://www.bmw.pl/content/dam/bmw/common/all-models/m-series/m2-coupe/2019/highlights/bmw-m2-competition-highlights-m2-competition-mosaic-gallery-desktop-04.jpg",
    ],
    date: "2020-01-24",
    describle:
      "W nasze ręce trafiło piękne BMW M2 Competition. Standardowy czarny lakier przykryliśmy folią 3M Satin Dark – proces ten wykonaliśmy we wszystkich wnękach aby całość prezentowała się niczym prawdziwy lakier!",
    title: "BMW M2 Competition",
  },
  {
    id: 1,
    imgs: [
      "https://www.mercedes-benz.pl/passengercars/mercedes-benz-cars/models/s-class/coupe-c217/amg/equipment/_jcr_content/swipeableteaserbox/par/swipeableteaser_1066808109/asset.MQ6.12.20191011065837.jpeg",
      "https://www.mercedes-benz.pl/passengercars/mercedes-benz-cars/models/amg-gt/4-door-coupe-x290/design/model-comparison/_jcr_content/comparisonslider/par/comparisonslide/interiorImage.MQ6.12.20190711094333.jpeg",
      "https://i.iplsc.com/mercedes-amg-gt-63-s-4matic-4door-coupe-edition-1/0007CKTZAD1295YG-C125-F4.jpg",
    ],
    date: "2020-05-15",
    describle:
      "Prezentowane państwu auto trafiło do nas w dniu odbioru z salonu. Zajęliśmy się nim w pełni kompleksowo, realizując usługi z zakresu detailingu oraz wrappingu.",
    title: "Mercedes-AMG S 63",
  },
  {
    id: 2,
    imgs: [
      "https://www.autotest.sk/wp-content/uploads/2017/09/seat-leon-cupra-r-2018.jpg",
      "https://car-images.bauersecure.com/pagefiles/75454/seat_leon_cuprar_11.jpg",
      "https://motofilm.pl/wp-content/uploads/2020/02/New-Cupra-Leon-5.jpg",
    ],
    date: "2020-07-30",

    describle:
      "Nowy Seat Cupra Leon dotrał do nas prosto z salonu, z dokładnie określoną wizją jego wyglądu przez klienta. Jeszcze przed odebraniem z salonu samochód miał zmienić swoje oblicze dzięki folii 3M Satin Grey Aluminium.",
    title: "Seat Cupra Leon",
  },
  {
    id: 3,
    imgs: [
      "https://i1.wp.com/cartests.net/wp-content/uploads/2020/02/2020-volkswagen-golf-gti_main.jpg?fit=1200%2C800&ssl=1",
      "https://carmag.co.za/upload/articles/2020/08/8gti.jpg",
      "https://wokolmotoryzacji.pl/wp-content/uploads/2020/02/2020-volkswagen-golf-gti-12.jpg",
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
      "https://motofilm.pl/wp-content/uploads/2020/11/Volkswagen-Golf-R-2021-2.jpg",
      "https://motofilm.pl/wp-content/uploads/2020/11/Volkswagen-Golf-R-2021-6.jpg",
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
