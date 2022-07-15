const { Observable } = require("rxjs");
const { map, pluck, filter } = require("rxjs/operators");

const users = {
  data: [
    {
      status: "active",
      age: 14,
    },
    {
      status: "inactive",
      age: 32,
    },
    {
      status: "active",
      age: 17,
    },
    {
      status: "active",
      age: 23,
    },
  ],
};

const users2 = {
  data: [
    {
      status: "active",
      age: 14,
    },
    {
      status: "inactive",
      age: 32,
    },
    {
      status: "inactive",
      age: 53,
    },
    {
      status: "active",
      age: 17,
    },
    {
      status: "inactive",
      age: 11,
    },
    {
      status: "inactive",
      age: 32,
    },
    {
      status: "inactive",
      age: 43,
    },
    {
      status: "active",
      age: 23,
    },
  ],
};

const observable = new Observable((subscriber) => {
  subscriber.next(users2);
  // subscriber.complete();
  subscriber.next(users);
  subscriber.next(users2);
}).pipe(
  pluck("data"),
  filter((value) => value.length >= 5),
  map((value) => {
    return value.filter((user) => user.status === "active");
  }),
  map((value) => {
    return value.reduce((sum, user) => sum + user.age, 0) / value.length;
  }),
  map((value) => {
    if (value < 18) throw new Error("Average age is too young");
    return value;
  })
);

const observer = {
  next: (value) => {
    console.log("Observer got a value of +", value);
  },
  error: (err) => {
    console.log("Observer got a error of + ", err);
  },
  complete: () => {
    console.log("Observer got a complete notification");
  },
};

observable.subscribe(observer);
